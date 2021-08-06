import { screen, render } from '../../../../../test/test-utils';
import LocalizedRichTextInput from './localized-rich-text-input';

// mocks
window.getSelection = () => {};

const initialValue = '';

const baseProps = {
  value: { en: initialValue, de: initialValue },
  id: 'rich-text-input',
  'data-testid': 'rich-text-data-test',
  onChange: () => {},
};

describe('LocalizedRichTextInput', () => {
  it('should have an HTML name', () => {
    render(
      <LocalizedRichTextInput {...baseProps} name="foo" selectedLanguage="en" />
    );
    expect(screen.getByTestId('rich-text-data-test-en')).toHaveAttribute(
      'name',
      'foo.en'
    );
  });
  describe('when collapsed', () => {
    it('should render input the selected languages (en)', () => {
      render(<LocalizedRichTextInput {...baseProps} selectedLanguage="en" />);
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(
        screen.queryByLabelText('rich-text-data-test-de')
      ).not.toBeInTheDocument();
    });
  });

  describe('when expanded', () => {
    it('should render inputs for all the languages (en, de)', () => {
      render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          defaultExpandLanguages={true}
        />
      );
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(screen.getByTestId('rich-text-data-test-de')).toBeInTheDocument();
    });
  });
  describe('when expansion controls are hidden', () => {
    it('should render one input per language and no hide button', () => {
      render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          hideLanguageExpansionControls={true}
        />
      );
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(screen.getByTestId('rich-text-data-test-de')).toBeInTheDocument();
      expect(
        screen.queryByLabelText(/hide languages/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    describe('when expanded', () => {
      it('should render a disabled input for each language (en, de)', () => {
        render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isDisabled={true}
          />
        );
        screen.getByLabelText(/show all languages/i).click();

        // eslint-disable-next-line jest-dom/prefer-enabled-disabled
        expect(screen.getByTestId('rich-text-data-test-en')).toHaveAttribute(
          'disabled'
        );
        // eslint-disable-next-line jest-dom/prefer-enabled-disabled
        expect(screen.getByTestId('rich-text-data-test-de')).toHaveAttribute(
          'disabled'
        );
      });
    });
    describe('when not expanded', () => {
      it('should render a disabled input', () => {
        render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isDisabled={true}
          />
        );
        // eslint-disable-next-line jest-dom/prefer-enabled-disabled
        expect(screen.getByTestId('rich-text-data-test-en')).toHaveAttribute(
          'disabled'
        );
      });
    });
  });
  describe('when readonly', () => {
    describe('when expanded', () => {
      it('should render a readonly input for each language (en, de)', () => {
        render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isReadOnly={true}
          />
        );
        screen.getByLabelText(/show all languages/i).click();
        expect(
          screen.getByTestId('rich-text-data-test-en')
        ).not.toHaveAttribute('contenteditable');
        expect(
          screen.getByTestId('rich-text-data-test-de')
        ).not.toHaveAttribute('contenteditable');
      });
    });
    describe('when not expanded', () => {
      it('should render a disabled input', () => {
        render(
          <LocalizedRichTextInput
            {...baseProps}
            selectedLanguage="en"
            isReadOnly={true}
          />
        );
        expect(
          screen.getByTestId('rich-text-data-test-en')
        ).not.toHaveAttribute('contenteditable');
      });
    });
  });
  describe('when every field should display an error', () => {
    const errors = {
      en: 'A value is required',
      de: 'Another error',
    };
    it('should be open all fields and render errors', () => {
      render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(screen.getByTestId('rich-text-data-test-de')).toBeInTheDocument();
      expect(screen.getByText(errors.en)).toBeInTheDocument();
      expect(screen.getByText(errors.de)).toBeInTheDocument();
    });
  });
  describe('when the error is not on the selected language', () => {
    const errors = {
      en: '',
      de: 'An error',
    };
    it('should be open all fields and render errors', () => {
      render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(screen.getByTestId('rich-text-data-test-de')).toBeInTheDocument();
      expect(screen.getByText(errors.de)).toBeInTheDocument();
    });
  });
  describe('when the error is on the selected language', () => {
    it('should display the error without expanding', () => {
      const errors = {
        en: 'A value required',
      };
      render(
        <LocalizedRichTextInput
          {...baseProps}
          selectedLanguage="en"
          errors={errors}
        />
      );
      expect(screen.getByTestId('rich-text-data-test-en')).toBeInTheDocument();
      expect(screen.getByText(errors.en)).toBeInTheDocument();
      expect(
        screen.queryByLabelText('rich-text-data-test-de')
      ).not.toBeInTheDocument();
    });
  });
});
