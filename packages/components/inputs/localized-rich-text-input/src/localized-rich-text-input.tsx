import {
  useReducer,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type FocusEventHandler,
  type MutableRefObject,
} from 'react';
import { type MessageDescriptor } from 'react-intl';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import { useToggleState } from '@commercetools-uikit/hooks';
import {
  sortLanguages,
  createLocalizedDataAttributes,
  getHasErrorOnRemainingLanguages,
  getHasWarningOnRemainingLanguages,
  isTouched,
  getId,
  getName,
} from '@commercetools-uikit/localized-utils';
import { LocalizedInputToggle } from '@commercetools-uikit/input-utils';
import { localized } from '@commercetools-uikit/rich-text-utils';
import { warning, filterDataAttributes } from '@commercetools-uikit/utils';
import RichTextInput from './rich-text-input';
import RequiredValueErrorMessage from './required-value-error-message';

type TErrors = Record<string, string>;
type TWarnings = Record<string, ReactNode>;
type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    language?: string;
    value?: string;
  };
};

export type TLocalizedRichTextInputProps = {
  /**
   * Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en
   */
  id?: string;
  /**
   * Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`
   */
  name?: string;
  // then input doesn't accept a "languages" prop, instead all possible
  // languages have to exist (with empty or filled slate values) on the value:
  //   { en: slateValue, de: slateValue, es: slateValue }
  /**
   * Values to use. Keyed by language, the values are the actual values, e.g. `{ en: '<p>Horse</p>', de: '<p>Pferd</p>' }
   */
  value: Record<string, string>;
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Specifies which language will be shown in case the `LocalizedRichTextInput` is collapsed.
   */
  selectedLanguage: string;
  /**
   * Called when any field is blurred. Is called with the `event` of that field.
   */
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /**
   * Called when any field is focussed. Is called with the `event` of that field.
   */
  onFocus?: FocusEventHandler<HTMLDivElement>;
  /**
   * Expands input components holding multiline values instead of collapsing them by default.
   */
  defaultExpandMultilineText?: boolean;
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`
   */
  hideLanguageExpansionControls?: boolean;
  /**
   * Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.
   */
  defaultExpandLanguages?: boolean;
  /**
   * Disables all input
   */
  isDisabled?: boolean;
  /**
   * Disables all input fields and shows them in read-only mode.
   */
  isReadOnly?: boolean;
  /**
   * Placeholders for each language. Object of the same shape as
   */
  placeholder?: Record<string, string>;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
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
   * Will apply the warning state to each input without showing any warning message.
   */
  hasWarning?: boolean;
  /**
   * Used to show errors underneath the inputs of specific languages. Pass an object whose key is a language and whose value is the error to show for that key.
   */
  errors?: TErrors;
  /**
   * Used to show warnings underneath the inputs of specific languages. Pass an object whose key is a language and whose value is the warning to show for that key.
   */
  warnings?: TWarnings;
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
  /**
   * Shows an `expand` icon in the toolbar
   */
  showExpandIcon: boolean;
  /**
   * Called when the `expand` button is clicked
   */
  onClickExpand?: () => boolean;
};

// When component is using `forwardRef` only `defaultProps` and `displayName` are recognized by default as static props
type StaticProps = {
  RequiredValueErrorMessage: typeof RequiredValueErrorMessage;
  getId: typeof getId;
  getName: typeof getName;
  createLocalizedString: typeof localized.createLocalizedString;
  isEmpty: typeof localized.isEmpty;
  omitEmptyTranslations: typeof localized.omitEmptyTranslations;
  isTouched: typeof isTouched;
};

type TReducerState = Record<string, boolean>;
type TReducerAction =
  | { type: 'toggle'; payload: string }
  | { type: 'toggleAll'; payload: string };

type RefWithImperativeResetHandler = MutableRefObject<unknown> & {
  resetValue: (newValue: string | Record<string, string>) => void;
};

const expandedTranslationsReducer = (
  state: TReducerState,
  action: TReducerAction
) => {
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

// This component supports expanding/collapsing rich text inputs, but it also
// supports showing/hiding the remaining languages.
// These two features are both about opening/closing something, and so the code
// can get quite confusing. We try to stick to expand/collapse for the
// multiline inputs, while we use show/hide/open/close for the remaining
// languages.
const LocalizedRichTextInput: ForwardRefExoticComponent<
  TLocalizedRichTextInputProps & RefAttributes<unknown>
> &
  Partial<StaticProps> = forwardRef(
  (
    {
      horizontalConstraint = 'scale',
      showExpandIcon = false,
      ...props
    }: TLocalizedRichTextInputProps,
    ref
  ) => {
    if (!props.isReadOnly) {
      warning(
        typeof props.onChange === 'function',
        'LocalizedRichTextInput: `onChange` is required when input is not read only.'
      );
    }

    if (showExpandIcon) {
      warning(
        typeof props.onClickExpand === 'function',
        'LocalizedRichTextInput: "onClickExpand" is required when showExpandIcon is true'
      );
    }

    if (props.hideLanguageExpansionControls) {
      warning(
        typeof props.defaultExpandLanguages !== 'boolean',
        'LocalizedRichTextInput: "defaultExpandLanguages" does not have any effect when "hideLanguageExpansionControls" is set.'
      );
    }

    const initialExpandedTranslationsState = Object.keys(props.value).reduce(
      (translations, locale) => ({
        ...translations,
        [locale]: Boolean(props.defaultExpandMultilineText),
      }),
      {} as TReducerState
    );

    const [expandedTranslationsState, expandedTranslationsDispatch] =
      useReducer<
        (state: TReducerState, action: TReducerAction) => TReducerState
      >(expandedTranslationsReducer, initialExpandedTranslationsState);

    const defaultExpansionState = Boolean(
      props.hideLanguageExpansionControls || props.defaultExpandLanguages
    );

    const [areLanguagesOpened, toggleLanguages] = useToggleState(
      defaultExpansionState
    );

    const toggleLanguage = useCallback(
      (language) => {
        expandedTranslationsDispatch({ type: 'toggle', payload: language });
      },
      [expandedTranslationsDispatch]
    );

    const createChangeHandler = useCallback(
      (language: string) => (state: string) => {
        props.onChange?.({
          target: {
            id: props?.id ? `${props.id}.${language}` : '',
            name: props?.name ? `${props.name}.${language}` : '',
            language,
            value: state,
          },
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.id, props.name, props.onChange]
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

    const langRefs = useRef<Map<string, RefWithImperativeResetHandler>>(
      new Map()
    );

    const resetValue = useCallback(
      (newValue: string | Record<string, string>) => {
        langRefs.current.forEach((langRef) => {
          langRef?.resetValue(newValue);
        });
      },
      []
    );

    useImperativeHandle(ref, () => {
      return {
        resetValue,
      };
    });

    const shouldRenderLanguagesControl =
      languages.length > 1 && !props.hideLanguageExpansionControls;

    return (
      <Constraints.Horizontal max={horizontalConstraint}>
        <Stack scale="xs">
          <Stack>
            {languages.map((language, index) => {
              const isFirstLanguage = index === 0;
              if (!isFirstLanguage && !areLanguagesOpened) return null;
              const isLastLanguage = index === languages.length - 1;

              const hasLanguagesControl =
                (isFirstLanguage && !areLanguagesOpened) || isLastLanguage;

              return (
                <RichTextInput
                  {...filterDataAttributes(props)}
                  key={language}
                  id={getId(props.id, language)}
                  name={getName(props.name, language)}
                  value={props.value[language]}
                  onChange={createChangeHandler(language)}
                  language={language}
                  isOpen={expandedTranslationsState[language]}
                  toggleLanguage={toggleLanguage}
                  placeholder={
                    props.placeholder ? props.placeholder[language] : undefined
                  }
                  onBlur={props.onBlur}
                  onFocus={props.onFocus}
                  isDisabled={props.isDisabled}
                  isReadOnly={props.isReadOnly}
                  hasError={Boolean(
                    props.hasError || (props.errors && props.errors[language])
                  )}
                  hasWarning={Boolean(
                    props.hasWarning ||
                      (props.warnings && props.warnings[language])
                  )}
                  warning={props.warnings && props.warnings[language]}
                  error={props.errors && props.errors[language]}
                  additionalInfo={
                    props.additionalInfo && props.additionalInfo[language]
                  }
                  showExpandIcon={showExpandIcon}
                  onClickExpand={props.onClickExpand}
                  hasLanguagesControl={hasLanguagesControl}
                  defaultExpandMultilineText={Boolean(
                    props.defaultExpandMultilineText
                  )}
                  ref={(el: RefWithImperativeResetHandler) =>
                    langRefs.current.set(language, el)
                  }
                  {...createLocalizedDataAttributes(props, language)}
                />
              );
            })}
          </Stack>
          {shouldRenderLanguagesControl && (
            <LocalizedInputToggle
              isOpen={areLanguagesOpened}
              onClick={
                toggleLanguages as (
                  event:
                    | MouseEvent<HTMLButtonElement>
                    | KeyboardEvent<HTMLButtonElement>
                    | boolean
                ) => void
              }
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
  }
);

LocalizedRichTextInput.displayName = 'LocalizedRichTextInput';

LocalizedRichTextInput.RequiredValueErrorMessage = RequiredValueErrorMessage;

LocalizedRichTextInput.getId = getId;

LocalizedRichTextInput.getName = getName;

LocalizedRichTextInput.createLocalizedString = localized.createLocalizedString;

LocalizedRichTextInput.isEmpty = localized.isEmpty;

LocalizedRichTextInput.omitEmptyTranslations = localized.omitEmptyTranslations;

LocalizedRichTextInput.isTouched = isTouched;

export default LocalizedRichTextInput;
