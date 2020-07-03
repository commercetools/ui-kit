import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import {
  filterDataAttributes,
  getFieldId,
  createSequentialId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import LocalizedMultilineTextInput from '@commercetools-uikit/localized-multiline-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('localized-multiline-text-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class LocalizedMultilineTextField extends React.Component {
  static displayName = 'LocalizedMultilineTextField';

  static propTypes = {
    // LocalizedMultilineTextField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.bool,

    // LocalizedMultilineTextInput
    autoComplete: PropTypes.string,
    name: PropTypes.string,
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
    errorsByLanguage: PropTypes.objectOf(PropTypes.node),

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      (props) => props.hintIcon
    ),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onInfoButtonClick: PropTypes.func,
    hintIcon: PropTypes.node,
    badge: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <LocalizedMultilineTextInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            defaultExpandMultilineText={this.props.defaultExpandMultilineText}
            hideLanguageExpansionControls={
              this.props.hideLanguageExpansionControls
            }
            defaultExpandLanguages={this.props.defaultExpandLanguages}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            errors={this.props.errorsByLanguage}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default LocalizedMultilineTextField;
