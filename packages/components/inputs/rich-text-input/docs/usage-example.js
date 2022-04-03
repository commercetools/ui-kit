import React from 'react';
import RichTextInput from '@commercetools-uikit/rich-text-input';

const html = '<p>hello world</p>';

const Example = (props) => {
  const [value, setValue] = React.useState(html);
  return (
    <RichTextInput
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

export default Example;
