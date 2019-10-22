import uniq from 'lodash/uniq';
import html from '../html';

const initializeValue = value => html.serialize(html.deserialize(value));

const createLocalizedString = (languages, existingTranslations = {}) => {
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

export default createLocalizedString;
