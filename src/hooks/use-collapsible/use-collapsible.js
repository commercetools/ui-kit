import React from 'react';

const useCollapsible = (defaultValue = true) => {
  const [isOpen, setIsOpen] = React.useState(defaultValue);
  const toggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return [isOpen, toggle];
};

export default useCollapsible;
