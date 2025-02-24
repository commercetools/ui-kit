import { useState, useCallback, useRef } from 'react';
import RichTextInput from '@commercetools-uikit/rich-text-input';

const html = '<p>hello world</p>';

const Example = (props) => {
  const [value, setValue] = useState(html);
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const ref = useRef(null);
  const handleReset = useCallback(() => {
    ref.current?.resetValue('<p>after reset</p>');
  }, []);

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <RichTextInput value={value} onChange={handleChange} ref={ref} />
    </>
  );
};

export default Example;
