/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Types from 'slate-prop-types';
import { Editor } from 'slate-react';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import renderEditor from './editor';
import LanguagesControlButton from './languages-control';
import plugins from '../../internals/rich-text-plugins';
import html from '../../internals/rich-text-utils/html';
import isEmpty from '../../internals/rich-text-utils/is-empty';

class RichTextInput extends React.PureComponent {
  onValueChange = ({ value }) => {
    const event = {
      target: {
        id: this.props.id,
        name: this.props.name,
        language: this.props.language,
        value,
      },
    };
    this.props.onChange(event);
  };

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val &&
        console.log(`${this.props.id} Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val &&
          console.log(`${this.props.id} State '${key}' changed`)
      );
    }
  }

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
      setTimeout(() => this.props.onBlur(event), 0);
    }
  };

  onFocus = (event, editor, next) => {
    next();
    if (this.props.onFocus) {
      setTimeout(() => this.props.onFocus(event), 0);
    }
  };

  renderLanguagesControl = () => {
    if (
      !this.props.hasRemainingLanguages ||
      this.props.hideLanguageExpansionControls
    ) {
      return null;
    }

    if (this.props.isFirstLanguage && !this.props.areLanguagesOpened)
      return (
        <LanguagesControlButton
          isClosed={true}
          onClick={() => {
            // expand all multiline language inputs in case the
            // first one was expanded when all languages
            // are shown
            if (!this.props.isCollapsed) {
              this.props.expandAllTranslations();
            }
            this.props.toggleLanguages();
          }}
          remainingLanguages={this.props.remainingLanguages}
        />
      );
    if (this.props.isLastLanguage)
      return (
        <LanguagesControlButton
          onClick={this.props.toggleLanguages}
          remainingLanguages={this.props.remainingLanguages}
          isDisabled={Boolean(
            this.props.hasError ||
              this.props.hasErrorOnRemainingLanguages ||
              this.props.hasWarning ||
              this.props.hasWarningOnRemainingLanguages
          )}
        />
      );

    return null;
  };

  render() {
    return (
      <Editor
        {...filterDataAttributes(this.props)}
        id={this.props.id}
        name={this.props.name}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly}
        value={this.props.value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={{
          language: this.props.language,
          onToggle: this.props.onToggle,
          toggleLanguage: this.props.toggleLanguage,
          isOpen: this.props.isOpen,
          languagesControl: this.renderLanguagesControl,
          warning: this.props.warning,
          error: this.props.error,
          isCollapsed: this.props.isCollapsed,
          defaultExpandMultilineText: this.props.defaultExpandMultilineText,
          hasWarning: this.props.hasWarning,
          hasError: this.props.hasError,
          placeholder: this.props.placeholder,
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
  placeholder: '',
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.serialize = html.serialize;
RichTextInput.deserialize = html.deserialize;
RichTextInput.isEmpty = isEmpty;

RichTextInput.propTypes = {
  defaultExpandMultilineText: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: Types.value.isRequired,
};

export default RichTextInput;
