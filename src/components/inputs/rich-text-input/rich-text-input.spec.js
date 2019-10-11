import React from 'react';
import { render } from '../../../test-utils';
import RichTextInput from './rich-text-input';

// mocks
window.getSelection = () => {};

const initialValue = RichTextInput.deserialize('');

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

  it('should call onFocus when focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <RichTextInput {...baseProps} onFocus={onFocus} id="foo-bar" />
    );
    const input = container.querySelector('#foo-bar');
    input.focus();
    expect(onFocus).toHaveBeenCalled();
    // expect(container.querySelector("[id='foo-bar']")).toBeInTheDocument();
  });

  describe('when defaultExpandMultilineText is enabled', () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientHeight'
    );
    describe('when height of text is less than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 31,
        });
      });

      afterAll(() => {
        Object.defineProperty(
          HTMLElement.prototype,
          'clientHeight',
          originalOffsetHeight
        );
      });

      it(`should not show the 'expand' button`, () => {
        const { queryByText } = render(
          <RichTextInput {...baseProps} value={initialValue} data-foo="bar" />
        );

        expect(queryByText('Expand')).not.toBeInTheDocument();
      });
    });
    describe('when height of text is more than 32', () => {
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 33,
        });
      });

      afterAll(() => {
        Object.defineProperty(
          HTMLElement.prototype,
          'clientHeight',
          originalOffsetHeight
        );
      });

      it(`should show the 'expand' button and expand when clicked`, () => {
        const { getByText } = render(
          <RichTextInput {...baseProps} value={initialValue} />
        );

        const button = getByText('Expand');
        expect(button).toBeInTheDocument(); // is this line necessary since getByText will fail if it's not found :thinking:
        button.click();
        expect(getByText('Collapse')).toBeInTheDocument();
      });
    });
  });
  describe('when defaultExpandMultilineText is disabled', () => {
    describe('when height of text is less than 32', () => {
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'clientHeight'
      );
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 31,
        });
      });

      afterAll(() => {
        Object.defineProperty(
          HTMLElement.prototype,
          'clientHeight',
          originalOffsetHeight
        );
      });

      it(`should not show the 'collapse' button`, () => {
        const { queryByText } = render(
          <RichTextInput
            {...baseProps}
            value={initialValue}
            data-foo="bar"
            defaultExpandMultilineText={true}
          />
        );

        expect(queryByText('Collapse')).not.toBeInTheDocument();
      });
    });
    describe('when height of text is more than 32', () => {
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'clientHeight'
      );
      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 33,
        });
      });

      afterAll(() => {
        Object.defineProperty(
          HTMLElement.prototype,
          'clientHeight',
          originalOffsetHeight
        );
      });

      it(`should show the 'collapse' button and collapse when clicked`, () => {
        const { getByText } = render(
          <RichTextInput
            {...baseProps}
            value={initialValue}
            defaultExpandMultilineText={true}
          />
        );

        const button = getByText('Collapse');
        expect(button).toBeInTheDocument();
        button.click();
        expect(getByText('Expand')).toBeInTheDocument();
      });
    });
  });
});

describe('RichTextInput static methods', () => {
  describe('serialize / deserialize', () => {
    describe('when called with a simple HTML value', () => {
      it('should be able to serialize and deserialize back to same value', () => {
        const html = '<p>hello world</p>';
        const slateValue = RichTextInput.deserialize(html);
        expect(RichTextInput.serialize(slateValue)).toEqual(html);
      });
    });
    describe('when called with a more complex HTML value', () => {
      it('should be able to serialize and deserialize back to same value', () => {
        const html = `<h1>Hello World</h1><h1></h1><p>This is rich text, <strong>way</strong> better than <u>other</u> kind&#x27;s of text.</p><p></p><ol><li>Numbered list</li><li>Second number</li></ol><ul><li>Bullet list</li></ul>`;
        const slateValue = RichTextInput.deserialize(html);
        expect(RichTextInput.serialize(slateValue)).toEqual(html);
      });
    });
    describe('when called with an HTML value that contains tags we do not yet support', () => {
      it('should be able to serialize and deserialize to the default tag', () => {
        const html =
          '<a href="https://google.com">hello world<img src="blah" alt="foobar" /></a>';
        const slateValue = RichTextInput.deserialize(html);
        expect(RichTextInput.serialize(slateValue)).toEqual(
          `<p>hello world</p>`
        );
      });
    });
  });
  describe('RichTextInput.isEmpty', () => {
    it('should return `false` when used with a non empty value', () => {
      const value = RichTextInput.deserialize('<p>Foo</p>');
      expect(RichTextInput.isEmpty(value)).toBeFalsy();
    });
    it('should return `true` when used with an empty value', () => {
      const value = RichTextInput.deserialize('');
      expect(RichTextInput.isEmpty(value)).toBeTruthy();
    });
  });
});
