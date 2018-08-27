import React from 'react';
import { shallow } from 'enzyme';
import {
  LocalizedMultilineTextInput,
  sortRemainingLanguages,
} from './localized-multiline-text-input';
import TranslationInput from './translation-input';

const createTestProps = custom => ({
  value: { en: 'Horse', de: 'Pferd' },
  onChange: jest.fn(),
  selectedLanguage: 'en',
  intl: { formatMessage: message => message.id },
  ...custom,
});

describe('sortRemainingLanguages', () => {
  it('should put the selected language first', () => {
    expect(sortRemainingLanguages('de', ['de', 'ar'])).toEqual(['ar']);
  });
  it('should sort the remaining languages alphabetically', () => {
    expect(
      sortRemainingLanguages('de', ['en', 'cn', 'es', 'bu', 'de', 'ar', 'ru'])
    ).toEqual(['ar', 'bu', 'cn', 'en', 'es', 'ru']);
  });
  it('should move languages with the same language tag as the selected language to the beginning', () => {
    expect(
      sortRemainingLanguages('pt', [
        'en',
        'pt-PT',
        'bu',
        'pt-BR',
        'de',
        'ru',
        'pt',
      ])
    ).toEqual(['pt-BR', 'pt-PT', 'bu', 'de', 'en', 'ru']);
    expect(
      sortRemainingLanguages('pt-BR', [
        'en',
        'pt-PT',
        'bu',
        'pt-BR',
        'de',
        'ru',
        'pt',
      ])
    ).toEqual(['pt', 'pt-PT', 'bu', 'de', 'en', 'ru']);
  });
});

describe('createLocalizedString', () => {
  describe('when there are no existing translations', () => {
    it('should initialize all languages to an empty string', () => {
      expect(
        LocalizedMultilineTextInput.createLocalizedString(['en', 'de'])
      ).toEqual({
        en: '',
        de: '',
      });
    });
  });
  describe('when there are existing translations', () => {
    describe('when all existing translations are part of the languages', () => {
      it('should reuse the existing translations and set the remaining languages to an empty string', () => {
        expect(
          LocalizedMultilineTextInput.createLocalizedString(['en', 'de'], {
            de: 'Foo',
          })
        ).toEqual({
          en: '',
          de: 'Foo',
        });
      });
    });
    describe('when the existing tranlsations contain translations not part of the languages', () => {
      it('should unify all translations and set the remaining languages to an empty string', () => {
        expect(
          LocalizedMultilineTextInput.createLocalizedString(['en', 'de'], {
            ar: 'مرحبا العالم',
            de: 'Foo',
          })
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
      expect(LocalizedMultilineTextInput.isEmpty()).toBe(true);
    });
  });
  describe('when there are no translations', () => {
    it('should return true', () => {
      expect(LocalizedMultilineTextInput.isEmpty({})).toBe(true);
      expect(LocalizedMultilineTextInput.isEmpty({ en: '', de: '' })).toBe(
        true
      );
      expect(LocalizedMultilineTextInput.isEmpty({ de: '  ' })).toBe(true);
    });
  });
  describe('when there are translations', () => {
    it('should return false', () => {
      expect(LocalizedMultilineTextInput.isEmpty({ de: 'Hi' })).toBe(false);
      expect(LocalizedMultilineTextInput.isEmpty({ de: 'Hi', en: '' })).toBe(
        false
      );
    });
  });
});

describe('omitEmptyTranslations', () => {
  describe('when called with no value', () => {
    it('should throw an error', () => {
      expect(() =>
        LocalizedMultilineTextInput.omitEmptyTranslations()
      ).toThrow();
    });
  });
  describe('when there are only empty values', () => {
    it('should return an empty object', () => {
      expect(LocalizedMultilineTextInput.omitEmptyTranslations({})).toEqual({});
      expect(
        LocalizedMultilineTextInput.omitEmptyTranslations({ en: '', de: '' })
      ).toEqual({});
      expect(
        LocalizedMultilineTextInput.omitEmptyTranslations({ de: '  ' })
      ).toEqual({});
    });
  });
  describe('when there are translations', () => {
    it('should return only the translated values', () => {
      expect(
        LocalizedMultilineTextInput.omitEmptyTranslations({ de: 'Hi' })
      ).toEqual({
        de: 'Hi',
      });
      expect(
        LocalizedMultilineTextInput.omitEmptyTranslations({ de: 'Hi', en: '' })
      ).toEqual({
        de: 'Hi',
      });
    });
  });
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('with minimal props', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when collapsed', () => {
    describe('with id', () => {
      beforeEach(() => {
        props = createTestProps({ id: 'foo' });
        wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
      });
      it('should add a language suffix to the id of each visible input', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ id: 'foo.en' });
      });
    });
    describe('with name', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
      });
      it('should forward the name', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ name: 'foo.en' });
      });
    });
  });

  describe('when expanded by default', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should render one input per language', () => {
      expect(wrapper).toRender({ name: 'foo.en' });
      expect(wrapper).toRender({ name: 'foo.de' });
      expect(wrapper).toRender({ name: 'foo.es' });
    });
  });

  describe('when expansion toggle feature is disabled', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        hideLanguageControls: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should open all languages', () => {
      expect(wrapper).toRender({ name: 'foo.en' });
      expect(wrapper).toRender({ name: 'foo.de' });
      expect(wrapper).toRender({ name: 'foo.es' });
    });
    it('should not render the collapse button', () => {
      expect(wrapper.find(TranslationInput).last()).toHaveProp(
        'languagesControl',
        null
      );
    });
  });

  describe('when autofocus is activated', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        isAutofocussed: true,
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should focus the selected languages', () => {
      expect(wrapper.find({ name: 'foo.en' })).toHaveProp(
        'isAutofocussed',
        true
      );
    });
    it('should not focus the remaining languages', () => {
      expect(wrapper.find({ name: 'foo.de' })).toHaveProp(
        'isAutofocussed',
        false
      );
      expect(wrapper.find({ name: 'foo.es' })).toHaveProp(
        'isAutofocussed',
        false
      );
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        isDisabled: true,
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should disable all inputs', () => {
      expect(wrapper.find({ name: 'foo.en' })).toHaveProp('isDisabled', true);
      expect(wrapper.find({ name: 'foo.de' })).toHaveProp('isDisabled', true);
      expect(wrapper.find({ name: 'foo.es' })).toHaveProp('isDisabled', true);
    });
  });

  describe('when in read-only mode', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        isReadOnly: true,
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should disable all inputs', () => {
      expect(wrapper.find({ name: 'foo.en' })).toHaveProp('isReadOnly', true);
      expect(wrapper.find({ name: 'foo.de' })).toHaveProp('isReadOnly', true);
      expect(wrapper.find({ name: 'foo.es' })).toHaveProp('isReadOnly', true);
    });
  });

  describe('when placeholders are provided', () => {
    beforeEach(() => {
      props = createTestProps({
        placeholder: { en: 'Value', de: 'Wert' },
        areLanguagesDefaultOpened: true,
      });
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        placeholder: {
          en: 'placeholder-en',
          de: 'placeholder-de',
          es: 'placeholder-es',
        },
        isReadOnly: true,
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should forward the placeholders', () => {
      expect(wrapper.find({ name: 'foo.en' })).toHaveProp(
        'placeholder',
        'placeholder-en'
      );
      expect(wrapper.find({ name: 'foo.de' })).toHaveProp(
        'placeholder',
        'placeholder-de'
      );
      expect(wrapper.find({ name: 'foo.es' })).toHaveProp(
        'placeholder',
        'placeholder-es'
      );
    });
  });

  describe('when every field should display an error', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        hasError: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });
    it('should open all fields', () => {
      expect(wrapper).toRender({ name: 'foo.en' });
      expect(wrapper).toRender({ name: 'foo.de' });
      expect(wrapper).toRender({ name: 'foo.es' });
    });
    it('should render each field with an error', () => {
      expect(wrapper.find({ name: 'foo.en' })).toHaveProp('hasError', true);
      expect(wrapper.find({ name: 'foo.de' })).toHaveProp('hasError', true);
      expect(wrapper.find({ name: 'foo.es' })).toHaveProp('hasError', true);
    });
  });

  describe('when there is an error', () => {
    describe('when the error is not on the selected language', () => {
      const germanError = <div id="german-error">Specific Error</div>;
      beforeEach(() => {
        props = createTestProps({
          name: 'foo',
          value: { en: '', de: '', es: '' },
          errors: { de: germanError },
          selectedLanguage: 'en',
        });
        wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
      });
      it('should open all fields', () => {
        expect(wrapper).toRender({ name: 'foo.en' });
        expect(wrapper).toRender({ name: 'foo.de' });
        expect(wrapper).toRender({ name: 'foo.es' });
      });
      it('should show an error on the field', () => {
        expect(wrapper.find({ name: 'foo.de' })).toHaveProp('hasError', true);
      });
      it('should render the error', () => {
        expect(wrapper.find('TranslationInput').at(1)).toHaveProp(
          'error',
          germanError
        );
      });
    });
    describe('when the error is on the selected language', () => {
      const englishError = <div id="english-error">Specific Error</div>;
      beforeEach(() => {
        props = createTestProps({
          name: 'foo',
          value: { en: '', de: '', es: '' },
          errors: { en: englishError },
          selectedLanguage: 'en',
        });
        wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
      });
      it('should render the first field', () => {
        expect(wrapper).toRender({ name: 'foo.en' });
      });
      it('should not open all fields', () => {
        expect(wrapper).not.toRender({ name: 'foo.de' });
        expect(wrapper).not.toRender({ name: 'foo.es' });
      });
      it('should show an error on the field', () => {
        expect(wrapper.find({ name: 'foo.en' })).toHaveProp('hasError', true);
      });
      it('should render the error', () => {
        expect(wrapper.find('TranslationInput')).toHaveProp(
          'error',
          englishError
        );
      });
    });
  });

  describe('other languages', () => {
    beforeEach(() => {
      props = createTestProps({
        selectedLanguage: 'en',
        value: {
          en: 'en',
          de: 'de',
          'nan-Hant-TW': 'nan-Hant-TW',
          fr: 'fr',
          'pt-BR': 'pt-BR',
          'en-GB': 'en-GB',
        },
        areLanguagesDefaultOpened: true,
      });
      wrapper = shallow(<LocalizedMultilineTextInput {...props} />);
    });

    it('should sort them by the relevance', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
