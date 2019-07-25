import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/core';
import ErrorMessage from '../../messages/error-message';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Spacings from '../../spacings';
import Constraints from '../../constraints';
import Text from '../../typography/text';
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
} from '../../../utils/localized';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import LanguagesButton from './languages-button';
import messages from './messages';
import {
  getLocalizedInputStyles,
  getLanguageLabelStyles,
} from './localized-text-input.styles';

const sequentialId = createSequentialId('localized-text-input-');

const LocalizedInput = props => {
  const handleChange = event => {
    // eslint-disable-next-line no-param-reassign
    event.target.language = props.language;
    props.onChange(event);
  };

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
        css={theme => getLanguageLabelStyles(props, theme)}
      >
        {/* FIXME: add proper tone for disabled when tones are refactored */}
        <Text.Detail tone="secondary">
          {props.language.toUpperCase()}
        </Text.Detail>
      </label>
      <input
        id={props.id}
        name={props.name}
        autoComplete={props.autoComplete}
        type="text"
        value={props.value}
        onChange={handleChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        css={theme => getLocalizedInputStyles(props, theme)}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        role="textbox"
        contentEditable={!props.isReadOnly}
        {...filterDataAttributes(props)}
      />
    </div>
  );
};

LocalizedInput.displayName = 'LocalizedInput';
LocalizedInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
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

const LocalizedTextInput = props => {
  let defaultExpansionState = false;

  if (props.hideLanguageExpansionControls) {
    defaultExpansionState = true;
  } else if (props.defaultExpandLanguages) {
    defaultExpansionState = true;
  }

  const [areLanguagesExpanded, setAreLanguagesExpanded] = React.useState(
    defaultExpansionState
  );

  const languages = sortLanguages(
    props.selectedLanguage,
    Object.keys(props.value)
  );

  const toggleLanguages = React.useCallback(() => {
    setAreLanguagesExpanded(!areLanguagesExpanded);
  }, [areLanguagesExpanded]);

  const id = getFieldId(props, {}, sequentialId);

  const hasErrorInRemainingLanguages =
    props.hasError ||
    getHasErrorOnRemainingLanguages(props.errors, props.selectedLanguage);

  if (hasErrorInRemainingLanguages) {
    const shouldLanguagesExpand =
      hasErrorInRemainingLanguages ||
      props.hideLanguageExpansionControls ||
      areLanguagesExpanded;

    if (shouldLanguagesExpand !== areLanguagesExpanded) {
      setAreLanguagesExpanded(shouldLanguagesExpand);
    }
  }

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack>
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
              <Spacings.Stack scale="xs">
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
              </Spacings.Stack>
            </div>
          );
        })}
      </Spacings.Stack>
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
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  selectedLanguage: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
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
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  hasError: PropTypes.bool,
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
