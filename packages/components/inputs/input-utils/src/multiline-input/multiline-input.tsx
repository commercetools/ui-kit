import { useRef, useCallback, ChangeEventHandler } from 'react';
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
  isCondensed?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  name?: string;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value: string;
  isOpen: boolean;
  cacheMeasurements?: boolean;
  onHeightChange?: (height: number, rowCount: number) => void;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
};

// We cache the vertical padding of the element becuase
// it does not change over time so we don't need to
// recalculate it on every height change event.
let _elementVerticalPadding: number | null = null;
const getElementVerticalPadding = (element: Element) => {
  if (_elementVerticalPadding === null) {
    const computedStyle = getComputedStyle(element);
    const paddingTop = parseInt(computedStyle.paddingTop, 10);
    const paddingBottom = parseInt(computedStyle.paddingBottom, 10);
    _elementVerticalPadding = paddingTop + paddingBottom;
  }
  return _elementVerticalPadding;
};

const MultilineInput = (props: TMultiLineInputProps) => {
  const { onHeightChange } = props;
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleHeightChange = useCallback<
    (height: number, meta: TextareaHeightChangeMeta) => void
  >(
    (_, meta: TextareaHeightChangeMeta) => {
      const containerHeight = ref.current!.scrollHeight;
      const textHeight =
        containerHeight - getElementVerticalPadding(ref.current!);
      const rowCount = Math.floor(textHeight / meta.rowHeight);

      if (onHeightChange) {
        onHeightChange(containerHeight, rowCount);
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
      cacheMeasurements={
        props.cacheMeasurements !== undefined ? props.cacheMeasurements : true
      }
      {...filterDataAttributes(props)}
    />
  );
};

MultilineInput.displayName = 'MultilineInput';

export default MultilineInput;
