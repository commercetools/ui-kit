import {
  useReducer,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { css } from '@emotion/react';
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
import { warning } from '@commercetools-uikit/utils';
import RichTextInput from './rich-text-input';
import RequiredValueErrorMessage from './required-value-error-message';

type TErrors = Record<string, string>;
type TWarnings = Record<string, ReactNode>;

type TEvent = {
  target: {
    id?: string;
    name?: string;
    language?: string;
    value?: string;
  };
};

type TLocalizedRichTextInputProps = {
  id?: string;
  name?: string;
  // then input doesn't accept a "languages" prop, instead all possible
  // languages have to exist (with empty or filled slate values) on the value:
  //   { en: slateValue, de: slateValue, es: slateValue }
  value: Record<string, string>;
  onChange?: (event: TEvent) => void;
  selectedLanguage: string;
  onBlur?: (event: TEvent) => void;
  onFocus?: (event: TEvent) => void;
  defaultExpandMultilineText?: boolean;
  hideLanguageExpansionControls?: boolean;
  defaultExpandLanguages?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: Record<string, string>;
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
  hasError?: boolean;
  hasWarning?: boolean;
  errors?: TErrors;
  warnings?: TWarnings;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
};

type TReducerState = {
  [id: string]: boolean;
};

type TReducerAction =
  | { type: 'toggle'; payload: string }
  | { type: 'toggleAll'; payload: string };

const defaultProps: Pick<
  TLocalizedRichTextInputProps,
  'horizontalConstraint' | 'showExpandIcon'
> = {
  horizontalConstraint: 'scale',
  showExpandIcon: false,
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
const LocalizedRichTextInput = (props: TLocalizedRichTextInputProps) => {
  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'LocalizedRichTextInput: `onChange` is required when input is not read only.'
    );
  }

  if (props.showExpandIcon) {
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

  const shouldRenderLanguagesControl =
    languages.length > 1 && !props.hideLanguageExpansionControls;

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
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
                key={language}
                id={LocalizedRichTextInput.getId(props.id, language)}
                name={LocalizedRichTextInput.getName(props.name, language)}
                value={props.value[language]}
                onChange={props.onChange}
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
                showExpandIcon={props.showExpandIcon}
                onClickExpand={props.onClickExpand}
                hasLanguagesControl={hasLanguagesControl}
                {...createLocalizedDataAttributes(props, language)}
              />
            );
          })}
        </Stack>
        {shouldRenderLanguagesControl && (
          <div
            css={css`
              align-self: flex-start;
            `}
          >
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
          </div>
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedRichTextInput.displayName = 'LocalizedRichTextInput';

LocalizedRichTextInput.RequiredValueErrorMessage = RequiredValueErrorMessage;

LocalizedRichTextInput.getId = getId;

LocalizedRichTextInput.getName = getName;

LocalizedRichTextInput.defaultProps = defaultProps;

LocalizedRichTextInput.createLocalizedString = localized.createLocalizedString;

LocalizedRichTextInput.isEmpty = localized.isEmpty;

LocalizedRichTextInput.omitEmptyTranslations = localized.omitEmptyTranslations;

LocalizedRichTextInput.isTouched = isTouched;

export default LocalizedRichTextInput;
