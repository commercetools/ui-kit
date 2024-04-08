import { ReactNode, forwardRef } from 'react';

export type TDropdownTriggerProps = {
  onClick: () => void;
  children: ReactNode;
};
const DropDownTrigger = forwardRef<HTMLDivElement, TDropdownTriggerProps>(
  (props, ref) => {
    return (
      <div onClick={props.onClick} ref={ref}>
        {props.children}
      </div>
    );
  }
);
DropDownTrigger.displayName = 'DropDownTrigger';

export default DropDownTrigger;
