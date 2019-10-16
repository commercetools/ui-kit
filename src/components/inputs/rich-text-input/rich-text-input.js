import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Editor } from 'slate-react';
import pick from 'lodash/pick';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import renderEditor from './editor';
import plugins from '../../internals/rich-text-plugins';
import html from '../../internals/rich-text-utils/html';
import isEmpty from '../../internals/rich-text-utils/is-empty';

class RichTextInput extends React.Component {
  serializedValue;
  internalSlateValue;

  constructor(props) {
    super(props);
    this.serializedValue = props.value || '';
    this.internalSlateValue = html.deserialize(this.props.value || '');
  }

  componentDidUpdate() {
    if (this.props.value !== this.serializedValue) {
      this.internalSlateValue = html.deserialize(this.props.value);
      this.serializedValue = this.props.value;
      this.forceUpdate();
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

    this.internalSlateValue = event.value;
    this.serializedValue = serializedValue;

    this.props.onChange(fakeEvent);
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
    console.count('render');
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
