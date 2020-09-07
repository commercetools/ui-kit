import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/core';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import { ErrorMessage } from '@commercetools-uikit/messages';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
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
import { createSequentialId } from '@commercetools-uikit/utils';
import TextInput from '@commercetools-uikit/text-input';
import LanguagesButton from './languages-button';
import messages from '../../../../../src/components/internals/messages/localized-input';
import {
  getLocalizedInputStyles,
  getLanguageLabelStyles,
} from './localized-text-input.styles';

const sequentialId = createSequentialId('localized-text-input-');

const LocalizedInput = (props) => {
  const { onChange } = props;
  const handleChange = React.useCallback(
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
      // eslint-disable-next-line no-param-reassign
      event.target.language = props.language;
      onChange(event);
    },
    [props.language, onChange]
  );

  return (
    <div
      key={props.language}
      css={css`
        width: 100%;
        position: relative;
        display: flex;
      `}
    >
      <label
        htmlFor={props.id}
        css={(theme) => getLanguageLabelStyles(props, theme)}
      >
        {/* FIXME: add proper tone for disabled when tones are refactored */}
        <Text.Detail tone="secondary">
          {props.language.toUpperCase()}
        </Text.Detail>
      </label>
      <TextInput
        {...props}
        onChange={handleChange}
        css={getLocalizedInputStyles}
      />
    </div>
  );
};

LocalizedInput.displayName = 'LocalizedInput';
LocalizedInput.propTypes = {
  /**
   * Used as prefix of HTML `id` property. Each input field id will have the language as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`. You can use the static `LocalizedTextInput.getId(idPrefix, language)` to create this id string, e.g. for labels.
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
  value: PropTypes.string.isRequired,
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  language: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  placeholder: PropTypes.string,
};

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messages.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

const LocalizedTextInput = (props) => {
  const defaultExpansionState =
    props.hideLanguageExpansionControls ||
    props.defaultExpandLanguages || // default to `false`, because useToggleState defaults to `true`
    false;

  const [areLanguagesExpanded, toggleLanguages] = useToggleState(
    defaultExpansionState
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

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Stack>
        {languages.map((language, index) => {
          const isFirstLanguage = index === 0;
          const isLastLanguage = index === languages.length - 1;
          const hasRemainingLanguages = languages.length > 1;
          const hasErrorOnRemainingLanguages =
            props.hasError ||
            getHasErrorOnRemainingLanguages(
              props.errors,
              props.selectedLanguage
            );
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
                  {...createLocalizedDataAttributes(props, language)}
                />
                {props.errors && props.errors[language]}
                {(() => {
                  if (
                    !hasRemainingLanguages ||
                    props.hideLanguageExpansionControls
                  )
                    return null;

                  if (isFirstLanguage && !areLanguagesExpanded)
                    return (
                      <LanguagesButton
                        onClick={toggleLanguages}
                        remainingLanguages={languages.length - 1}
                      />
                    );

                  if (isLastLanguage)
                    return (
                      <LanguagesButton
                        onClick={toggleLanguages}
                        isOpen={true}
                        remainingLanguages={languages.length - 1}
                        isDisabled={hasErrorOnRemainingLanguages}
                      />
                    );

                  return null;
                })()}
              </Stack>
            </div>
          );
        })}
      </Stack>
    </Constraints.Horizontal>
  );
};

LocalizedTextInput.displayName = 'LocalizedTextInput';

LocalizedTextInput.RequiredValueErrorMessage = RequiredValueErrorMessage;

LocalizedTextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  // then input doesn't accept a "languages" prop, instead all possible
  // languages have to exist (with empty or filled strings) on the value:
  //   { en: 'foo', de: '', es: '' }
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: PropTypes.string.isRequired,
  /**
   * Called when any field is blurred. Is called with the `event` of that field.
   */
  onBlur: PropTypes.func,
  /**
   * Called when any field is focussed. Is called with the `event` of that field.
   */
  onFocus: PropTypes.func,
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls: PropTypes.bool,
  /**
   * Controls whether one or all languages are visible by default
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
   * Focus the input field on initial render
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
   * `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  /**
   * Will apply the error state to each input without showing any error message.
   */
  hasError: PropTypes.bool,
  /**
   * Used to show errors underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the error to show for that key.
   */
  errors: PropTypes.objectOf(PropTypes.node),
};

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
