import { createLocalizedString, isEmpty } from './localized';

const emptyValue = '<p></p>';

describe('createLocalizedString', () => {
  describe('when existingTranslations is null', () => {
    it('should properly initializeValue', () => {
      expect(createLocalizedString(['en', 'de'])).toEqual({
        en: emptyValue,
        de: emptyValue,
      });
    });
  });
  describe('when one existingTranslation is null', () => {
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
