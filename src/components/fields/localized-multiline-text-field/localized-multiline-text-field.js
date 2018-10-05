import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import oneLine from 'common-tags/lib/oneLine';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import LocalizedMultilineTextInput from '../../inputs/localized-multiline-text-input';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const sequentialId = createSequentialId('text-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class LocalizedMultilineTextField extends React.Component {
  static displayName = 'LocalizedMultilineTextField';

  static getId = LocalizedMultilineTextInput.getId;

  static getName = LocalizedMultilineTextInput.getName;

  static createLocalizedString =
    LocalizedMultilineTextInput.createLocalizedString;

  static isEmpty = LocalizedMultilineTextInput.isEmpty;

  static omitEmptyTranslations =
    LocalizedMultilineTextInput.omitEmptyTranslations;

  static isTouched = LocalizedMultilineTextInput.isTouched;

  static propTypes = {
    // LocalizedMultilineTextField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.bool,

    // LocalizedMultilineTextInput
    name: PropTypes.string,
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    selectedLanguage: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isMultilineDefaultExpanded: PropTypes.bool,
    hideLanguageControls: PropTypes.bool,
    areLanguagesDefaultOpened: (props, propName, componentName, ...rest) => {
      if (props.hideLanguageControls && typeof props[propName] === 'boolean') {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideLanguageControls" is set.
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
      props => props.hintIcon
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
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
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
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isMultilineDefaultExpanded={this.props.isMultilineDefaultExpanded}
            hideLanguageControls={this.props.hideLanguageControls}
            areLanguagesDefaultOpened={this.props.areLanguagesDefaultOpened}
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
