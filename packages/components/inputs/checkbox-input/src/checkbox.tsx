import { useRef, useEffect } from 'react';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import {
  filterAriaAttributes,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import type { TCheckboxProps } from './checkbox-input';

type TInputRef = {
  indeterminate: boolean;
};

const Checkbox = (props: TCheckboxProps) => {
  const ref = useRef<TInputRef>({
    indeterminate: false,
  });

  useEffect(() => {
    if (props.isIndeterminate) {
      ref.current.indeterminate = true;
    }
  }, [props.isIndeterminate]);

  return (
    <input
      type="checkbox"
      // @ts-ignore
      ref={ref}
      {...filterDataAttributes(props)}
      {...filterAriaAttributes(props)}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      aria-checked={props.isChecked}
      css={accessibleHiddenInputStyles}
      id={props.id}
      name={props.name}
      value={props.value}
      disabled={props.isDisabled || props.isReadOnly}
      readOnly={props.isReadOnly}
      checked={props.isChecked && !props.isIndeterminate}
      onChange={!props.isReadOnly ? props.onChange : undefined}
    />
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
