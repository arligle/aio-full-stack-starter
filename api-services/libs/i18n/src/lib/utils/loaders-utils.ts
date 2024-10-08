import type { I18nLoader } from '../loaders/i18n.loader';
import { logger } from '../i18n.module';
import type { I18nTranslation } from '../interfaces/i18n-translation.interface';
import { mergeTranslations } from './merge';

export async function processTranslations(loaders: I18nLoader<unknown>[]) {
  try {
    const loadedTranslations = await Promise.all(
      loaders.map((loader) => loader.load()),
    );

    return loadedTranslations
      .filter(
        (translation): translation is I18nTranslation =>
          translation !== undefined,
      )
      .reduce((acc, translation) => {
        return mergeTranslations(acc, translation);
      }, {});
  } catch (error) {
    logger.error('parsing translations files or processing error', error);
    throw error;
  }
}

export async function processLanguages(loaders: I18nLoader<unknown>[]) {
  try {
    const allLanguages = await Promise.all(
      loaders.map((loader) => loader.languages()),
    );

    const languagesToRespond = allLanguages
      .filter((languages): languages is string[] => languages !== undefined)
      .flat();

    return [...new Set(languagesToRespond)];
  } catch (error) {
    logger.error('parsing languages or processing error', error);
    throw error;
  }
}
