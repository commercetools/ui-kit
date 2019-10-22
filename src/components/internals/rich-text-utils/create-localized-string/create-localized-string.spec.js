import createLocalizedString from './create-localized-string';

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
