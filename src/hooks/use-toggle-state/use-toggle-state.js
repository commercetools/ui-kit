import { useCallback, useState } from 'react';

const useToggleState = (defaultValue = true) => {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const setOn = useCallback(() => {
    setIsToggled(true);
  }, [setIsToggled]);

  const setOff = useCallback(() => {
    setIsToggled(false);
  }, [setIsToggled]);

  const toggle = useCallback(
    forceIsToggled => {
      setIsToggled(
        typeof forceIsToggled === 'boolean' ? forceIsToggled : !isToggled
      );
    },
    [isToggled]
  );

  return [isToggled, toggle, setOn, setOff];
};

export default useToggleState;
