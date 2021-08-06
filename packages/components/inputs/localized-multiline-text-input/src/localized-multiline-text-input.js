import { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
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
import { LocalizedInputToggle } from '@commercetools-uikit/input-utils';
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

  const [expandedTranslationsState, expandedTranslationsDispatch] = useReducer(
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

  const toggleLanguage = useCallback(
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

  const shouldRenderLanguagesButton =
    languages.length > 1 && !props.hideLanguageExpansionControls;

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <Stack scale="s">
          {languages.map((language, index) => {
            const isFirstLanguage = index === 0;
            if (!isFirstLanguage && !areLanguagesOpened) return null;
            const isLastLanguage = index === languages.length - 1;

            const hasLanguagesControl =
              (isFirstLanguage && !areLanguagesOpened) || isLastLanguage;

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
                hasError={Boolean(
                  props.hasError || (props.errors && props.errors[language])
                )}
                hasWarning={Boolean(
                  props.hasWarning ||
                    (props.warnings && props.warnings[language])
                )}
                intl={intl}
                warning={props.warnings && props.warnings[language]}
                error={props.errors && props.errors[language]}
                hasLanguagesControl={hasLanguagesControl}
                {...createLocalizedDataAttributes(props, language)}
              />
            );
          })}
        </Stack>
        {shouldRenderLanguagesButton && (
          <div
            css={css`
              align-self: flex-start;
            `}
          >
            <LocalizedInputToggle
              isOpen={areLanguagesOpened}
              onClick={toggleLanguages}
              isDisabled={
                areLanguagesOpened &&
                Boolean(
                  hasErrorInRemainingLanguages || hasWarningInRemainingLanguages
                )
              }
              remainingLocalizations={languages.length - 1}
            />
          </div>
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedMultilineTextInput.displayName = 'LocalizedMultilineTextInput';

LocalizedMultilineTextInput.RequiredValueErrorMessage =
  RequiredValueErrorMessage;

LocalizedMultilineTextInput.propTypes = {
  /**
   * Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`
   */
  id: PropTypes.string,
  /**
   * Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`
   */
  name: PropTypes.string,
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete: PropTypes.string,
  /**
   * Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`
   * <br />
   * The input doesn't accept a "languages" prop, instead all possible
   * languages have to exist (with empty or filled strings) on the value:
   * <br />   { en: 'foo', de: '', es: '' }
   */
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: PropTypes.string.isRequired,
  /**
   * Called when input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * Expands input components holding multiline values instead of collpasing them by default.
   */
  defaultExpandMultilineText: PropTypes.bool,
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls: PropTypes.bool,
  /**
   * Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.
   */
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
  /**
   * Sets the focus on the first input when `true` is passed.
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Disables all input fields.
   */
  isDisabled: PropTypes.bool,
  /**
   * Disables all input fields and shows them in read-only mode.
   */
  isReadOnly: PropTypes.bool,
  /**
   * Placeholders for each language. Object of the same shape as `value`.
   */
  placeholder: PropTypes.objectOf(PropTypes.string),
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
  /**
   * Will apply the error state to each input without showing any error message.
   */
  hasError: PropTypes.bool,
  /**
   * Will apply the warning state to each input without showing any error message.
   */
  hasWarning: PropTypes.bool,
  /**
   * Used to show errors underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the error to show for that key.
   */
  errors: PropTypes.objectOf(PropTypes.node),
  /**
   * Used to show warnings underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the warning to show for that key.
   */
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
