import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { getTextareaStyles } from './multiline-input.styles';

class MultilineInput extends React.Component {
  serializedValue = this.props.value || '';
  internalSlateValue = Plain.deserialize(this.props.value || '');

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
      this.internalSlateValue = Plain.deserialize(this.props.value);
      this.serializedValue = this.props.value;
      this.forceUpdate();
    }
  }

  onValueChange = event => {
    const serializedValue = Plain.serialize(event.value);

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
    // we don't call next() if it's from the toolbar
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
        name={this.props.name}
        id={this.props.id}
        autoComplete={this.props.autoComplete}
        autoFocus={this.props.isAutofocussed}
        placeholder={this.props.placeholder}
        ref={this.props.forwardedRef}
        disabled={this.props.isDisabled}
        readOnly={this.props.isDisabled || this.props.isReadOnly}
        value={this.internalSlateValue}
        onChange={this.onValueChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        className={this.props.className}
        css={theme => getTextareaStyles(this.props, theme)}
        aria-readonly={this.props.isReadOnly}
        aria-multiline="true"
        role="textbox"
        {...filterDataAttributes(this.props)}
      />
    );
  }
}

// <TextareaAutosize
//   name={props.name}
//   type="text"
//   autoComplete={props.autoComplete}
//   value={props.value}
//   onChange={props.onChange}
//   onHeightChange={props.onHeightChange}
//   id={props.id}
//   onBlur={props.onBlur}
//   onFocus={props.onFocus}
//   disabled={props.isDisabled}
//   placeholder={props.placeholder}
//   readOnly={props.isReadOnly}
//   autoFocus={props.isAutofocussed}
//   className={props.className}
//   css={theme => getTextareaStyles(props, theme)}
//   /* ARIA */
//   aria-readonly={props.isReadOnly}
//   aria-multiline="true"
//   role="textbox"
//   minRows={MIN_ROW_COUNT}
//   maxRows={props.isOpen ? undefined : MIN_ROW_COUNT}
//   useCacheForDOMMeasurements={true}
//   {...filterDataAttributes(props)}
// />
// );

MultilineInput.displayName = 'MultilineInput';

MultilineInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  forwardedRef: PropTypes.any,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onHeightChange: PropTypes.func,
};

export default MultilineInput;
