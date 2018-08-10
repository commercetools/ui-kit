import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import requiredIf from 'react-required-if';
import uniq from 'lodash.uniq';
import without from 'lodash.without';
import oneLine from 'common-tags/lib/oneLine';
import { injectIntl } from 'react-intl';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Collapsible from '../../collapsible';
import Spacings from '../../materials/spacings';
import Constraints from '../../materials/constraints';
import ShowLanguagesControl from './show-languages-control';
import HideLanguagesControl from './hide-languages-control';
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
    areLanguagesDefaultExpanded: (props, propName, componentName, ...rest) => {
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

  render() {
    const remainingLanguages = sortRemainingLanguages(
      this.props.selectedLanguage,
      Object.keys(this.props.value)
    );
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Collapsible isDefaultClosed={!this.props.areLanguagesDefaultExpanded}>
          {({ toggle: toggleLanguages, isOpen: areAllLanguagesVisible }) => (
            <Spacings.Stack>
              <div>
                <Spacings.Stack scale="xs">
                  <TranslationInput
                    key={this.props.selectedLanguage}
                    id={getId(this.props.id, this.props.selectedLanguage)}
                    name={getName(this.props.name, this.props.selectedLanguage)}
                    value={this.props.value[this.props.selectedLanguage]}
                    onChange={this.props.onChange}
                    language={this.props.selectedLanguage}
                    isDefaultClosed={!this.props.isMultilineDefaultExpanded}
                    placeholder={
                      this.props.placeholder
                        ? this.props.placeholder[this.props.selectedLanguage]
                        : undefined
                    }
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    isAutofocussed={this.props.isAutofocussed}
                    isDisabled={this.props.isDisabled}
                    isReadOnly={this.props.isReadOnly}
                    hasError={Boolean(
                      this.props.hasError ||
                        (this.props.errors &&
                          this.props.errors[this.props.selectedLanguage])
                    )}
                    horizontalConstraint={this.props.horizontalConstraint}
                    languagesControl={
                      !this.props.hideLanguageControls &&
                      !areAllLanguagesVisible &&
                      remainingLanguages.length > 0 && (
                        <ShowLanguagesControl
                          onClick={toggleLanguages}
                          remainingLanguages={remainingLanguages.length}
                        />
                      )
                    }
                    {...createDataAttributes(
                      this.props,
                      this.props.selectedLanguage
                    )}
                    intl={this.props.intl}
                  />
                  {this.props.errors &&
                    this.props.errors[this.props.selectedLanguage]}
                </Spacings.Stack>
              </div>
              {(areAllLanguagesVisible || this.props.hideLanguageControls) &&
                remainingLanguages.map((language, index) => (
                  <div key={language}>
                    <Spacings.Stack scale="xs">
                      <TranslationInput
                        id={getId(this.props.id, language)}
                        name={getName(this.props.name, language)}
                        value={this.props.value[language]}
                        onChange={this.props.onChange}
                        language={language}
                        isDefaultClosed={!this.props.isMultilineDefaultExpanded}
                        placeholder={
                          this.props.placeholder
                            ? this.props.placeholder[language]
                            : undefined
                        }
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        isAutofocussed={false}
                        isDisabled={this.props.isDisabled}
                        isReadOnly={this.props.isReadOnly}
                        horizontalConstraint={this.props.horizontalConstraint}
                        languagesControl={
                          !this.props.hideLanguageControls &&
                          index === remainingLanguages.length - 1 &&
                          remainingLanguages.length > 0 && (
                            <HideLanguagesControl
                              onClick={toggleLanguages}
                              remainingLanguages={remainingLanguages.length}
                            />
                          )
                        }
                        hasError={Boolean(
                          this.props.hasError ||
                            (this.props.errors && this.props.errors[language])
                        )}
                        intl={this.props.intl}
                        {...createDataAttributes(this.props, language)}
                      />
                      {this.props.errors && this.props.errors[language]}
                    </Spacings.Stack>
                  </div>
                ))}
            </Spacings.Stack>
          )}
        </Collapsible>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(LocalizedMultilineTextInput);
