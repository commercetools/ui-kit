import { useCallback, useState } from 'react';

const useToggleState = (defaultValue?: boolean) => {
  const [isToggled, setIsToggled] = useState<boolean>(defaultValue || true);
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
