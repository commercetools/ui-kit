import { useRef, useEffect, useCallback, ChangeEventHandler } from 'react';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import {
  filterAriaAttributes,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import type { TCheckboxProps } from './checkbox-input';

type TInputRef = {
  indeterminate: boolean;
};

type TProps = Omit<TCheckboxProps, 'children' | 'hasError' | 'isHovered'> & {
  type?: string;
};

const Checkbox = (props: TProps) => {
  const ref = useRef<TInputRef>({
    indeterminate: false,
  });

  useEffect(() => {
    if (props.isIndeterminate) {
      ref.current.indeterminate = true;
    }
  }, [props.isIndeterminate]);

  const { onChange } = props;
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => !props.isReadOnly && onChange && onChange(event),
    [props.isReadOnly, onChange]
  );

  return (
    <input
      role="checkbox"
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
      {...props}
      onChange={handleChange}
    />
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
