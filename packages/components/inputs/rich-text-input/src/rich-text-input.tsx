import {
  PureComponent,
  forwardRef,
  type ForwardedRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type FocusEventHandler,
} from 'react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  html,
  isEmpty,
  validSlateStateAdapter,
} from '@commercetools-uikit/rich-text-utils';
import Editor from './editor';
import type { Deserialized } from '../../rich-text-utils/src/html';

type TBaseEvent = {
  target: {
    id?: string;
    name?: string;
  };
};

export type TChangeEvent = {
  target: TBaseEvent['target'] & {
    value: string;
  };
};

export type TRichTextInputProps = {
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Expands multiline text input initially
   */
  defaultExpandMultilineText?: boolean;
  /**
   * Indicates the input field has an error
   */
  hasError?: boolean;
  /**
   * Indicates the input field has warning
   */
  hasWarning?: boolean;
  /**
   * Used as the HTML `id` attribute.
   */
  id?: string;
  /**
   * Used as the HTML `name` attribute.
   */
  name?: string;
  /**
   * Placeholder value to show in the input field
   */
  placeholder: string;
  /**
   * Disables the rich text input
   */
  isDisabled?: boolean;
  /**
   * Indicates that the rich text input is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Horizontal size limit of the input fields
   */
  horizontalConstraint?:
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: (event: TChangeEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLDivElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /**
   * Value of the input component.
   */
  value?: string;
  /**
   * Indicates whether the expand icon should be visible
   */
  showExpandIcon: boolean;
  /**
   * Called when the `expand` button is clicked
   */
  onClickExpand?: () => boolean;
};

class RichTextInput extends PureComponent<
  TRichTextInputProps & { parentRef?: ForwardedRef<unknown> }
> {
  static defaultProps: Pick<
    TRichTextInputProps,
    | 'defaultExpandMultilineText'
    | 'horizontalConstraint'
    | 'placeholder'
    | 'showExpandIcon'
  > = {
    defaultExpandMultilineText: false,
    horizontalConstraint: 'scale',
    placeholder: '',
    showExpandIcon: false,
  };

  static displayName = 'RichTextInput';

  serializedValue = this.props.value;
  internalSlateValue = validSlateStateAdapter(
    html.deserialize(this.props.value || '')
  );

  componentDidUpdate() {
    // everytime we call `onChange`, we update `this.serializedValue`
    // to the new HTML value
    // this condition only occurs if the parent component takes `control`
    // and resets the component to a different HTML value that what
    // we expect
    // in this case, we need to parse this new value into a value slate
    // can understand, save this value to our class variable, and forceUpdate
    // this keeps the component in sync.
    if (this.props.value !== this.serializedValue) {
      const value = this.props.value || '';
      this.internalSlateValue = validSlateStateAdapter(html.deserialize(value));
      this.serializedValue = value;
      this.forceUpdate();
    }
  }

  onValueChange = (state: Deserialized | Deserialized[]) => {
    const serializedValue = html.serialize(state);
    // because we are not using setState, we need to make sure that
    // we perform an update when the slate value changes
    // as this can contain things like cursor location
    // in this case, the internalSlateValue would change
    // but the serializedValue would NOT change.
    const hasInternalSlateValueChanged = this.internalSlateValue !== state;

    const hasSerializedValueChanged = serializedValue !== this.serializedValue;
    this.internalSlateValue = validSlateStateAdapter(state);
    this.serializedValue = serializedValue;
    // the consumer only cares about the serializedValue, so it doesn't make sense to call
    // onChange unless this value changes.
    if (hasSerializedValueChanged) {
      this.props.onChange?.({ target: { value: html.serialize(state) } });
    }

    if (hasInternalSlateValueChanged && !hasSerializedValueChanged) {
      // this way we force update if cursor or selection changes
      this.forceUpdate();
    }
  };

  render() {
    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'RichTextInput: "onChange" is required when input is not read only.'
      );
    }
    if (this.props.showExpandIcon) {
      warning(
        typeof this.props.onClickExpand === 'function',
        'RichTextInput: "onClickExpand" is required when showExpandIcon is true'
      );
    }
    return (
      <Editor
        {...filterDataAttributes(this.props)}
        isAutofocused={this.props.isAutofocussed}
        id={this.props.id}
        name={this.props.name}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        isDisabled={this.props.isDisabled}
        isReadOnly={this.props.isReadOnly || this.props.isDisabled}
        value={this.internalSlateValue}
        onChange={this.onValueChange}
        horizontalConstraint={this.props.horizontalConstraint}
        defaultExpandMultilineText={this.props.defaultExpandMultilineText}
        hasWarning={this.props.hasWarning}
        hasError={this.props.hasError}
        placeholder={this.props.placeholder}
        showExpandIcon={this.props.showExpandIcon}
        onClickExpand={this.props.onClickExpand}
        ref={this.props.parentRef}
      />
    );
  }
}

// When component is using `forwardRef` only `defaultProps` and `displayName` are recognized by default as static props
type StaticProps = {
  isEmpty: typeof isEmpty;
  isTouched: typeof isTouched;
};

const isTouched = (touched: boolean | unknown[]) => Boolean(touched);

const RichTextInputWithRef: ForwardRefExoticComponent<
  TRichTextInputProps & RefAttributes<unknown>
> &
  Partial<StaticProps> = forwardRef((props: TRichTextInputProps, ref) => (
  <RichTextInput parentRef={ref} {...props} />
));
RichTextInputWithRef.displayName = 'RichTextInputWithRef';
RichTextInputWithRef.isEmpty = isEmpty;
RichTextInputWithRef.isTouched = isTouched;

export default RichTextInputWithRef;
