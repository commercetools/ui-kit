import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import oneLine from 'common-tags/lib/oneLine';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import LocalizedTextInput from '../../inputs/localized-text-input';
import withId from '../../../hocs/with-id';
import FieldErrors from '../../field-errors';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class LocalizedTextField extends React.Component {
  static displayName = 'LocalizedTextField';

  static getId = LocalizedTextInput.getId;

  static getName = LocalizedTextInput.getName;

  static createLocalizedString = LocalizedTextInput.createLocalizedString;

  static isEmpty = LocalizedTextInput.isEmpty;

  static omitEmptyTranslations = LocalizedTextInput.omitEmptyTranslations;

  static isTouched = LocalizedTextInput.isTouched;

  static propTypes = {
    // LocalizedTextField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.bool,

    // LocalizedTextInput
    name: PropTypes.string,
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    selectedLanguage: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    hideExpansionControls: PropTypes.bool,
    isDefaultExpanded: (props, propName, componentName, ...rest) => {
      if (props.hideExpansionControls && typeof props[propName] === 'boolean') {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideExpansionControls" is set.
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
            htmlFor={this.props.id}
          />
          <LocalizedTextInput
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            hideExpansionControls={this.props.hideExpansionControls}
            isDefaultExpanded={this.props.isDefaultExpanded}
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

export default withId('localized-text-field-')(LocalizedTextField);
