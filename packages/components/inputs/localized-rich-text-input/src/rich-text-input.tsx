import { PureComponent, type ReactNode } from 'react';
import pick from 'lodash/pick';
// TODO: remove after upgrade of `slate-react` to the latest version
// @ts-ignore
import { Editor as SlateReactEditor } from 'slate-react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import { richTextPlugins, html } from '@commercetools-uikit/rich-text-utils';
import renderEditor, { TRenderEditorProps, TRenderEditor } from './editor';

type TSlateReactEditorProps = {
  id?: TRichTextInputProps['id'];
  name?: TRichTextInputProps['name'];
  onFocus?: TEventHook<FocusEvent>;
  onBlur?: TEventHook<FocusEvent>;
  disabled?: TRichTextInputProps['isDisabled'];
  readOnly?: TRichTextInputProps['isReadOnly'];
  value: ReturnType<typeof html.deserialize>;
  options: TRenderEditorProps['options'];
  onChange?: TOnChangeFn;
  plugins: typeof richTextPlugins;
  renderEditor: TRenderEditor;
};

// This is a temporary wrapper component helping to mitigate typing issues of `slate-react@0.22.10` package.
// TODO: remove after upgrade of `slate-react` to the latest version
const Editor = (props: TSlateReactEditorProps) => (
  <SlateReactEditor {...props} />
);

type TEvent = {
  target: {
    id?: string;
    name?: string;
    language?: string;
    value?: string;
  };
};
type TEventHook<T = Event> = (
  event: T,
  editor: typeof Editor,
  next: () => unknown
) => unknown;

type TOnChangeParam = {
  operations: unknown;
  value: ReturnType<typeof html.deserialize>;
};
type TOnChangeFn = (change: TOnChangeParam) => unknown;

type TRichTextInputProps = {
  defaultExpandMultilineText?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  id?: string;
  name?: string;
  placeholder: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: (event: TEvent) => void;
  onBlur?: (event: TEvent) => void;
  onFocus?: (event: TEvent) => void;
  value: string;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  hasLanguagesControl?: boolean;

  // Pass-through props
  language: string;
  isOpen: boolean;
  toggleLanguage: (language: string) => void;
  warning?: ReactNode;
  error?: string;
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
  internalSlateValue = html.deserialize(this.props.value || '');

  componentDidUpdate() {
    if (this.props.value !== this.serializedValue) {
      this.internalSlateValue = html.deserialize(this.props.value);
      this.serializedValue = this.props.value;
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
          language: this.props.language,
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
        'RichTextInput: `onChange` is required when field is not read only.'
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
        id={this.props.id}
        name={this.props.name}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly || this.props.isDisabled}
        value={this.internalSlateValue}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={
          pick(this.props, [
            'language',
            'onToggle',
            'toggleLanguage',
            'isOpen',
            'warning',
            'error',
            'defaultExpandMultilineText',
            'hasWarning',
            'hasError',
            'placeholder',
            'onClickExpand',
            'showExpandIcon',
            'hasLanguagesControl',
          ]) as TRenderEditorProps['options']
        }
        onChange={this.onValueChange}
        plugins={richTextPlugins}
        renderEditor={renderEditor}
      />
    );
  }
}

export default RichTextInput;
