import uniq from 'lodash/uniq';
import { filterDataAttributes, invariant } from '@commercetools-uikit/utils';

type TLocalizedString = {
  [locale: string]: string;
};
type TTouchedLocalizedString = {
  [locale: string]: boolean;
};
type TDataAttributes = 'data-track-component' | 'data-testid' | 'data-test';
type TLocalizedDataAttributes = Record<TDataAttributes | string, unknown>;
type TSplittedLanguageGroups = {
  related: string[];
  unrelated: string[];
};

export const getId = (
  idPrefix?: string,
  language?: string
): string | undefined =>
  idPrefix && language ? `${idPrefix}.${language}` : undefined;

export const getName = (
  namePrefix?: string,
  language?: string
): string | undefined =>
  namePrefix && language ? `${namePrefix}.${language}` : undefined;

export const getPrimaryLanguage = (language: string): string =>
  language.split('-')[0];

// splits the languages into two groups:
//  - the first group starts with the same tag as the selected language
//  - the second group starts with a different tag
export const splitLanguages = (
  selectedLanguage: string,
  languages: string[]
): TSplittedLanguageGroups => {
  const primaryLanguage = getPrimaryLanguage(selectedLanguage);
  const related = languages.filter(
    (language) => getPrimaryLanguage(language) === primaryLanguage
  );
  const unrelated = languages.filter(
    (language) => getPrimaryLanguage(language) !== primaryLanguage
  );
  return {
    unrelated,
    related,
  };
};

// sorts the languages with the following priority:
// - The selected language is placed first (e.g pt-BR)
// - All languages using the same primary language as the selected language
//   follow (e.g. pt, pt-PT). They are sorted alphabetically.
// - All other languages follow, sorted alphabetically as well
export const sortLanguages = (
  selectedLanguage: string,
  allLanguages: string[]
): string[] => {
  const { related, unrelated } = splitLanguages(
    selectedLanguage,
    allLanguages.filter((language: string) => language !== selectedLanguage)
  );

  return [selectedLanguage, ...related.sort(), ...unrelated.sort()];
};

export const createLocalizedDataAttributes = <TProps extends {}>(
  props: TProps,
  language: string
): TLocalizedDataAttributes => {
  const entries = Object.entries(filterDataAttributes(props));
  return entries.reduce<TLocalizedDataAttributes>(
    (localizedDataAttributes, [key, value]) => {
      switch (key) {
        case 'data-track-component':
        case 'data-testid':
        case 'data-test':
          localizedDataAttributes[key] = `${value}-${language}`;
          break;
        default:
          localizedDataAttributes[key] = value;
      }
      return localizedDataAttributes;
    },
    {} as TLocalizedDataAttributes
  );
};

export const getHasErrorOnRemainingLanguages = <TErrors extends {}>(
  errors?: TErrors,
  selectedLanguage?: string
): boolean => {
  if (errors && Object.keys(errors).length > 0 && selectedLanguage) {
    return Object.keys(errors).some(
      (language) => language !== selectedLanguage
    );
  }
  return false;
};

export const getHasWarningOnRemainingLanguages = <TWarnings extends {}>(
  warnings?: TWarnings,
  selectedLanguage?: string
): boolean => {
  if (warnings && Object.keys(warnings).length > 0 && selectedLanguage) {
    return Object.keys(warnings).some(
      (language) => language !== selectedLanguage
    );
  }
  return false;
};

export const createLocalizedString = (
  languages: string[],
  existingTranslations: TLocalizedString = {}
): TLocalizedString => {
  const mergedLanguages = existingTranslations
    ? uniq([...languages, ...Object.keys(existingTranslations)])
    : languages;
  return mergedLanguages.reduce<TLocalizedString>(
    (localizedString, locale) => ({
      ...localizedString,
      [locale]: (existingTranslations && existingTranslations[locale]) || '',
    }),
    {}
  );
};

export const isEmpty = (localizedString?: TLocalizedString): boolean => {
  if (!localizedString) return true;
  return Object.values(localizedString).every(
    (value: string) => !value || value.trim().length === 0
  );
};

export const omitEmptyTranslations = <TTranslations extends TLocalizedString>(
  localizedString?: TTranslations
): TLocalizedString => {
  invariant(
    typeof localizedString === 'object',
    'omitEmptyTranslations must be called with an object'
  );

  return Object.entries(localizedString).reduce<TLocalizedString>(
    (localizedStringWithoutEmptyTranslations, [locale, value]) => {
      if (value && value.trim().length > 0) {
        return {
          ...localizedStringWithoutEmptyTranslations,
          [locale]: value,
        };
      }
      return localizedStringWithoutEmptyTranslations;
    },
    {}
  );
};

export const isTouched = (touched?: TTouchedLocalizedString): boolean => {
  if (touched) {
    return Object.values(touched).some(Boolean);
  }
  return false;
};
