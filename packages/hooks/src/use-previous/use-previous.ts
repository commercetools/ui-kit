import { useRef, useEffect } from 'react';

const usePrevious = <Ref>(value: Ref) => {
  const ref = useRef<Ref>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
