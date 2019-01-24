import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import oneLine from 'common-tags/lib/oneLine';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/core';
import ErrorMessage from '../../messages/error-message';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import Text from '../../typography/text';
import {
  sortLanguages,
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  isTouched,
  omitEmptyTranslations,
  isEmpty,
  createLocalizedString,
  getId,
  getName,
} from '../../../utils/localized';
import getFieldId from '../../../utils/get-field-id';
import LanguagesButton from './languages-button';
import messages from './messages';
import {
  getInputStyles,
  getLanguageLabelStyles,
} from './localized-text-input.styles';

class LocalizedInput extends React.Component {
  static displayName = 'LocalizedInput';
  static propTypes = {
    id: PropTypes.string,
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
    placeholder: PropTypes.string,
  };
  handleChange = event => {
    // We manipulate the event to add the language to the target.
    // That way the users of LocalizedTextInput's onChange can read
    // event.target.language and event.target.value to determine the next value.
    //
    // We only need this information for the story, the MC application code will
    // never need to access the information in such an inconvenient way, as
    // Formik can deal with a name like "foo.en" and sets the value correctly.
    // We can't use this as we aren't guaranteed a name in the story as the user
    // might clear it using the knob, and then we can't parse the language from
    // the input name anymore.
    //
    // eslint-disable-next-line no-param-reassign
    event.target.language = this.props.language;
    this.props.onChange(event);
  };
  render() {
    return (
      <div
        key={this.props.language}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
        `}
      >
        <label htmlFor={this.props.id} css={getLanguageLabelStyles()}>
          {/* FIXME: add proper tone for disabled when tones are refactored */}
          <Text.Detail tone="secondary">
            {this.props.language.toUpperCase()}
          </Text.Detail>
        </label>
        <input
          id={this.props.id}
          name={this.props.name}
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          disabled={this.props.isDisabled}
          placeholder={this.props.placeholder}
          css={getInputStyles(this.props)}
          readOnly={this.props.isReadOnly}
          autoFocus={this.props.isAutofocussed}
          /* ARIA */
          aria-readonly={this.props.isReadOnly}
          role="textbox"
          contentEditable={!this.props.isReadOnly}
          {...filterDataAttributes(this.props)}
        />
      </div>
    );
  }
}

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messages.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

export default class LocalizedTextInput extends React.Component {
  static displayName = 'LocalizedTextInput';

  static RequiredValueErrorMessage = RequiredValueErrorMessage;

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
    hideLanguageExpansionControls: PropTypes.bool,
    defaultExpandLanguages: (props, propName, componentName, ...rest) => {
      if (
        props.hideLanguageExpansionControls &&
        typeof props[propName] === 'boolean'
      ) {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideLanguageExpansionControls" is set.
          `
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.objectOf(PropTypes.string),
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    hasError: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.node),
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  static getId = getId;

  static getName = getName;

  static createLocalizedString = createLocalizedString;

  static isEmpty = isEmpty;

  static omitEmptyTranslations = omitEmptyTranslations;

  static isTouched = isTouched;

  static getDerivedStateFromProps = (props, state) => {
    // We want to automatically open the languages when an error is present on a
    // hidden input, and we want to keep the languages open even after the
    // error was resolved, so that the user can collapse it manually.
    // Otherwise it would close as soon as the error disappears.
    const hasErrorOnRemainingLanguages =
      props.hasError ||
      getHasErrorOnRemainingLanguages(props.errors, props.selectedLanguage);
    const areLanguagesExpanded =
      hasErrorOnRemainingLanguages ||
      props.hideLanguageExpansionControls ||
      state.areLanguagesExpanded;

    const id = getFieldId(props, state, 'localized-text-input-');

    return { areLanguagesExpanded, id };
  };

  state = {
    // This state is used to show/hide the remaining translations
    areLanguagesExpanded: this.props.defaultExpandLanguages,
    id: this.props.id,
  };

  toggleLanguages = () =>
    this.setState(prevState => ({
      areLanguagesExpanded: !prevState.areLanguagesExpanded,
    }));

  render() {
    const languages = sortLanguages(
      this.props.selectedLanguage,
      Object.keys(this.props.value)
    );
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack>
          {languages.map((language, index) => {
            const isFirstLanguage = index === 0;
            const isLastLanguage = index === languages.length - 1;
            const hasRemainingLanguages = languages.length > 1;
            const hasErrorOnRemainingLanguages =
              this.props.hasError ||
              getHasErrorOnRemainingLanguages(
                this.props.errors,
                this.props.selectedLanguage
              );
            if (!isFirstLanguage && !this.state.areLanguagesExpanded)
              return null;

            return (
              <div key={language}>
                <Spacings.Stack scale="xs">
                  <LocalizedInput
                    id={LocalizedTextInput.getId(this.state.id, language)}
                    name={LocalizedTextInput.getName(this.props.name, language)}
                    value={this.props.value[language]}
                    onChange={this.props.onChange}
                    language={language}
                    placeholder={
                      this.props.placeholder
                        ? this.props.placeholder[language]
                        : undefined
                    }
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    isAutofocussed={index === 0 && this.props.isAutofocussed}
                    isDisabled={this.props.isDisabled}
                    isReadOnly={this.props.isReadOnly}
                    hasError={Boolean(
                      this.props.hasError ||
                        (this.props.errors && this.props.errors[language])
                    )}
                    {...createLocalizedDataAttributes(this.props, language)}
                  />
                  {this.props.errors && this.props.errors[language]}
                  {(() => {
                    if (
                      !hasRemainingLanguages ||
                      this.props.hideLanguageExpansionControls
                    )
                      return null;

                    if (isFirstLanguage && !this.state.areLanguagesExpanded)
                      return (
                        <LanguagesButton
                          onClick={this.toggleLanguages}
                          remainingLanguages={languages.length - 1}
                        />
                      );

                    if (isLastLanguage)
                      return (
                        <LanguagesButton
                          onClick={this.toggleLanguages}
                          isOpen={true}
                          remainingLanguages={languages.length - 1}
                          isDisabled={hasErrorOnRemainingLanguages}
                        />
                      );

                    return null;
                  })()}
                </Spacings.Stack>
              </div>
            );
          })}
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}
