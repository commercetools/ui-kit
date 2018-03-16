import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import classnames from 'classnames';
import Collapsible from '../../collapsible';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import FlatButton from '../../buttons/flat-button';
import { AngleDownIcon, AngleUpIcon } from '../../icons';
import styles from './localized-text-input.mod.css';

const getId = (() => {
  let id = 0;
  return prefix => {
    id += 1;
    return `${prefix}-${id}`;
  };
})();

// NOTE this is a duplicate of ErrorMessage from core and should be reused
// It can't be used as of now, since LocalizedTextInput is in ui-kit and
// ErrorMessage still is in core
const ErrorMessage = props => (
  <Text.Detail tone="negative">{props.children}</Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

const ExpandControl = ({ expandMessage, collapseMessage, onClick, isOpen }) =>
  isOpen ? (
    <FlatButton
      icon={<AngleUpIcon />}
      label={collapseMessage}
      onClick={onClick}
    />
  ) : (
    <FlatButton
      icon={<AngleDownIcon />}
      label={expandMessage}
      onClick={onClick}
    />
  );
ExpandControl.displayName = 'ExpandControl';
ExpandControl.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  expandMessage: PropTypes.string.isRequired,
  collapseMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

class LocalizedInput extends React.Component {
  static displayName = 'LocalizedInput';
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    language: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalSize: PropTypes.oneOf(['small', 'medium', 'full']),
  };
  render() {
    return (
      <div key={this.props.language} className={styles.fieldContainer}>
        <label htmlFor={this.props.id} className={styles.languageLabel}>
          <Text.Detail>{this.props.language.toUpperCase()}</Text.Detail>
        </label>
        <input
          id={this.props.id}
          name={this.props.name}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          disabled={this.props.isDisabled}
          placeholder={this.props.placeholder}
          className={getStyles(this.props)}
          readOnly={this.props.isReadOnly}
          autoFocus={this.props.isAutofocussed}
          /* ARIA */
          aria-readonly={this.props.isReadOnly}
          role="textbox"
          contentEditable={!this.props.isReadOnly}
        />
      </div>
    );
  }
}

export default class LocalizedTextInput extends React.Component {
  static displayName = 'LocalizedTextInput';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    // then input doesn't accept a "languages" prop, instead all possible
    // languages have to exist (with empty or filled strings) on the value:
    //   { en: 'foo', de: '', es: '' }
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    selectedLanguage: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAlwaysExpanded: PropTypes.bool,
    isDefaultExpanded: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalSize: PropTypes.oneOf(['small', 'medium', 'full']),
    error: PropTypes.shape({
      missing: PropTypes.bool,
    }),
  };
  static defaultProps = {
    id: getId('localized-text-input'),
    horizontalSize: 'full',
  };
  render() {
    const otherLanguages = Object.keys(this.props.value).filter(
      language => language !== this.props.selectedLanguage
    );
    return (
      <div
        className={classnames({
          [styles.smallWidth]: this.props.horizontalSize === 'small',
          [styles.mediumWidth]: this.props.horizontalSize === 'medium',
          [styles.fullWidth]: this.props.horizontalSize === 'full',
        })}
      >
        <Spacings.Stack>
          <div>
            <LocalizedInput
              key={this.props.selectedLanguage}
              id={`${this.props.id}-${this.props.selectedLanguage}`}
              name={this.props.name}
              value={this.props.value[this.props.selectedLanguage]}
              onChange={event =>
                this.props.onChange({
                  ...this.props.value,
                  [this.props.selectedLanguage]: event.target.value,
                })
              }
              language={this.props.selectedLanguage}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
              isAutofocussed={this.props.isAutofocussed}
              isDisabled={this.props.isDisabled}
              isReadOnly={this.props.isReadOnly}
              hasError={Boolean(
                this.props.error && Object.keys(this.props.error).length > 0
              )}
              horizontalSize={this.props.horizontalSize}
            />
            {this.props.error &&
              this.props.error.missing && (
                <ErrorMessage>This field is requried</ErrorMessage>
              )}
          </div>
          <Collapsible isDefaultClosed={!this.props.isDefaultExpanded}>
            {({ toggle, isOpen }) => (
              <React.Fragment>
                {(isOpen || this.props.isAlwaysExpanded) &&
                  otherLanguages.map(language => (
                    <LocalizedInput
                      key={language}
                      id={`${this.props.id}-${language}`}
                      name={this.props.name}
                      value={this.props.value[language]}
                      onChange={event =>
                        this.props.onChange({
                          ...this.props.value,
                          [language]: event.target.value,
                        })
                      }
                      language={language}
                      onBlur={this.props.onBlur}
                      onFocus={this.props.onFocus}
                      isAutofocussed={false}
                      isDisabled={this.props.isDisabled}
                      isReadOnly={this.props.isReadOnly}
                      horizontalSize={this.props.horizontalSize}
                    />
                  ))}
                {!this.props.isAlwaysExpanded &&
                  otherLanguages.length > 0 && (
                    <ExpandControl
                      onClick={toggle}
                      expandMessage={`Expand all languages (${
                        otherLanguages.length
                      })`}
                      collapseMessage={'Collapse'}
                      isOpen={isOpen}
                    />
                  )}
              </React.Fragment>
            )}
          </Collapsible>
        </Spacings.Stack>
      </div>
    );
  }
}
