import React from 'react';

const usePrevious = <Ref>(value: Ref) => {
  const ref = React.useRef<Ref>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
