import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { Editor } from 'slate-react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import renderEditor from './editor';
import plugins from '../../internals/rich-text-plugins';
import html from '../../internals/rich-text-utils/html';
import isEmpty from '../../internals/rich-text-utils/is-empty';

const omittedPropsForRender = ['value'];

class RichTextInput extends React.Component {
  state = {
    // we keep track of the serialized (HTML) value
    serializedValue: this.props.value || '',
    internalSlateValue: html.deserialize(this.props.value || ''),
  };

  shouldComponentUpdate(nextProps, nextState) {
    // ignore updates for changes to `props.value` because this is
    // actually an `HTML` value.

    // instead we want to update when the slate `value` changes, which
    // is stored in state.
    const props = omit(this.props, omittedPropsForRender);

    const havePropsChanged = Object.entries(props).some(
      ([key, val]) => nextProps[key] !== val
    );

    if (havePropsChanged) return true;

    if (this.props.value !== this.state.serializedValue) return true;

    if (this.state.internalSlateValue !== nextState.internalSlateValue)
      return true;

    return false;
  }

  componentDidUpdate() {
    // if the value provided is not in sync with the RichTextInput,
    // then reset our value by deserializing this new value
    if (this.props.value !== this.state.serializedValue) {
      this.setState({
        internalSlateValue: html.deserialize(this.props.value),
        serializedValue: this.props.value,
      });
    }
  }

  onValueChange = event => {
    const serializedValue = html.serialize(event.value);

    const fakeEvent = {
      target: {
        id: this.props.id,
        name: this.props.name,
        value: serializedValue,
      },
    };

    this.props.onChange(fakeEvent);

    this.setState({
      internalSlateValue: event.value,
      serializedValue,
    });
  };

  // this issue explains why we need to use next() + setTimeout
  // for calling our passed onBlur handler
  // https://github.com/ianstormtaylor/slate/issues/2434
  onBlur = (event, editor, next) => {
    // we don't call next() if it's a button to stop our input from losing
    // slate focus

    if (
      event.relatedTarget &&
      event.relatedTarget.getAttribute('data-button-type') ===
        'rich-text-button'
    ) {
      event.preventDefault();
      return;
    }

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
        readOnly={this.props.isReadOnly}
        value={this.state.internalSlateValue}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={{
          horizontalConstraint: this.props.horizontalConstraint,
          defaultExpandMultilineText: this.props.defaultExpandMultilineText,
          hasWarning: this.props.hasWarning,
          hasError: this.props.hasError,
          placeholder: this.props.placeholder,
          showExpandIcon: this.props.showExpandIcon,
          onClickExpand: this.props.onClickExpand,
        }}
        onChange={this.onValueChange}
        plugins={plugins}
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

RichTextInput.isEmpty = value => isEmpty(html.deserialize(value));
RichTextInput.isTouched = touched => Boolean(touched);

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
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, props => props.showExpandIcon),
};

export default RichTextInput;
