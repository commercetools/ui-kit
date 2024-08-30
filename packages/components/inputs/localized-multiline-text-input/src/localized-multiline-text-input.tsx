import {
  useReducer,
  useCallback,
  type ReactNode,
  type ChangeEventHandler,
  type FocusEventHandler,
} from 'react';
import { useIntl, type MessageDescriptor } from 'react-intl';
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
import { warning } from '@commercetools-uikit/utils';

type TExpandedTranslationsReducerState = Record<string, boolean>;
type TExpandedTranslationsReducerAction = {
  type: string;
  payload: string;
};

interface HTMLLocalizedTextAreaElement extends HTMLTextAreaElement {
  language: string;
}

export type TLocalizedMultilineTextInputProps = {
  /**
   * Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`
   */
  id?: string;
  /**
   * Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`
   */
  name?: string;
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`
   * <br />
   * The input doesn't accept a "languages" prop, instead all possible
   * languages have to exist (with empty or filled strings) on the value:
   * <br />
   * { en: 'foo', de: '', es: '' }
   */
  value: {
    [key: string]: string;
  };
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange?: ChangeEventHandler<HTMLLocalizedTextAreaElement>;
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: string;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLLocalizedTextAreaElement>;
  /**
   * Called when input is focused
   */
  onFocus?: () => void;
  /**
   * Expands input components holding multiline values instead of collpasing them by default.
   */
  defaultExpandMultilineText?: boolean;
  /**
   * Use this property to turn off caching input measurements.
   */
  cacheMeasurements?: boolean;
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls?: boolean;
  /**
   * Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.
   */
  defaultExpandLanguages?: boolean;

  /**
   * Sets the focus on the first input when `true` is passed.
   */
  isAutofocussed?: boolean;
  /**
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Disables all input fields.
   */
  isDisabled?: boolean;
  /**
   * Disables all input fields and shows them in read-only mode.
   */
  isReadOnly?: boolean;
  /**
   * Placeholders for each language. Object of the same shape as `value`.
   */
  placeholder?: {
    [key: string]: string;
  };
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Will apply the error state to each input without showing any error message.
   */
  hasError?: boolean;
  /**
   * Will apply the warning state to each input without showing any error message.
   */
  hasWarning?: boolean;
  /**
   * Used to show errors underneath the inputs of specific locales. Pass an object whose key is a locale and whose value is the error to show for that key.
   */
  errors?: {
    [key: string]: ReactNode;
  };
  /**
   * Used to show warnings underneath the inputs of specific locales. Pass an object whose key is a locale and whose value is the warning to show for that key.
   */
  warnings?: {
    [key: string]: ReactNode;
  };
  /**
   * An object mapping locales to additional messages to be rendered below each input element.
    Example:
    {
      en: 'Some value',
      es: 'Algún valor',
    }
   */
  additionalInfo?: Record<
    string,
    | string
    | ReactNode
    | (MessageDescriptor & {
        values: Record<string, ReactNode>;
      })
  >;
};

const expandedTranslationsReducer = (
  state: TExpandedTranslationsReducerState,
  action: TExpandedTranslationsReducerAction
) => {
  switch (action.type) {
    case 'toggle':
      return {
        ...state,
        [action.payload]: !state[action.payload as keyof typeof state],
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
const LocalizedMultilineTextInput = (
  props: TLocalizedMultilineTextInputProps
) => {
  const intl = useIntl();

  const initialExpandedTranslationsState = Object.keys(props.value).reduce(
    (translations, locale) => ({
      ...translations,
      [locale]: Boolean(props.defaultExpandMultilineText),
    }),
    {} as TExpandedTranslationsReducerState
  );

  const [expandedTranslationsState, expandedTranslationsDispatch] = useReducer<
    (
      prevState: TExpandedTranslationsReducerState,
      action: TExpandedTranslationsReducerAction
    ) => TExpandedTranslationsReducerState
  >(expandedTranslationsReducer, initialExpandedTranslationsState);

  const defaultExpansionState =
    props.hideLanguageExpansionControls ||
    props.defaultExpandLanguages ||
    // useToggleState's default is `true`, but we want `false`
    false;

  const [areLanguagesOpened, toggleLanguages] = useToggleState(
    defaultExpansionState
  );

  const toggleLanguage = useCallback(
    (language: string) => {
      expandedTranslationsDispatch({ type: 'toggle', payload: language });
    },
    [expandedTranslationsDispatch]
  );

  const languages: Array<string> = sortLanguages(
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

  const onLocalizedInputToggle = useCallback(
    () => toggleLanguages(),
    [toggleLanguages]
  );

  const shouldRenderLanguagesButton =
    languages.length > 1 && !props.hideLanguageExpansionControls;

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'LocalizedMultilineTextInput: "onChange" is required when isReadOnly is not true'
    );
  }

  if (props.hideLanguageExpansionControls) {
    warning(
      typeof props.hideLanguageExpansionControls === 'boolean',
      'LocalizedMultilineTextInput: "defaultExpandLanguages" does not have any effect when "hideLanguageExpansionControls" is set.'
    );
  }

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
                cacheMeasurements={props.cacheMeasurements}
                isCondensed={props.isCondensed}
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
                additionalInfo={
                  props.additionalInfo && props.additionalInfo[language]
                }
                hasLanguagesControl={hasLanguagesControl}
                {...createLocalizedDataAttributes(props, language)}
                /* ARIA */
                aria-invalid={props['aria-invalid']}
                aria-errormessage={props['aria-errormessage']}
              />
            );
          })}
        </Stack>
        {shouldRenderLanguagesButton && (
          <LocalizedInputToggle
            isOpen={areLanguagesOpened}
            onClick={onLocalizedInputToggle}
            isDisabled={
              areLanguagesOpened &&
              Boolean(
                hasErrorInRemainingLanguages || hasWarningInRemainingLanguages
              )
            }
            remainingLocalizations={languages.length - 1}
          />
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedMultilineTextInput.displayName = 'LocalizedMultilineTextInput';

LocalizedMultilineTextInput.RequiredValueErrorMessage =
  RequiredValueErrorMessage;

LocalizedMultilineTextInput.getId = getId;

LocalizedMultilineTextInput.getName = getName;

LocalizedMultilineTextInput.defaultProps = {
  horizontalConstraint: 'scale',
  cacheMeasurements: true,
};

LocalizedMultilineTextInput.createLocalizedString = createLocalizedString;

LocalizedMultilineTextInput.isEmpty = isEmpty;

LocalizedMultilineTextInput.omitEmptyTranslations = omitEmptyTranslations;

LocalizedMultilineTextInput.isTouched = isTouched;

export default LocalizedMultilineTextInput;
