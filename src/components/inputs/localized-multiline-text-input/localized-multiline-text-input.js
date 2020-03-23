import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import { useIntl } from 'react-intl';
import { useToggleState } from '@commercetools-uikit/hooks';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
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
} from '@commercetools-uikit/localized-utils';
import LanguagesControl from './languages-control';
import TranslationInput from './translation-input';
import RequiredValueErrorMessage from './required-value-error-message';

const expandedTranslationsReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };

    case 'toggleAll': {
      const newState = Object.keys(state).reduce((translations, locale) => {
        return {
          [locale]: true,
          ...translations,
        };
      }, {});
      return newState;
    }
    default:
      return state;
  }
};

// This component supports expanding/collapsing multiline inputs, but it also
// supports showing/hiding the remaining languages.
// These two features are both about opening/closing something, and so the code
// can get quite confusing. We try to stick to expand/collapse for the
// multiline inputs, while we use show/hide/open/close for the remaining
// languages.
const LocalizedMultilineTextInput = (props) => {
  const intl = useIntl();

  const initialExpandedTranslationsState = Object.keys(props.value).reduce(
    (translations, locale) => {
      return {
        [locale]: Boolean(props.defaultExpandMultilineText),
        ...translations,
      };
    },
    {}
  );

  const [
    expandedTranslationsState,
    expandedTranslationsDispatch,
  ] = React.useReducer(
    expandedTranslationsReducer,
    initialExpandedTranslationsState
  );

  const defaultExpansionState =
    props.hideLanguageExpansionControls ||
    props.defaultExpandLanguages ||
    // useToggleState's default is `true`, but we want `false`
    false;

  const [areLanguagesOpened, toggleLanguages] = useToggleState(
    defaultExpansionState
  );

  const toggleLanguage = React.useCallback(
    (language) => {
      expandedTranslationsDispatch({ type: 'toggle', payload: language });
    },
    [expandedTranslationsDispatch]
  );

  const languages = sortLanguages(
    props.selectedLanguage,
    Object.keys(props.value)
  );

  const hasErrorInRemainingLanguages =
    props.hasError ||
    getHasErrorOnRemainingLanguages(props.errors, props.selectedLanguage);
  const hasWarningInRemainingLanguages =
    props.hasWarning ||
    getHasWarningOnRemainingLanguages(props.warnings, props.selectedLanguage);

  if (hasErrorInRemainingLanguages || hasWarningInRemainingLanguages) {
    if (!areLanguagesOpened) {
      // this update within render replaces the old `getDerivedStateFromProps` functionality
      // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
      toggleLanguages();
    }
  }

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Stack scale="s">
        {languages.map((language, index) => {
          const isFirstLanguage = index === 0;
          if (!isFirstLanguage && !areLanguagesOpened) return null;
          const isLastLanguage = index === languages.length - 1;
          const hasRemainingLanguages = languages.length > 1;
          const hasErrorOnRemainingLanguages =
            props.hasError ||
            getHasErrorOnRemainingLanguages(
              props.errors,
              props.selectedLanguage
            );
          const hasWarningOnRemainingLanguages =
            props.hasWarning ||
            getHasWarningOnRemainingLanguages(
              props.warnings,
              props.selectedLanguage
            );
          return (
            <TranslationInput
              key={language}
              autoComplete={props.autoComplete}
              id={LocalizedMultilineTextInput.getId(props.id, language)}
              name={LocalizedMultilineTextInput.getName(props.name, language)}
              value={props.value[language]}
              onChange={props.onChange}
              language={language}
              isCollapsed={!expandedTranslationsState[language]}
              onToggle={() => toggleLanguage(language)}
              placeholder={
                props.placeholder ? props.placeholder[language] : undefined
              }
              onBlur={props.onBlur}
              onFocus={props.onFocus}
              isAutofocussed={index === 0 && props.isAutofocussed}
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              languagesControl={(() => {
                if (
                  !hasRemainingLanguages ||
                  props.hideLanguageExpansionControls
                )
                  return null;
                if (isFirstLanguage && !areLanguagesOpened)
                  return (
                    <LanguagesControl
                      isClosed={true}
                      onClick={toggleLanguages}
                      remainingLanguages={languages.length - 1}
                    />
                  );
                if (isLastLanguage)
                  return (
                    <LanguagesControl
                      onClick={toggleLanguages}
                      remainingLanguages={languages.length - 1}
                      isDisabled={Boolean(
                        props.hasError ||
                          hasErrorOnRemainingLanguages ||
                          props.hasWarning ||
                          hasWarningOnRemainingLanguages
                      )}
                    />
                  );
                return null;
              })()}
              hasError={Boolean(
                props.hasError || (props.errors && props.errors[language])
              )}
              hasWarning={Boolean(
                props.hasWarning || (props.warnings && props.warnings[language])
              )}
              intl={intl}
              warning={props.warnings && props.warnings[language]}
              error={props.errors && props.errors[language]}
              {...createLocalizedDataAttributes(props, language)}
            />
          );
        })}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedMultilineTextInput.displayName = 'LocalizedMultilineTextInput';

LocalizedMultilineTextInput.RequiredValueErrorMessage = RequiredValueErrorMessage;

LocalizedMultilineTextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  // then input doesn't accept a "languages" prop, instead all possible
  // languages have to exist (with empty or filled strings) on the value:
  //   { en: 'foo', de: '', es: '' }
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
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
};

LocalizedMultilineTextInput.getId = getId;

LocalizedMultilineTextInput.getName = getName;

LocalizedMultilineTextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

LocalizedMultilineTextInput.createLocalizedString = createLocalizedString;

LocalizedMultilineTextInput.isEmpty = isEmpty;

LocalizedMultilineTextInput.omitEmptyTranslations = omitEmptyTranslations;

LocalizedMultilineTextInput.isTouched = isTouched;

export default LocalizedMultilineTextInput;
