import React from 'react';
import { shallow } from 'enzyme';
import Collapsible from '../../collapsible';
import LocalizedTextInput from './localized-text-input';

const createTestProps = custom => ({
  value: { en: 'Horse', de: 'Pferd' },
  onChange: jest.fn(),
  selectedLanguage: 'en',
  ...custom,
});

describe('createLocalizedString', () => {
  describe('when there are no existing translations', () => {
    it('should initialize all languages to an empty string', () => {
      expect(LocalizedTextInput.createLocalizedString(['en', 'de'])).toEqual({
        en: '',
        de: '',
      });
    });
  });
  describe('when there are existing translations', () => {
    describe('when all existing translations are part of the languages', () => {
      it('should reuse the existing translations and set the remaining languages to an empty string', () => {
        expect(
          LocalizedTextInput.createLocalizedString(['en', 'de'], { de: 'Foo' })
        ).toEqual({
          en: '',
          de: 'Foo',
        });
      });
    });
    describe('when the existing tranlsations contain translations not part of the languages', () => {
      it('should unify all translations and set the remaining languages to an empty string', () => {
        expect(
          LocalizedTextInput.createLocalizedString(['en', 'de'], {
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
      expect(LocalizedTextInput.isEmpty()).toBe(true);
    });
  });
  describe('when there are no translations', () => {
    it('should return true', () => {
      expect(LocalizedTextInput.isEmpty({})).toBe(true);
      expect(LocalizedTextInput.isEmpty({ en: '', de: '' })).toBe(true);
      expect(LocalizedTextInput.isEmpty({ de: '  ' })).toBe(true);
    });
  });
  describe('when there are translations', () => {
    it('should return false', () => {
      expect(LocalizedTextInput.isEmpty({ de: 'Hi' })).toBe(false);
      expect(LocalizedTextInput.isEmpty({ de: 'Hi', en: '' })).toBe(false);
    });
  });
});

describe('omitEmptyTranslations', () => {
  describe('when called with no value', () => {
    it('should throw an error', () => {
      expect(() => LocalizedTextInput.omitEmptyTranslations()).toThrow();
    });
  });
  describe('when there are only empty values', () => {
    it('should return an empty object', () => {
      expect(LocalizedTextInput.omitEmptyTranslations({})).toEqual({});
      expect(
        LocalizedTextInput.omitEmptyTranslations({ en: '', de: '' })
      ).toEqual({});
      expect(LocalizedTextInput.omitEmptyTranslations({ de: '  ' })).toEqual(
        {}
      );
    });
  });
  describe('when there are translations', () => {
    it('should return only the translated values', () => {
      expect(LocalizedTextInput.omitEmptyTranslations({ de: 'Hi' })).toEqual({
        de: 'Hi',
      });
      expect(
        LocalizedTextInput.omitEmptyTranslations({ de: 'Hi', en: '' })
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
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when collapsed', () => {
    describe('with id', () => {
      beforeEach(() => {
        props = createTestProps({ id: 'foo' });
        wrapper = shallow(<LocalizedTextInput {...props} />);
      });
      it('should add a language suffix to the id of each visible input', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ id: 'foo-en' });
      });
    });
    describe('with name', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<LocalizedTextInput {...props} />);
      });
      it('should forward the name', () => {
        // only the first language input is visible here
        expect(wrapper).toRender({ name: 'foo' });
      });
    });
  });

  describe('when expanded by default', () => {
    beforeEach(() => {
      props = createTestProps({ isDefaultExpanded: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when expansion toggle feature is disabled', () => {
    beforeEach(() => {
      props = createTestProps({ hideExpansionControls: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when autofocus is activated', () => {
    beforeEach(() => {
      props = createTestProps({ isAutofocussed: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in read-only mode', () => {
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when placeholders are provided', () => {
    beforeEach(() => {
      props = createTestProps({ placeholder: { en: 'Value', de: 'Wert' } });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      props = createTestProps({ error: { missing: true } });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('other languages', () => {
    let languagesWrapper;
    beforeEach(() => {
      props = createTestProps({
        value: {
          en: 'en',
          de: 'de',
          'nan-Hant-TW': 'nan-Hant-TW',
          fr: 'fr',
          'pt-BR': 'pt-BR',
        },
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
      languagesWrapper = wrapper.find(Collapsible).prop('children')({
        toggle: jest.fn(),
        isOpen: true,
      });
    });

    it('should sort them by the length', () => {
      expect(languagesWrapper).toMatchSnapshot();
    });
  });
});
