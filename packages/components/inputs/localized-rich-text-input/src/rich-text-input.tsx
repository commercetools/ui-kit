import {
  PureComponent,
  forwardRef,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  html,
  validSlateStateAdapter,
} from '@commercetools-uikit/rich-text-utils';
import Editor, { type TEditorProps } from './editor';
import { type TAdditionalInfoProps } from '@commercetools-uikit/messages';

type TRichTextInputProps = {
  defaultExpandMultilineText: TEditorProps['defaultExpandMultilineText'];
  hasError?: TEditorProps['hasError'];
  hasWarning?: TEditorProps['hasWarning'];
  id?: TEditorProps['id'];
  name?: string;
  placeholder: TEditorProps['placeholder'];
  isDisabled?: TEditorProps['isDisabled'];
  isReadOnly?: TEditorProps['isReadOnly'];
  onChange?: (state: string) => void;
  onBlur?: TEditorProps['onBlur'];
  onFocus?: TEditorProps['onFocus'];
  value: string;
  showExpandIcon: TEditorProps['showExpandIcon'];
  onClickExpand?: TEditorProps['onClickExpand'];
  hasLanguagesControl?: TEditorProps['hasLanguagesControl'];
  parentRef?: ForwardedRef<unknown>;

  // Pass-through props
  language: string;
  isOpen: boolean;
  toggleLanguage: (language: string) => void;
  warning?: ReactNode;
  error?: string;
  additionalInfo?: TAdditionalInfoProps['message'];
};

class RichTextInput extends PureComponent<TRichTextInputProps> {
  static defaultProps: Pick<
    TRichTextInputProps,
    'defaultExpandMultilineText' | 'placeholder'
  > = {
    defaultExpandMultilineText: false,
    placeholder: '',
  };

  static displayName = 'RichTextInput';

  serializedValue = this.props.value || '';
  internalSlateValue = validSlateStateAdapter(
    html.deserialize(this.props.value || '')
  );

  componentDidUpdate() {
    if (this.props.value !== this.serializedValue) {
      this.internalSlateValue = validSlateStateAdapter(
        html.deserialize(this.props.value)
      );
      this.serializedValue = this.props.value;
      this.forceUpdate();
    }
  }

  onValueChange = (state: Parameters<typeof html.serialize>[0]) => {
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
      this.props.onChange?.(html.serialize(state));
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
        'RichTextInput: `onChange` is required when input is not read only.'
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
        name={this.props.name}
        isReadOnly={this.props.isReadOnly}
        onChange={this.onValueChange}
        id={this.props.id}
        value={this.internalSlateValue}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        isDisabled={this.props.isDisabled}
        defaultExpandMultilineText={this.props.defaultExpandMultilineText}
        hasWarning={this.props.hasWarning}
        hasError={this.props.hasError}
        placeholder={this.props.placeholder}
        showExpandIcon={this.props.showExpandIcon}
        onClickExpand={this.props.onClickExpand}
        language={this.props.language}
        toggleLanguage={this.props.toggleLanguage}
        isOpen={this.props.isOpen}
        warning={this.props.warning}
        error={this.props.error}
        additionalInfo={this.props.additionalInfo}
        hasLanguagesControl={this.props.hasLanguagesControl}
        ref={this.props.parentRef}
      />
    );
  }
}

const RichTextInputWithRef = forwardRef((props: TRichTextInputProps, ref) => (
  <RichTextInput parentRef={ref} {...props} />
));
RichTextInputWithRef.displayName = 'RichTextInputWithRef';

export default RichTextInputWithRef;
