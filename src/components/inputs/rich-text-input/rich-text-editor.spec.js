import React from 'react';
import { Value } from 'slate';
import { render } from '../../../test-utils';
import RichTextInput from './rich-text-input';
import jsonValue from './testValue.json';

// mocks
window.getSelection = () => {};

const initialValue = Value.fromJSON(jsonValue);

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
});

describe('RichTextInput static methods', () => {
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
});
