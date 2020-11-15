import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Editor } from 'slate-react';
import pick from 'lodash/pick';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  richTextPlugins,
  html,
  isEmpty,
} from '@commercetools-uikit/input-utils';
import renderEditor from './editor';

class RichTextInput extends React.PureComponent {
  serializedValue = this.props.value || '';
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

RichTextInput.defaultProps = {
  defaultExpandMultilineText: false,
  horizontalConstraint: 'scale',
  placeholder: '',
  showExpandIcon: false,
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.isEmpty = isEmpty;
RichTextInput.isTouched = (touched) => Boolean(touched);

RichTextInput.propTypes = {
  isAutofocussed: PropTypes.bool,
  defaultExpandMultilineText: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, (props) => props.showExpandIcon),
};

export default RichTextInput;
