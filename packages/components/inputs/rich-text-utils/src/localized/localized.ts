import { warning } from '@commercetools-uikit/utils';
import uniq from 'lodash/uniq';
import html from '../html';
import isRichTextEmpty from '../is-empty';

const initializeValue = (value: string) =>
  html.serialize(html.deserialize(value));

const isLocalizedHtmlValueEmpty = (value: unknown) =>
  !value || isRichTextEmpty(value);

export const isEmpty = (
  localizedHtmlValue: { [s: string]: unknown } | ArrayLike<unknown> | undefined
) => {
  if (!localizedHtmlValue) return true;
  return Object.values(localizedHtmlValue).every(isLocalizedHtmlValueEmpty);
};

type TOmitEmptyTranslations = {
  language: unknown;
};

export const omitEmptyTranslations = (
  localizedString: TOmitEmptyTranslations
) => {
  warning(
    typeof localizedString === 'object',
    'omitEmptyTranslations must be called with an object'
  );
  return Object.entries(localizedString).reduce<Record<string, unknown>>( //TODO: type reduce
    (localizedStringWithoutEmptyTranslations, [language, value]) => {
      if (!isLocalizedHtmlValueEmpty(value)) {
        localizedStringWithoutEmptyTranslations[language] = value;
      }
      return localizedStringWithoutEmptyTranslations;
    },
    {}
  );
};

type TCreateLocalizedString = {
  [key: string]: string;
};

export const createLocalizedString = (
  languages: string[],
  existingTranslations = {} as TCreateLocalizedString
) => {
  const mergedLanguages = existingTranslations
    ? uniq([...languages, ...Object.keys(existingTranslations)])
    : languages;

  return mergedLanguages.reduce<Record<string, unknown>>(
    (localizedString, language: string) => {
      localizedString[language] = existingTranslations[language]
        ? initializeValue(existingTranslations[language])
        : initializeValue('');

      return localizedString;
    },
    {}
  );
};
