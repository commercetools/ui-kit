import uniq from 'lodash/uniq';
import html from '../html';
import isRichTextEmpty from '../is-empty';

const initializeValue = value => html.serialize(html.deserialize(value));

export const isEmpty = localizedString => {
  if (!localizedString) return true;
  return Object.values(localizedString).every(
    value => !value || isRichTextEmpty(value)
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
