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
});
