import {
  type FocusEventHandler,
  type ChangeEventHandler,
  useCallback,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import { ErrorMessage } from '@commercetools-uikit/messages';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints, { TMaxProp } from '@commercetools-uikit/constraints';
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
} from '@commercetools-uikit/localized-utils';
import { createSequentialId, warning } from '@commercetools-uikit/utils';
import TextInput from '@commercetools-uikit/text-input';
import {
  LocalizedInputToggle,
  messagesLocalizedInput,
} from '@commercetools-uikit/input-utils';
import {
  getLocalizedInputStyles,
  getLanguageLabelStyles,
} from './localized-text-input.styles';

interface HTMLLocalizedInputElement extends HTMLInputElement {
  language: string;
}

export type TLocalizedTextInputProps = {
  id?: string;
  name?: string;
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
   *   then input doesn't accept a "languages" prop, instead all possible
  languages have to exist (with empty or filled strings) on the value:
    { en: 'foo', de: '', es: '' }
   */
  value: Record<string, string>;
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange?: ChangeEventHandler<HTMLLocalizedInputElement>;
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: string;
  /**
   * Called when any field is blurred. Is called with the `event` of that field.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when any field is focussed. Is called with the `event` of that field.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls?: boolean;
  /**
   * Controls whether one or all languages are visible by default
   */
  defaultExpandLanguages?: boolean;
  /**
   * Focus the input field on initial render
   */
  isAutofocussed?: boolean;
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
  placeholder?: Record<string, string>;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?: TMaxProp;
  /**
   * Will apply the error state to each input without showing any error message.
   */
  hasError?: boolean;
  /**
   * Used to show errors underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the error to show for that key.
   */
  errors?: Record<string, string>;
};

export type TLocalizedInputProps = {
  /**
   * Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`. You can use the static `LocalizedTextInput.getId(idPrefix, language)` to create this id string, e.g. for labels.
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
  value: string;
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange?: ChangeEventHandler<HTMLLocalizedInputElement>;
  language: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  isAutofocussed?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  placeholder?: string;
  horizontalConstraint?: TMaxProp;
};

const sequentialId = createSequentialId('localized-text-input-');

const LocalizedInput = (props: TLocalizedInputProps) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (event) => {
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
      event.target.language = props.language;
      onChange?.(event);
    },
    [props.language, onChange]
  );

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'LocalizedTextInput: "onChange" is required when isReadOnly is not true'
    );
  }

  return (
    <div
      key={props.language}
      css={css`
        width: 100%;
        position: relative;
        display: flex;
      `}
    >
      <label htmlFor={props.id} css={getLanguageLabelStyles(props)}>
        {props.language.toUpperCase()}
      </label>
      <TextInput
        {...props}
        horizontalConstraint={
          props.horizontalConstraint === 'auto' ? 'auto' : undefined
        }
        onChange={handleChange}
        css={getLocalizedInputStyles}
      />
    </div>
  );
};

LocalizedInput.displayName = 'LocalizedInput';

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messagesLocalizedInput.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

const LocalizedTextInput = (props: TLocalizedTextInputProps) => {
  const defaultExpansionState =
    props.hideLanguageExpansionControls ||
    props.defaultExpandLanguages || // default to `false`, because useToggleState defaults to `true`
    false;

  const [areLanguagesExpanded, toggleLanguages] = useToggleState(
    defaultExpansionState
  );

  const onLocalizedInputToggle = useCallback(
    () => toggleLanguages(),
    [toggleLanguages]
  );

  const languages = sortLanguages(
    props.selectedLanguage,
    Object.keys(props.value)
  );

  const id = useFieldId(props.id, sequentialId);

  const hasErrorInRemainingLanguages =
    props.hasError ||
    getHasErrorOnRemainingLanguages(props.errors, props.selectedLanguage);

  if (hasErrorInRemainingLanguages) {
    // this update within render replaces the old `getDerivedStateFromProps` functionality
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    if (hasErrorInRemainingLanguages !== areLanguagesExpanded) {
      toggleLanguages();
    }
  }

  const shouldRenderLanguagesButton =
    languages.length > 1 && !props.hideLanguageExpansionControls;

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'LocalizedTextInput: "onChange" is required when isReadOnly is not true'
    );
  }

  if (props.hideLanguageExpansionControls) {
    warning(
      typeof props.defaultExpandLanguages !== 'boolean',
      'LocalizedTextInput: "defaultExpandLanguages" does not have any effect when "hideLanguageExpansionControls" is set.'
    );
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <Stack>
          {languages.map((language, index) => {
            const isFirstLanguage = index === 0;
            if (!isFirstLanguage && !areLanguagesExpanded) return null;

            return (
              <div key={language}>
                <Stack scale="xs">
                  <LocalizedInput
                    autoComplete={props.autoComplete}
                    id={LocalizedTextInput.getId(id, language)}
                    name={LocalizedTextInput.getName(props.name, language)}
                    value={props.value[language]}
                    onChange={props.onChange}
                    language={language}
                    placeholder={
                      props.placeholder
                        ? props.placeholder[language]
                        : undefined
                    }
                    horizontalConstraint={props.horizontalConstraint}
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    isAutofocussed={index === 0 && props.isAutofocussed}
                    isDisabled={props.isDisabled}
                    isReadOnly={props.isReadOnly}
                    hasError={Boolean(
                      props.hasError || (props.errors && props.errors[language])
                    )}
                    {...createLocalizedDataAttributes(props, language)}
                    /* ARIA */
                    aria-invalid={props['aria-invalid']}
                    aria-errormessage={props['aria-errormessage']}
                  />
                  {props.errors && props.errors[language]}
                </Stack>
              </div>
            );
          })}
        </Stack>
        {shouldRenderLanguagesButton && (
          <LocalizedInputToggle
            isOpen={areLanguagesExpanded}
            onClick={onLocalizedInputToggle}
            isDisabled={areLanguagesExpanded && hasErrorInRemainingLanguages}
            remainingLocalizations={languages.length - 1}
          />
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedTextInput.displayName = 'LocalizedTextInput';

LocalizedTextInput.RequiredValueErrorMessage = RequiredValueErrorMessage;

LocalizedTextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

LocalizedTextInput.getId = getId;

LocalizedTextInput.getName = getName;

LocalizedTextInput.createLocalizedString = createLocalizedString;

LocalizedTextInput.isEmpty = isEmpty;

LocalizedTextInput.omitEmptyTranslations = omitEmptyTranslations;

LocalizedTextInput.isTouched = isTouched;

export default LocalizedTextInput;
