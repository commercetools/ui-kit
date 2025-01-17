import { screen, render, fireEvent } from '../../../../../test/test-utils';
import RichTextInput from './rich-text-input';

// mocks
window.getSelection = () => {};

const initialValue = '';

const baseProps = { value: initialValue, onChange: () => {} };

describe('RichTextInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(
      <RichTextInput {...baseProps} data-foo="bar" />
    );
    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });

  it('should have an HTML name', () => {
    const { container } = render(
      <RichTextInput {...baseProps} name="foo-bar" />
    );
    expect(container.querySelector("[name='foo-bar']")).toBeInTheDocument();
  });

  it('should have an id', () => {
    const { container } = render(<RichTextInput {...baseProps} id="foo-bar" />);
    expect(container.querySelector("[id='foo-bar']")).toBeInTheDocument();
  });

  describe('when defaultExpandMultilineText is enabled', () => {
    describe('when height of text is less than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 31,
        });
      });

      it(`should not show the 'expand' button`, () => {
        render(
          <RichTextInput {...baseProps} value={initialValue} data-foo="bar" />
        );

        expect(screen.queryByText('Expand')).not.toBeInTheDocument();
      });
    });
    describe('when height of text is more than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 33,
        });
      });

      it(`should show the 'expand' button and expand when clicked`, () => {
        render(<RichTextInput {...baseProps} value={initialValue} />);

        const button = screen.getByText('Expand');
        expect(button).toBeInTheDocument(); // is this line necessary since getByText will fail if it's not found :thinking:
        fireEvent.click(button);
        expect(screen.getByText('Collapse')).toBeInTheDocument();
      });
    });
  });
  describe('when defaultExpandMultilineText is disabled', () => {
    describe('when height of text is less than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 31,
        });
      });
      it(`should not show the 'collapse' button`, () => {
        render(
          <RichTextInput
            {...baseProps}
            value={initialValue}
            data-foo="bar"
            defaultExpandMultilineText={true}
          />
        );

        expect(screen.queryByText('Collapse')).not.toBeInTheDocument();
      });
    });
    describe('when height of text is more than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 33,
        });
      });

      it(`should show the 'collapse' button and collapse when clicked`, () => {
        render(
          <RichTextInput
            {...baseProps}
            value={initialValue}
            defaultExpandMultilineText={true}
          />
        );

        const button = screen.getByText('Collapse');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText('Expand')).toBeInTheDocument();
      });
    });
  });
});

describe('RichTextInput static methods', () => {
  describe('RichTextInput.isEmpty', () => {
    it('should return `false` when used with a non empty value', () => {
      const value = '<p>Foo</p>';
      expect(RichTextInput.isEmpty(value)).toBeFalsy();
    });
    it('should return `true` when used with an empty value', () => {
      const value = '';
      expect(RichTextInput.isEmpty(value)).toBeTruthy();
    });
  });
});
