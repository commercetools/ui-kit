import { warning } from '@commercetools-uikit/utils';
import uniq from 'lodash/uniq';
import html from '../html';
import isRichTextEmpty from '../is-empty';

const initializeValue = (value) => html.serialize(html.deserialize(value));

const isLocalizedHtmlValueEmpty = (value) => !value || isRichTextEmpty(value);

export const isEmpty = (localizedHtmlValue) => {
  if (!localizedHtmlValue) return true;
  return Object.values(localizedHtmlValue).every(isLocalizedHtmlValueEmpty);
};

export const omitEmptyTranslations = (localizedString) => {
  warning(
    typeof localizedString === 'object',
    'omitEmptyTranslations must be called with an object'
  );
  return Object.entries(localizedString).reduce(
    (localizedStringWithoutEmptyTranslations, [language, value]) => {
      if (!isLocalizedHtmlValueEmpty(value)) {
        // eslint-disable-next-line no-param-reassign
        localizedStringWithoutEmptyTranslations[language] = value;
      }
      return localizedStringWithoutEmptyTranslations;
    },
    {}
  );
};

export const createLocalizedString = (languages, existingTranslations = {}) => {
  const mergedLanguages = existingTranslations
    ? uniq([...languages, ...Object.keys(existingTranslations)])
    : languages;

  return mergedLanguages.reduce((localizedString, language) => {
    // eslint-disable-next-line no-param-reassign
    localizedString[language] =
      existingTranslations && existingTranslations[language]
        ? initializeValue(existingTranslations[language])
        : initializeValue('');

    return localizedString;
  }, {});
};
