/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Editor } from 'slate-react';
import omit from 'lodash/omit';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import renderEditor from './editor';
import LanguagesControlButton from './languages-control';
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

  onValueChange = ({ value }) => {
    const serializedValue = html.serialize(value);
    const event = {
      target: {
        id: this.props.id,
        name: this.props.name,
        language: this.props.language,
        value: serializedValue,
      },
    };
    this.props.onChange(event);

    this.setState({
      internalSlateValue: value,
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
        value={this.state.internalSlateValue}
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
          hasWarningOnRemainingLanguages: this.props
            .hasWarningOnRemainingLanguages,
          hasError: this.props.hasError,
          hasErrorOnRemainingLanguages: this.props.hasErrorOnRemainingLanguages,
          placeholder: this.props.placeholder,
          onClickExpand: this.props.onClickExpand,
          showExpandIcon: this.props.showExpandIcon,
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
  value: PropTypes.string.isRequired,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, props => props.showExpandIcon),
};

export default RichTextInput;
