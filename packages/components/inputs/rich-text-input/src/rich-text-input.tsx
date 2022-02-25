import { PureComponent, type FocusEvent } from 'react';
import { Editor } from 'slate-react';
import pick from 'lodash/pick';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  richTextPlugins,
  html,
  isEmpty,
} from '@commercetools-uikit/rich-text-utils';
import renderEditor, { type TEditorProps } from './editor';

type TBaseEvent = {
  target: {
    id?: string;
    name?: string;
  };
};

type TChangeEvent = {
  target: TBaseEvent['target'] & {
    value: string;
  };
};

type TFocusEvent = TBaseEvent;

type TEventHook<T = Event> = (
  event: T,
  editor: Editor,
  next: () => unknown
) => unknown;

type TOnChangeParam = {
  operations: unknown;
  value: ReturnType<typeof html.deserialize>;
};
type TOnChangeFn = (change: TOnChangeParam) => unknown;

export type TRichTextInputProps = {
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Expands multiline text input initially
   */
  defaultExpandMultilineText?: TEditorProps['defaultExpandMultilineText'];
  /**
   * Indicates the input field has an error
   */
  hasError?: TEditorProps['hasError'];
  /**
   * Indicates the input field has warning
   */
  hasWarning?: TEditorProps['hasWarning'];
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
  isDisabled?: TEditorProps['isDisabled'];
  /**
   * Indicates that the rich text input is displaying read-only content
   */
  isReadOnly?: TEditorProps['isReadOnly'];
  /**
   * Horizontal size limit of the input fields
   */
  horizontalConstraint?: TEditorProps['horizontalConstraint'];
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: (event: TChangeEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: (event: TFocusEvent) => void;
  /**
   * Called when input is blurred
   */
  onBlur?: (event: TFocusEvent) => void;
  /**
   * Value of the input component.
   */
  value?: string;
  /**
   * Indicates whether the expand icon should be visible
   */
  showExpandIcon: TEditorProps['showExpandIcon'];
  /**
   * Called when the `expand` button is clicked
   */
  onClickExpand?: TEditorProps['onClickExpand'];
};

class RichTextInput extends PureComponent<TRichTextInputProps> {
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
  static isEmpty = isEmpty;
  static isTouched = (touched: boolean | unknown[]) => Boolean(touched);

  serializedValue = this.props.value;
  internalSlateValue = html.deserialize(this.props.value || '');

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
      this.internalSlateValue = html.deserialize(value);
      this.serializedValue = value;
      this.forceUpdate();
    }
  }

  onValueChange: TOnChangeFn = (event) => {
    const serializedValue = html.serialize(event.value);

    // because we are not using setState, we need to make sure that
    // we perform an update when the slate value changes
    // as this can contain things like cursor location
    // in this case, the internalSlateValue would change
    // but the serializedValue would NOT change.
    const hasInternalSlateValueChanged =
      this.internalSlateValue !== event.value;

    const hasSerializedValueChanged = serializedValue !== this.serializedValue;

    this.internalSlateValue = event.value;
    this.serializedValue = serializedValue;

    // the consumer only cares about the serializedValue, so it doesn't make sense to call
    // onChange unless this value changes.
    if (hasSerializedValueChanged) {
      const fakeEvent = {
        target: {
          id: this.props.id,
          name: this.props.name,
          value: serializedValue,
        },
      };

      this.props.onChange?.(fakeEvent);
    }

    if (hasInternalSlateValueChanged && !hasSerializedValueChanged) {
      // this way we force update if cursor or selection changes
      this.forceUpdate();
    }
  };

  // this issue explains why we need to use next() + setTimeout
  // for calling our passed onBlur handler
  // https://github.com/ianstormtaylor/slate/issues/2434
  onBlur: TEventHook<FocusEvent> = (_event, _editor, next) => {
    next();

    if (this.props.onBlur) {
      const fakeEvent = {
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      };
      setTimeout(() => this.props.onBlur?.(fakeEvent), 0);
    }
  };

  onFocus: TEventHook<FocusEvent> = (_event, _editor, next) => {
    next();
    if (this.props.onFocus) {
      const fakeEvent = {
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      };
      setTimeout(() => this.props.onFocus?.(fakeEvent), 0);
    }
  };

  render() {
    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'RichTextInput: "onChange" is required when field is not read only.'
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
        autoFocus={this.props.isAutofocussed}
        id={this.props.id}
        name={this.props.name}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly || this.props.isDisabled}
        value={this.internalSlateValue}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={pick(this.props, [
          'horizontalConstraint',
          'defaultExpandMultilineText',
          'hasWarning',
          'hasError',
          'placeholder',
          'showExpandIcon',
          'onClickExpand',
        ])}
        onChange={this.onValueChange}
        plugins={richTextPlugins}
        renderEditor={renderEditor}
      />
    );
  }
}

export default RichTextInput;
