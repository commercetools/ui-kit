import React, { ChangeEventHandler } from 'react';
import { useTheme } from '@emotion/react';
import TextareaAutosize, {
  TextareaHeightChangeMeta,
} from 'react-textarea-autosize';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { getTextareaStyles } from './multiline-input.styles';

const MIN_ROW_COUNT = 1;

export type TMultiLineInputProps = {
  autoComplete?: string;
  className?: string;
  hasError?: boolean;
  hasWarning?: boolean;
  id?: string;
  isAutofocussed?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  name?: string;
  onBlur?: ChangeEventHandler;
  onChange?: ChangeEventHandler;
  onFocus?: ChangeEventHandler;
  placeholder?: string;
  value: string;
  isOpen: boolean;
  onHeightChange?: (height: number, rowCount: number) => void;
};

type TInputRef = {
  scrollHeight: number;
};

const MultilineInput = (props: TMultiLineInputProps) => {
  const theme = useTheme();
  const { onHeightChange } = props;
  const ref = React.useRef<TInputRef>({ scrollHeight: 0 });
  const handleHeightChange = React.useCallback<
    (height: number, meta: TextareaHeightChangeMeta) => void
  >(
    (height: number, meta: TextareaHeightChangeMeta) => {
      const rowCount = Math.floor(ref.current.scrollHeight / meta.rowHeight);
      if (onHeightChange) {
        onHeightChange(height, rowCount);
      }
    },
    [ref, onHeightChange]
  );
  return (
    <TextareaAutosize
      // @ts-ignore
      ref={ref}
      name={props.name}
      onHeightChange={handleHeightChange}
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      css={getTextareaStyles(props, theme)}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      aria-multiline="true"
      role="textbox"
      minRows={MIN_ROW_COUNT}
      maxRows={props.isOpen ? undefined : MIN_ROW_COUNT}
      cacheMeasurements={true}
      {...filterDataAttributes(props)}
    />
  );
};

MultilineInput.displayName = 'MultilineInput';

export default MultilineInput;
