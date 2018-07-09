import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import requiredIf from 'react-required-if';
import uniq from 'lodash.uniq';
import without from 'lodash.without';
import oneLine from 'common-tags/lib/oneLine';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Collapsible from '../../collapsible';
import Spacings from '../../materials/spacings';
import Constraints from '../../materials/constraints';
import Text from '../../typography/text';
import FlatButton from '../../buttons/flat-button';
import { AngleDownIcon, AngleUpIcon } from '../../icons';
import ErrorMessage from '../../messages/error-message';
import styles from './localized-text-input.mod.css';

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

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getStyles = props => {
  if (props.isDisabled) return styles.disabled;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;
  if (props.isReadOnly) return styles.readonly;

  return styles.pristine;
};

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
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
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
          {...filterDataAttributes(this.props)}
        />
      </div>
    );
  }
}

const getId = (idPrefix, language) =>
  idPrefix ? `${idPrefix}.${language}` : undefined;
const getName = (namePrefix, language) =>
  namePrefix ? `${namePrefix}.${language}` : undefined;

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
    onChangeValue: PropTypes.func,
    selectedLanguage: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    hideExpansionControls: PropTypes.bool,
    isDefaultExpanded: (props, propName, componentName, ...rest) => {
      if (props.hideExpansionControls && typeof props[propName] === 'boolean') {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideExpansionControls" is set.
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
    error: PropTypes.shape({
      missing: PropTypes.bool,
    }),
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

  handleChange = event => {
    if (this.props.onChangeValue) {
      this.props.onChangeValue({
        ...this.props.value,
        [this.props.selectedLanguage]: event.target.value,
      });
    }
    this.props.onChange(event);
  };

  render() {
    const remainingLanguages = sortRemainingLanguages(
      this.props.selectedLanguage,
      Object.keys(this.props.value)
    );
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack>
          <div>
            <LocalizedInput
              key={this.props.selectedLanguage}
              id={getId(this.props.id, this.props.selectedLanguage)}
              name={getName(this.props.name, this.props.selectedLanguage)}
              value={this.props.value[this.props.selectedLanguage]}
              onChange={this.handleChange}
              language={this.props.selectedLanguage}
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
                this.props.error && Object.keys(this.props.error).length > 0
              )}
              horizontalConstraint={this.props.horizontalConstraint}
              {...createDataAttributes(this.props, this.props.selectedLanguage)}
            />
            {this.props.error &&
              this.props.error.missing && (
                <ErrorMessage>This field is requried</ErrorMessage>
              )}
          </div>
          <Collapsible isDefaultClosed={!this.props.isDefaultExpanded}>
            {({ toggle, isOpen }) => (
              <React.Fragment>
                {(isOpen || this.props.hideExpansionControls) &&
                  remainingLanguages.map(language => (
                    <LocalizedInput
                      key={language}
                      id={getId(this.props.id, language)}
                      name={getName(this.props.name, language)}
                      value={this.props.value[language]}
                      onChange={this.handleChange}
                      language={language}
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
                      {...createDataAttributes(this.props, language)}
                    />
                  ))}
                {!this.props.hideExpansionControls &&
                  remainingLanguages.length > 0 && (
                    <ExpandControl
                      onClick={toggle}
                      expandMessage={`Expand all languages (${
                        remainingLanguages.length
                      })`}
                      collapseMessage={'Collapse'}
                      isOpen={isOpen}
                    />
                  )}
              </React.Fragment>
            )}
          </Collapsible>
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}
