import React from 'react';

const useToggleState = (defaultValue = true) => {
  const [isToggled, setIsToggled] = React.useState(defaultValue);
  const toggle = React.useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  return [isToggled, toggle];
};

export default useToggleState;
