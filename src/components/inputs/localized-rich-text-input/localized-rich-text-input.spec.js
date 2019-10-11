import React from 'react';
import { render } from '../../../test-utils';
import LocalizedRichTextInput from './localized-rich-text-input';

// mocks
window.getSelection = () => {};

const initialValue = LocalizedRichTextInput.deserialize('');

const baseProps = {
  value: { en: initialValue, de: initialValue },
  id: 'rich-text-input',
  onChange: () => {},
};

describe('LocalizedRichTextInput', () => {
  it('should have an HTML name', () => {
    const { getByLabelText } = render(
      <LocalizedRichTextInput {...baseProps} name="foo" selectedLanguage="en" />
    );
    expect(getByLabelText('EN')).toHaveAttribute('name', 'foo.en');
  });
  describe('when collapsed', () => {
    it('should render input the selected languages (en)', () => {
      const { getByLabelText, queryByLabelText } = render(
        <LocalizedRichTextInput {...baseProps} selectedLanguage="en" />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(queryByLabelText('DE')).not.toBeInTheDocument();
    });
  });

  describe('when expanded', () => {
    it('should render inputs for all the languages (en, de)', () => {
      const { getByLabelText } = render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          defaultExpandLanguages={true}
        />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(getByLabelText('DE')).toBeInTheDocument();
    });
  });
  describe('when expansion controls are hidden', () => {
    it('should render one input per language and no hide button', () => {
      const { getByLabelText, queryByLabelText } = render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          hideLanguageExpansionControls={true}
        />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(getByLabelText('DE')).toBeInTheDocument();
      expect(queryByLabelText(/hide languages/i)).not.toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    describe('when expanded', () => {
      it('should render a disabled input for each language (en, de)', () => {
        const { getByLabelText } = render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isDisabled={true}
          />
        );
        getByLabelText(/show all languages/i).click();
        expect(getByLabelText('EN')).toHaveAttribute('disabled');
        expect(getByLabelText('DE')).toHaveAttribute('disabled');
      });
    });
    describe('when not expanded', () => {
      it('should render a disabled input', () => {
        const { getByLabelText } = render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isDisabled={true}
          />
        );
        expect(getByLabelText('EN')).toHaveAttribute('disabled');
      });
    });
  });
  describe('when readonly', () => {
    describe('when expanded', () => {
      it('should render a readonly input for each language (en, de)', () => {
        const { getByLabelText } = render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isReadOnly={true}
          />
        );
        getByLabelText(/show all languages/i).click();
        expect(getByLabelText('EN')).not.toHaveAttribute('contenteditable');
        expect(getByLabelText('DE')).not.toHaveAttribute('contenteditable');
      });
    });
    describe('when not expanded', () => {
      it('should render a disabled input', () => {
        const { getByLabelText } = render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isReadOnly={true}
          />
        );
        expect(getByLabelText('EN')).not.toHaveAttribute('contenteditable');
      });
    });
  });
  describe('when every field should display an error', () => {
    const errors = {
      en: 'A value is required',
      de: 'Another error',
    };
    it('should be open all fields and render errors', () => {
      const { getByLabelText, getByText } = render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(getByLabelText('DE')).toBeInTheDocument();
      expect(getByText(errors.en)).toBeInTheDocument();
      expect(getByText(errors.de)).toBeInTheDocument();
    });
  });
  describe('when the error is not on the selected language', () => {
    const errors = {
      en: '',
      de: 'An error',
    };
    it('should be open all fields and render errors', () => {
      const { getByLabelText, getByText } = render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(getByLabelText('DE')).toBeInTheDocument();
      expect(getByText(errors.de)).toBeInTheDocument();
    });
  });
  describe('when the error is on the selected language', () => {
    it('should display the error without expanding', () => {
      const errors = {
        en: 'A value required',
      };
      const { getByLabelText, getByText, queryByLabelText } = render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(getByLabelText('EN')).toBeInTheDocument();
      expect(getByText(errors.en)).toBeInTheDocument();
      expect(queryByLabelText('DE')).not.toBeInTheDocument();
    });
  });
});
