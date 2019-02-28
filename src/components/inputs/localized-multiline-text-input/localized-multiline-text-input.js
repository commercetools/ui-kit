import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import { injectIntl } from 'react-intl';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import {
  sortLanguages,
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  getHasWarningOnRemainingLanguages,
  isTouched,
  omitEmptyTranslations,
  isEmpty,
  createLocalizedString,
  getId,
  getName,
} from '../../../utils/localized';
import LanguagesControl from './languages-control';
import TranslationInput from './translation-input';
import RequiredValueErrorMessage from './required-value-error-message';

// This component supports expanding/collapsing multiline inputs, but it also
// supports showing/hiding the remaining languages.
// These two features are both about opening/closing something, and so the code
// can get quite confusing. We try to stick to expand/collapse for the
// multiline inputs, while we use show/hide/open/close for the remaining
// languages.
export class LocalizedMultilineTextInput extends React.Component {
  static displayName = 'LocalizedMultilineTextInput';

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
    defaultExpandMultilineText: PropTypes.bool,
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
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.node),
    warnings: PropTypes.objectOf(PropTypes.node),
    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getId = getId;

  static getName = getName;

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  static createLocalizedString = createLocalizedString;

  static isEmpty = isEmpty;

  static omitEmptyTranslations = omitEmptyTranslations;

  static isTouched = isTouched;

  state = {
    // This state is used to show/hide the remaining translations
    areLanguagesOpened: this.props.defaultExpandLanguages,
    // This state is to manage the expand/collapse of multiline text inputs
    expandedTranslations: Object.keys(this.props.value).reduce((acc, key) => {
      return {
        [key]: Boolean(this.props.defaultExpandMultilineText),
        ...acc,
      };
    }, {}),
  };

  toggleLanguage = language =>
    this.setState(prevState => ({
      expandedTranslations: {
        ...prevState.expandedTranslations,
        [language]: !prevState.expandedTranslations[language],
      },
    }));

  toggleLanguages = () =>
    this.setState(prevState => ({
      areLanguagesOpened: !prevState.areLanguagesOpened,
    }));

  expandAllTranslations = () =>
    this.setState(prevState => ({
      expandedTranslations: Object.keys(prevState.expandedTranslations).reduce(
        (acc, key) => {
          return {
            [key]: true,
            ...acc,
          };
        },
        {}
      ),
    }));

  static getDerivedStateFromProps = (props, state) => {
    // We want to automatically open the languages when an error is present on a
    // hidden input, and we want to keep the languages open even after the
    // error was resolved, so that the user can collapse it manually.
    // Otherwise it would close as soon as the error disappears.
    const hasErrorOnRemainingLanguages =
      props.hasError ||
      getHasErrorOnRemainingLanguages(props.errors, props.selectedLanguage);
    const hasWarningOnRemainingLanguages =
      props.hasWarning ||
      getHasWarningOnRemainingLanguages(props.warnings, props.selectedLanguage);
    const areLanguagesOpened =
      hasErrorOnRemainingLanguages ||
      hasWarningOnRemainingLanguages ||
      props.hideLanguageExpansionControls ||
      state.areLanguagesOpened;
    return { areLanguagesOpened };
  };

  render() {
    const languages = sortLanguages(
      this.props.selectedLanguage,
      Object.keys(this.props.value)
    );

    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="s">
          {languages.map((language, index) => {
            const isFirstLanguage = index === 0;
            if (!isFirstLanguage && !this.state.areLanguagesOpened) return null;
            const isLastLanguage = index === languages.length - 1;
            const hasRemainingLanguages = languages.length > 1;
            const hasErrorOnRemainingLanguages =
              this.props.hasError ||
              getHasErrorOnRemainingLanguages(
                this.props.errors,
                this.props.selectedLanguage
              );
            const hasWarningOnRemainingLanguages =
              this.props.hasWarning ||
              getHasWarningOnRemainingLanguages(
                this.props.warnings,
                this.props.selectedLanguage
              );
            return (
              <TranslationInput
                key={language}
                id={LocalizedMultilineTextInput.getId(this.props.id, language)}
                name={LocalizedMultilineTextInput.getName(
                  this.props.name,
                  language
                )}
                value={this.props.value[language]}
                onChange={this.props.onChange}
                language={language}
                isCollapsed={!this.state.expandedTranslations[language]}
                onToggle={() => this.toggleLanguage(language)}
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
                languagesControl={(() => {
                  if (
                    !hasRemainingLanguages ||
                    this.props.hideLanguageExpansionControls
                  )
                    return null;
                  if (isFirstLanguage && !this.state.areLanguagesOpened)
                    return (
                      <LanguagesControl
                        isClosed={true}
                        onClick={() => {
                          // expand all multiline language inputs in case the
                          // first one was expanded when all languages
                          // are shown
                          if (
                            this.state.expandedTranslations[
                              this.props.selectedLanguage
                            ]
                          ) {
                            this.expandAllTranslations();
                          }
                          this.toggleLanguages();
                        }}
                        remainingLanguages={languages.length - 1}
                      />
                    );
                  if (isLastLanguage)
                    return (
                      <LanguagesControl
                        onClick={this.toggleLanguages}
                        remainingLanguages={languages.length - 1}
                        isDisabled={Boolean(
                          this.props.hasError ||
                            hasErrorOnRemainingLanguages ||
                            this.props.hasWarning ||
                            hasWarningOnRemainingLanguages
                        )}
                      />
                    );
                  return null;
                })()}
                hasError={Boolean(
                  this.props.hasError ||
                    (this.props.errors && this.props.errors[language])
                )}
                hasWarning={Boolean(
                  this.props.hasWarning ||
                    (this.props.warnings && this.props.warnings[language])
                )}
                intl={this.props.intl}
                warning={this.props.warnings && this.props.warnings[language]}
                error={this.props.errors && this.props.errors[language]}
                {...createLocalizedDataAttributes(this.props, language)}
              />
            );
          })}
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

const Wrapped = injectIntl(LocalizedMultilineTextInput);
Wrapped.isTouched = LocalizedMultilineTextInput.isTouched;
Wrapped.omitEmptyTranslations =
  LocalizedMultilineTextInput.omitEmptyTranslations;
Wrapped.isEmpty = LocalizedMultilineTextInput.isEmpty;
Wrapped.createLocalizedString =
  LocalizedMultilineTextInput.createLocalizedString;
export default Wrapped;
