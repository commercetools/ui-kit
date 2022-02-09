import { useCallback } from 'react';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';

type Props = {
  handleFocus: () => void;
  isFocused: boolean;
  id?: string;
  disabled?: boolean;
  readOnly: boolean;
};

const HiddenInput = (props: Props) => {
  const { handleFocus } = props;
  const onFocus = useCallback(
    (event) => {
      event.preventDefault();
      if (!props.isFocused) {
        handleFocus();
      }
    },
    [props.isFocused, handleFocus]
  );

  const onBlur = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <input
      css={accessibleHiddenInputStyles}
      id={props.id}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={props.disabled}
      tabIndex={props.readOnly ? 0 : -1}
    />
  );
};

HiddenInput.displayName = 'HiddenInput';

export default HiddenInput;
