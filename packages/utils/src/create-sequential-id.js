// Whenever a field requires a unique id, this factory can be used
// to create a function returning unique ids.
//
// Use it as
//  const sequentialId = createSequentialId('text-field-');
//  const element = <div id={sequentialId()}>foo</div>
const createSequentialId = (prefix) => {
  let id = 0;
  return () => {
    id += 1;
    return `${prefix}${id}`;
  };
};

export default createSequentialId;
