import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import FieldErrors from '../../field-errors';
import NumberInput from '../../inputs/number-input';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const getNumberInputProps = (props = {}) => ({
  readOnly: props.readOnly || props.isReadOnly,
  disabled: props.disabled || props.isDisabled,
  required: props.required || props.isRequired,
  autoFocus: props.autoFocus || props.isAutofocussed,
  ...omit(props, [
    // NumberField
    'intl',
    'errors',
    'touched',
    'renderError',
    // LabelField
    'hint',
    'title',
    'badge',
    'hintIcon',
    'description',
    'onInfoButtonClick',
    /* deprecated */
    'isReadOnly',
    'isDisabled',
    'isRequired',
    'isAutofocussed',
  ]),
});

const sequentialId = createSequentialId('number-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class NumberField extends React.Component {
  static displayName = 'NumberField';

  static propTypes = {
    // NumberField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    touched: PropTypes.bool,

    // NumberInput
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

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

    // deprecated props
    isRequired(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "required" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
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
    const numberInputProps = getNumberInputProps(this.props);

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
            hasRequiredIndicator={numberInputProps.required}
            htmlFor={this.state.id}
          />
          <NumberInput
            id={this.state.id}
            hasError={hasError}
            {...numberInputProps}
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

export default NumberField;
