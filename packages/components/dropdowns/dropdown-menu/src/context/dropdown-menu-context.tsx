import { createContext, useContext } from 'react';

export type TDropdownMenuContextProps = {
  isOpen: boolean;
  toggle: () => void;
};
const DropdownMenuContext = createContext<TDropdownMenuContextProps>({
  isOpen: false,
  toggle: () => {},
});

export function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      '[ui-kit] DropdownMenu context can only be used in DropdownMenu children components.'
    );
  }

  return {
    isOpen: context.isOpen,
    toggle: context.toggle,
  };
}

export default DropdownMenuContext;
