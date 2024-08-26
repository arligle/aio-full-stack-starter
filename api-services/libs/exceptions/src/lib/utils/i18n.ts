import type { I18nTranslations } from '../generated/i18n.generated';

import { i18nValidationMessageString, type Path } from '@ifckit/i18n';

export function i18nString(key: Path<I18nTranslations>) {
  return i18nValidationMessageString<I18nTranslations>(key);
}
