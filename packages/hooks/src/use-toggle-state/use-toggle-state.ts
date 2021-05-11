import { useCallback, useState } from 'react';

const useToggleState = (
  defaultValue?: boolean
): [boolean, (forceIsToggled?: boolean) => void] => {
  const initialValue = typeof defaultValue === 'boolean' ? defaultValue : true;

  const [isToggled, setIsToggled] = useState(initialValue);
  const toggle = useCallback(
    (forceIsToggled?: boolean) => {
      setIsToggled(
        typeof forceIsToggled === 'boolean' ? forceIsToggled : !isToggled
      );
    },
    [isToggled, setIsToggled]
  );
  return [isToggled, toggle];
};

export default useToggleState;
