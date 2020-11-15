/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import requiredIf from 'react-required-if';
import { Editor } from 'slate-react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { richTextPlugins, html } from '@commercetools-uikit/input-utils';
import renderEditor from './editor';

class RichTextInput extends React.PureComponent {
  serializedValue = this.props.value || '';
  internalSlateValue = html.deserialize(this.props.value || '');

  componentDidUpdate() {
    if (this.props.value !== this.serializedValue) {
      this.internalSlateValue = html.deserialize(this.props.value);
      this.serializedValue = this.props.value;
      this.forceUpdate();
    }
  }

  onValueChange = (event) => {
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

      this.props.onChange(fakeEvent);
    }

    if (hasInternalSlateValueChanged && !hasSerializedValueChanged) {
      // this way we force update if cursor or selection changes
      this.forceUpdate();
    }
  };

  // this issue explains why we need to use next() + setTimeout
  // for calling our passed onBlur handler
  // https://github.com/ianstormtaylor/slate/issues/2434
  onBlur = (event, editor, next) => {
    next();

    if (this.props.onBlur) {
      const fakeEvent = {
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      };
      setTimeout(() => this.props.onBlur(fakeEvent), 0);
    }
  };

  onFocus = (event, editor, next) => {
    next();
    if (this.props.onFocus) {
      const fakeEvent = {
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      };
      setTimeout(() => this.props.onFocus(fakeEvent), 0);
    }
  };

  render() {
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
        options={{
          hasLanguagesControl: this.props.hasLanguagesControl,
          ...pick(this.props, [
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
          ]),
        }}
        onChange={this.onValueChange}
        plugins={richTextPlugins}
        renderEditor={renderEditor}
      />
    );
  }
}

RichTextInput.defaultProps = {
  defaultExpandMultilineText: false,
  placeholder: '',
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.propTypes = {
  defaultExpandMultilineText: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, (props) => props.showExpandIcon),
  hasLanguagesControl: PropTypes.bool,
};

export default RichTextInput;
