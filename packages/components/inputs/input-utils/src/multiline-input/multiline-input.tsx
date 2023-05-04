import { useRef, useCallback, ChangeEventHandler, useEffect } from 'react';
import TextareaAutosize, {
  TextareaHeightChangeMeta,
} from 'react-textarea-autosize';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
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
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value: string;
  isOpen: boolean;
  onHeightChange?: (height: number, rowCount: number) => void;
  calculateFirstRowHeight?: (age: number) => void;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
};

const MultilineInput = (props: TMultiLineInputProps) => {
  const { onHeightChange, calculateFirstRowHeight } = props;
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Getting the line height and paddings of the element and then calculating the height of one row.
    const elementComputedStyles = getComputedStyle(ref.current as Element);
    const lineHeight = parseInt(
      elementComputedStyles.getPropertyValue('line-height'),
      10
    );
    const paddingTop = parseInt(
      elementComputedStyles.getPropertyValue('padding-top'),
      10
    );
    const paddingBottom = parseInt(
      elementComputedStyles.getPropertyValue('padding-bottom'),
      10
    );
    const elementHeight = lineHeight + paddingTop + paddingBottom;

    if (calculateFirstRowHeight) {
      calculateFirstRowHeight(elementHeight);
    }
  }, [ref, calculateFirstRowHeight]);

  const handleHeightChange = useCallback<
    (height: number, meta: TextareaHeightChangeMeta) => void
  >(
    (height: number, meta: TextareaHeightChangeMeta) => {
      const rowCount = Math.floor(
        ref.current?.scrollHeight || 0 / meta.rowHeight
      );
      if (onHeightChange) {
        onHeightChange(height, rowCount);
      }
    },
    [ref, onHeightChange]
  );

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'MultilineInput: "onChange" is required when is not read only.'
    );
  }

  return (
    <TextareaAutosize
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
      css={getTextareaStyles(props)}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      aria-multiline="true"
      aria-invalid={props['aria-invalid']}
      aria-errormessage={props['aria-errormessage']}
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
