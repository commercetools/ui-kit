import { useCallback, useState } from 'react';

const useToggleState = (defaultValue = true) => {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const toggle = useCallback(
    (forceIsToggled) => {
      setIsToggled(
        typeof forceIsToggled === 'boolean' ? forceIsToggled : !isToggled
      );
    },
    [isToggled]
  );

  return [isToggled, toggle];
};

export default useToggleState;
