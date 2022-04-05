import React from 'react';
import RichTextInput from '@commercetools-uikit/rich-text-input';

const html = '<p>hello world</p>';

const Example = (props) => {
  const [value, setValue] = React.useState(html);
  const handleChange = React.useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const ref = React.useRef(null);
  const handleReset = React.useCallback(() => {
    ref.current?.reset('<p>after reset</p>');
  }, []);

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <RichTextInput value={value} onChange={handleChange} ref={ref} />
    </>
  );
};

export default Example;
