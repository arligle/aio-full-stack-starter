import { I18nError } from '../i18n.error';
import {
  I18nAbstractFileLoader,
  type I18nAbstractFileLoaderOptions,
} from './i18n.abstract-file.loader';
import yaml from 'js-yaml';

export class I18nYamlLoader extends I18nAbstractFileLoader {
  getDefaultOptions(): Partial<I18nAbstractFileLoaderOptions> {
    return {
      filePattern: '*.yml',
    };
  }

  formatData(data: any) {
    try {
      return yaml.load(data, { json: true });
    } catch (error) {
      if (error instanceof yaml.YAMLException) {
        throw new I18nError(
          'Invalid YAML file. Please check your YAML syntax.',
        );
      }

      throw error;
    }
  }
}
