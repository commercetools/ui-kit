import { warning } from '@commercetools-uikit/utils';
import uniq from 'lodash/uniq';
import html from '../html';
import isRichTextEmpty from '../is-empty';

type TLocalizedString = {
  language: string;
};

type TTranslations = {
  [key: string]: string;
};

const initializeValue = (value: string) =>
  html.serialize(html.deserialize(value));

const isLocalizedHtmlValueEmpty = (value: unknown) =>
  !value || isRichTextEmpty(value as string);

export const isEmpty = (
  localizedHtmlValue:
    | { [key: string]: unknown }
    | ArrayLike<unknown>
    | undefined
) => {
  if (!localizedHtmlValue) return true;
  return Object.values(localizedHtmlValue).every(isLocalizedHtmlValueEmpty);
};

export const omitEmptyTranslations = (localizedString: TLocalizedString) => {
  warning(
    typeof localizedString === 'object',
    'omitEmptyTranslations must be called with an object'
  );
  return Object.entries(localizedString).reduce<Record<string, unknown>>(
    (localizedStringWithoutEmptyTranslations, [language, value]) => {
      if (!isLocalizedHtmlValueEmpty(value)) {
        localizedStringWithoutEmptyTranslations[language] = value;
      }
      return localizedStringWithoutEmptyTranslations;
    },
    {}
  );
};

export const createLocalizedString = (
  languages: string[],
  existingTranslations = {} as TTranslations
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
