import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Types from 'slate-prop-types';
import { Editor } from 'slate-react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import renderEditor from './editor';
import plugins from '../../internals/rich-text-plugins';
import html from '../../internals/rich-text-utils/html';
import isEmpty from '../../internals/rich-text-utils/is-empty';

class RichTextInput extends React.PureComponent {
  state = {
    isFocused: false,
  };

  onValueChange = ({ value }) => {
    const event = {
      target: {
        id: this.props.id,
        name: this.props.name,
        value,
      },
    };
    this.props.onChange(event);
  };

  // this issue explains why we need to use next() + setTimeout
  // for calling our passed onBlur handler
  // https://github.com/ianstormtaylor/slate/issues/2434
  onBlur = (event, editor, next) => {
    next();
    if (this.props.onBlur) {
      event.persist();
      setTimeout(() => this.props.onBlur(event), 0);
    }
    setTimeout(() => this.setState({ isFocused: false }));
  };

  onFocus = (event, editor, next) => {
    next();
    if (this.props.onFocus) {
      event.persist();
      setTimeout(() => this.props.onFocus(event), 0);
    }
    setTimeout(() => this.setState({ isFocused: true }));
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
        value={this.props.value}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={{
          horizontalConstraint: this.props.horizontalConstraint,
          defaultExpandMultilineText: this.props.defaultExpandMultilineText,
          hasWarning: this.props.hasWarning,
          hasError: this.props.hasError,
          placeholder: this.props.placeholder,
          isFocused: this.state.isFocused,
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
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.serialize = html.serialize;
RichTextInput.deserialize = html.deserialize;
RichTextInput.isEmpty = isEmpty;
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
  value: Types.value.isRequired,
};

export default RichTextInput;
