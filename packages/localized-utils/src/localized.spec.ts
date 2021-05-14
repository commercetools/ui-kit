import {
  getId,
  getName,
  getPrimaryLanguage,
  splitLanguages,
  sortLanguages,
  createLocalizedString,
  omitEmptyTranslations,
  isEmpty,
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  isTouched,
} from './localized';

describe('getId', () => {
  describe('when a prefix is given', () => {
    it('should return the joined prefix and language', () => {
      expect(getId('foo', 'en')).toEqual('foo.en');
    });
  });
  describe('when no prefix is given', () => {
    it('should not return an id', () => {
      expect(getId(undefined, 'en')).toBe(undefined);
      expect(getId()).toBe(undefined);
    });
  });
});

describe('getName', () => {
  describe('when a prefix is given', () => {
    it('should return the joined prefix and name', () => {
      expect(getName('foo', 'en')).toEqual('foo.en');
    });
  });
  describe('when no prefix is given', () => {
    it('should not return a name', () => {
      expect(getName(undefined, 'en')).toBe(undefined);
      expect(getName()).toBe(undefined);
    });
  });
});

describe('getPrimaryLanguage', () => {
  describe('when the language tag consists of multiple languages', () => {
    it('should return the primary language', () => {
      expect(getPrimaryLanguage('en-US')).toBe('en');
      expect(getPrimaryLanguage('de-AT')).toBe('de');
    });
  });
  describe('when the language tag consists of the primary language only', () => {
    it('should return the primary language', () => {
      expect(getPrimaryLanguage('en')).toBe('en');
      expect(getPrimaryLanguage('de')).toBe('de');
    });
  });
});

describe('splitLanguages', () => {
  // the first group contains language tags with the same primary language,
  // the second group contains the remaining languages
  describe('when called with a primary language', () => {
    it('should split the languages into two groups', () => {
      expect(
        splitLanguages('de', ['ar', 'de-AT', 'es', 'de', 'de-GB', 'en'])
      ).toEqual({
        related: ['de-AT', 'de', 'de-GB'],
        unrelated: ['ar', 'es', 'en'],
      });
    });
  });
  describe('when called with a full language tag', () => {
    it('should split the languages into two groups', () => {
      expect(
        splitLanguages('de-AT', ['ar', 'de-AT', 'es', 'de', 'de-GB', 'en'])
      ).toEqual({
        related: ['de-AT', 'de', 'de-GB'],
        unrelated: ['ar', 'es', 'en'],
      });
    });
  });
});

describe('sortLanguages', () => {
  it('should put the selected language first', () => {
    expect(sortLanguages('de', ['de', 'ar'])).toEqual(['de', 'ar']);
  });
  it('should sort the remaining languages alphabetically', () => {
    expect(
      sortLanguages('de', ['en', 'cn', 'es', 'bu', 'de', 'ar', 'ru'])
    ).toEqual(['de', 'ar', 'bu', 'cn', 'en', 'es', 'ru']);
  });
  it('should move languages with the same language tag as the selected language to the beginning', () => {
    expect(
      sortLanguages('pt', ['en', 'pt-PT', 'bu', 'pt-BR', 'de', 'ru', 'pt'])
    ).toEqual(['pt', 'pt-BR', 'pt-PT', 'bu', 'de', 'en', 'ru']);
    expect(
      sortLanguages('pt-BR', ['en', 'pt-PT', 'bu', 'pt-BR', 'de', 'ru', 'pt'])
    ).toEqual(['pt-BR', 'pt', 'pt-PT', 'bu', 'de', 'en', 'ru']);
  });
});

describe('createLocalizedDataAttributes', () => {
  it('should localize the data-test attribute', () => {
    expect(createLocalizedDataAttributes({ 'data-test': 'foo' }, 'en')).toEqual(
      { 'data-test': 'foo-en' }
    );
  });
  it('should localize the data-track-component attribute', () => {
    expect(
      createLocalizedDataAttributes({ 'data-track-component': 'foo' }, 'en')
    ).toEqual({ 'data-track-component': 'foo-en' });
  });
  it('should not localize unknown data attributes', () => {
    expect(createLocalizedDataAttributes({ 'data-foo': 'bar' }, 'en')).toEqual({
      'data-foo': 'bar',
    });
  });
  it('should omit non-data attributes', () => {
    expect(createLocalizedDataAttributes({ foo: 'bar' }, 'en')).toEqual({});
  });
});

describe('getHasErrorOnRemainingLanguages', () => {
  describe('when there is an error on the remaining languages', () => {
    it('should return true', () => {
      const errors = { de: { invalidSlug: true } };
      expect(getHasErrorOnRemainingLanguages(errors, 'en')).toBe(true);
    });
  });
  describe('when there is an error on the selected language only', () => {
    it('should return false', () => {
      const errors = { de: { invalidSlug: true } };
      expect(getHasErrorOnRemainingLanguages(errors, 'de')).toBe(false);
    });
  });
  describe('when all languages have errors', () => {
    it('should return true', () => {
      const errors = { de: { invalidSlug: true }, en: { invalidSlug: true } };
      expect(getHasErrorOnRemainingLanguages(errors, 'de')).toBe(true);
    });
  });
  describe('when there are no errors', () => {
    it('should return false', () => {
      expect(getHasErrorOnRemainingLanguages({}, 'en')).toBe(false);
      expect(getHasErrorOnRemainingLanguages(undefined, 'en')).toBe(false);
    });
  });
});

describe('createLocalizedString', () => {
  describe('when there are no existing translations', () => {
    it('should initialize all languages to an empty string', () => {
      expect(createLocalizedString(['en', 'de'])).toEqual({ en: '', de: '' });
    });
  });
  describe('when there are existing translations', () => {
    describe('when all existing translations are part of the languages', () => {
      it('should reuse the existing translations and set the remaining languages to an empty string', () => {
        expect(createLocalizedString(['en', 'de'], { de: 'Foo' })).toEqual({
          en: '',
          de: 'Foo',
        });
      });
    });
    describe('when the existing tranlsations contain translations not part of the languages', () => {
      it('should unify all translations and set the remaining languages to an empty string', () => {
        expect(
          createLocalizedString(['en', 'de'], { ar: 'مرحبا العالم', de: 'Foo' })
        ).toEqual({
          en: '',
          de: 'Foo',
          ar: 'مرحبا العالم',
        });
      });
    });
  });
});

describe('isEmpty', () => {
  describe('when called with no value', () => {
    it('should return true', () => {
      expect(isEmpty()).toBe(true);
    });
  });
  describe('when there are no translations', () => {
    it('should return true', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ en: '', de: '' })).toBe(true);
      expect(isEmpty({ de: '  ' })).toBe(true);
    });
  });
  describe('when there are translations', () => {
    it('should return false', () => {
      expect(isEmpty({ de: 'Hi' })).toBe(false);
      expect(isEmpty({ de: 'Hi', en: '' })).toBe(false);
    });
  });
});

describe('omitEmptyTranslations', () => {
  describe('when called with no value', () => {
    it('should throw an error', () => {
      // An error is expected as no localized string but undefined is passed.
      // We throw an `Error` using a `warning` in non-production
      // environments to inform consumers.
      // @ts-expect-error
      expect(() => omitEmptyTranslations()).toThrow();
    });
  });
  describe('when there are only empty values', () => {
    it('should return an empty object', () => {
      expect(omitEmptyTranslations({})).toEqual({});
      expect(omitEmptyTranslations({ en: '', de: '' })).toEqual({});
      expect(omitEmptyTranslations({ de: '  ' })).toEqual({});
    });
  });
  describe('when there are translations', () => {
    it('should return only the translated values', () => {
      expect(omitEmptyTranslations({ de: 'Hi' })).toEqual({
        de: 'Hi',
      });
      expect(omitEmptyTranslations({ de: 'Hi', en: '' })).toEqual({
        de: 'Hi',
      });
    });
  });
});

describe('isTouched', () => {
  describe('when field is touched', () => {
    it('should return true', () => {
      expect(isTouched({ en: true })).toBe(true);
      expect(isTouched({ en: true, de: false })).toBe(true);
    });
  });
  describe('when field is not touched', () => {
    it('should return false', () => {
      expect(isTouched({ en: false })).toBe(false);
      expect(isTouched()).toBe(false);
    });
  });
});
