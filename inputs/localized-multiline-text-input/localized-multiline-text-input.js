import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import requiredIf from 'react-required-if';
import uniq from 'lodash.uniq';
import mapValues from 'lodash.mapvalues';
import without from 'lodash.without';
import oneLine from 'common-tags/lib/oneLine';
import { injectIntl } from 'react-intl';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Spacings from '../../materials/spacings';
import Constraints from '../../materials/constraints';
import LanguagesControl from './languages-control';
import TranslationInput from './translation-input';
import RequiredValueErrorMessage from './required-value-error-message';

const getPrimaryLanguage = language => language.split('-')[0];

// splits the languages into two groups:
//  - the first group starts with the same tag as the selected language
//  - the second group starts with a different tag
const splitLanguagesByPrimaryLanguage = (key, languages) =>
  languages.reduce(
    (groupedLanguages, language) => {
      if (key === getPrimaryLanguage(language)) {
        groupedLanguages[0].push(language);
      } else {
        groupedLanguages[1].push(language);
      }
      return groupedLanguages;
    },
    [[], []]
  );

// sorts the languages with the following priority:
// - The selected language is excluced (e.g pt-BR)
// - All languages using the same primary language as the selected language follow (e.g. pt, pt-PT).
//   They are sorted alphabetically
// - All other languages follow, sorted alphabetically
export const sortRemainingLanguages = (selectedLanguage, allLanguages) => {
  const remainingLanguages = without(allLanguages, selectedLanguage);

  const selectedLanguageKey = getPrimaryLanguage(selectedLanguage);

  const [
    languagesWithSameKeyAsSelectedLanguage,
    otherLanguages,
  ] = splitLanguagesByPrimaryLanguage(selectedLanguageKey, remainingLanguages);

  return [
    ...languagesWithSameKeyAsSelectedLanguage.sort(),
    ...otherLanguages.sort(),
  ];
};

const createDataAttributes = (props, language) =>
  Object.entries(filterDataAttributes(props)).reduce((acc, [key, value]) => {
    switch (key) {
      case 'data-track-component':
      case 'data-test':
        acc[key] = `${value}-${language}`;
        break;
      default:
        acc[key] = value;
    }
    return acc;
  }, {});

const getId = (idPrefix, language) =>
  idPrefix ? `${idPrefix}.${language}` : undefined;
const getName = (namePrefix, language) =>
  namePrefix ? `${namePrefix}.${language}` : undefined;

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
    isMultilineDefaultExpanded: PropTypes.bool,
    hideLanguageControls: PropTypes.bool,
    areLanguagesDefaultOpened: (props, propName, componentName, ...rest) => {
      if (props.hideLanguageControls && typeof props[propName] === 'boolean') {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideLanguageControls" is set.
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
    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  static createLocalizedString = (languages, existingTranslations = {}) => {
    const mergedLanguages = existingTranslations
      ? uniq([...languages, ...Object.keys(existingTranslations)])
      : languages;

    return mergedLanguages.reduce((localizedString, language) => {
      // eslint-disable-next-line no-param-reassign
      localizedString[language] =
        (existingTranslations && existingTranslations[language]) || '';
      return localizedString;
    }, {});
  };

  static isEmpty = localizedString => {
    if (!localizedString) return true;
    return Object.values(localizedString).every(
      value => !value || value.trim().length === 0
    );
  };

  static omitEmptyTranslations = localizedString => {
    invariant(
      typeof localizedString === 'object',
      'omitEmptyTranslations must be called with an object'
    );
    return Object.entries(localizedString).reduce(
      (localizedStringWithoutEmptyTranslations, [language, value]) => {
        if (value && value.trim().length > 0) {
          // eslint-disable-next-line no-param-reassign
          localizedStringWithoutEmptyTranslations[language] = value;
        }
        return localizedStringWithoutEmptyTranslations;
      },
      {}
    );
  };

  static isTouched = touched => touched && Object.values(touched).some(Boolean);

  state = {
    // This state is used to show/hide the remaining translations
    areLanguagesOpened: this.props.areLanguagesDefaultOpened,
    // This state is to manage the expand/collapse of multiline text inputs
    expandedTranslations: mapValues(this.props.value, () =>
      Boolean(this.props.isMultilineDefaultExpanded)
    ),
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
      expandedTranslations: mapValues(
        prevState.expandedTranslations,
        () => true
      ),
    }));

  render() {
    const remainingLanguages = sortRemainingLanguages(
      this.props.selectedLanguage,
      Object.keys(this.props.value)
    );
    const languages = [this.props.selectedLanguage, ...remainingLanguages];
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="s">
          {languages.map(
            (language, index) =>
              (index === 0 ||
                this.state.areLanguagesOpened ||
                this.props.hideLanguageControls) && (
                <TranslationInput
                  key={language}
                  id={getId(this.props.id, language)}
                  name={getName(this.props.name, language)}
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
                      index === 0 &&
                      !this.state.areLanguagesOpened &&
                      remainingLanguages.length > 0
                    ) {
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
                          remainingLanguages={remainingLanguages.length}
                        />
                      );
                    }
                    if (index !== 0 && index === languages.length - 1)
                      return (
                        <LanguagesControl
                          onClick={this.toggleLanguages}
                          remainingLanguages={remainingLanguages.length}
                        />
                      );
                    return null;
                  })()}
                  hasError={Boolean(
                    this.props.hasError ||
                      (this.props.errors && this.props.errors[language])
                  )}
                  intl={this.props.intl}
                  error={this.props.errors && this.props.errors[language]}
                  {...createDataAttributes(this.props, language)}
                />
              )
          )}
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(LocalizedMultilineTextInput);
