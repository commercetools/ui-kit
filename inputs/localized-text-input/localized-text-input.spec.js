import React from 'react';
import { shallow } from 'enzyme';
import LocalizedTextInput from './localized-text-input';

const createTestProps = custom => ({
  value: { en: 'Horse', de: 'Pferd' },
  onChange: jest.fn(),
  selectedLanguage: 'en',
  ...custom,
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
        expect(wrapper).toRender({ id: 'foo.en' });
      });
    });
    describe('with name', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<LocalizedTextInput {...props} />);
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
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
        hideExpansionControls: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });
    it('should open all languages', () => {
      expect(wrapper).toRender({ name: 'foo.en' });
      expect(wrapper).toRender({ name: 'foo.de' });
      expect(wrapper).toRender({ name: 'foo.es' });
    });
  });

  describe('when autofocus is activated', () => {
    beforeEach(() => {
      props = createTestProps({
        name: 'foo',
        value: { en: '', de: '', es: '' },
        isAutofocussed: true,
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
        isDefaultExpanded: true,
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
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
      wrapper = shallow(<LocalizedTextInput {...props} />);
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
      beforeEach(() => {
        props = createTestProps({
          name: 'foo',
          value: { en: '', de: '', es: '' },
          errors: { de: <div id="german-error">Specific Error</div> },
          selectedLanguage: 'en',
        });
        wrapper = shallow(<LocalizedTextInput {...props} />);
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
        expect(wrapper).toRender('#german-error');
      });
    });
    describe('when the error is on the selected language', () => {
      beforeEach(() => {
        props = createTestProps({
          name: 'foo',
          value: { en: '', de: '', es: '' },
          errors: { en: <div id="english-error">Specific Error</div> },
          selectedLanguage: 'en',
        });
        wrapper = shallow(<LocalizedTextInput {...props} />);
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
        expect(wrapper).toRender('#english-error');
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
        isDefaultExpanded: true,
      });
      wrapper = shallow(<LocalizedTextInput {...props} />);
    });

    it('should sort them by the relevance', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
