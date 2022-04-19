import {
  createLocalizedString,
  isEmpty,
  omitEmptyTranslations,
} from './localized';

const emptyValue = '<p></p>';

describe('createLocalizedString', () => {
  describe('when existingTranslations is not passed', () => {
    it('should properly initializeValue', () => {
      expect(createLocalizedString(['en', 'de'])).toEqual({
        en: emptyValue,
        de: emptyValue,
      });
    });
  });
  describe('when one existingTranslation is not passed', () => {
    it('should properly initializeValue', () => {
      expect(
        createLocalizedString(['en', 'de'], { en: 'hello world' })
      ).toEqual({
        en: '<p>hello world</p>',
        de: emptyValue,
      });
    });
  });
  describe('when existingTranslation is defined', () => {
    it('should properly initializeValue', () => {
      expect(
        createLocalizedString(['en', 'de'], { en: 'hello world', de: 'Hallo' })
      ).toEqual({
        en: '<p>hello world</p>',
        de: '<p>Hallo</p>',
      });
    });
  });
});

describe('isEmpty', () => {
  describe('when calling with an undefined value', () => {
    it('should return true', () => {
      expect(isEmpty()).toBeTruthy();
    });
  });
  describe('when calling with undefined values', () => {
    it('should indicate that the value is empty', () => {
      expect(isEmpty({ en: null, de: null })).toBeTruthy();
    });
  });
  describe('when calling with one undefined value and one empty value', () => {
    it('should indicate that the value is empty', () => {
      expect(isEmpty({ en: null, de: emptyValue })).toBeTruthy();
    });
  });
  describe('when calling with two empty values', () => {
    it('should indicate that the value is empty', () => {
      expect(isEmpty({ en: emptyValue, de: emptyValue })).toBeTruthy();
    });
  });
  describe('when calling with one undefined value and one truthy value', () => {
    it('should indicate that the value is not empty', () => {
      expect(isEmpty({ en: emptyValue, de: '<p>Okay</p>' })).toBeFalsy();
    });
  });
});

describe('omitEmptyTranslations', () => {
  describe('when called with an empty object', () => {
    it('should indicate that there are no defined translations', () => {
      expect(omitEmptyTranslations({})).toEqual({});
    });
  });
  describe('when called with all undefined values', () => {
    it('should indicate that there are no defined translations', () => {
      expect(omitEmptyTranslations({ en: null, de: null })).toEqual({});
    });
  });
  describe('when called with one defined value', () => {
    it('should indiciate that there is one defined translations', () => {
      expect(
        omitEmptyTranslations({ en: emptyValue, de: '<p>Hallo</p>' })
      ).toEqual({ de: '<p>Hallo</p>' });
    });
  });
  describe('when called with all defined values', () => {
    it('should indiciate that there are two defined translations', () => {
      expect(
        omitEmptyTranslations({
          en: '<h1>Poutine</h1>',
          de: '<p>Hello World</p>',
        })
      ).toEqual({ en: '<h1>Poutine</h1>', de: '<p>Hello World</p>' });
    });
  });
});
