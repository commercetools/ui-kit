import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import omit from 'lodash.omit';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import SelectInput from '../../inputs/select-input';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';

const sequentialId = createSequentialId('text-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class SelectField extends React.Component {
  static displayName = 'SelectField';

  static propTypes = {
    // SelectField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.bool).isRequired(props, ...rest)
        : PropTypes.bool(props, ...rest),

    // SelectInput
    name: PropTypes.string,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    maxMenuHeight: PropTypes.number,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    components: PropTypes.object,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({ value: PropTypes.string.isRequired }),
        PropTypes.shape({
          options: PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          ),
        }),
      ])
    ),
    noOptionsMessage: PropTypes.func,

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
    const hasError =
      SelectInput.isTouched(this.props.touched) && hasErrors(this.props.errors);
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
          <SelectInput
            {...omit(this.props, [
              // We need to forward any props to SelectInput, which forwards
              // them to react-select.
              // So we filter out all props SelectField uses itself, so that
              // only the props for SelectInput are forwarded.
              'id',
              'horizontalConstraint',
              'hasError',
              'hasWarning',
              'title',
              'hint',
              'description',
              'onInfoButtonClick',
              'hintIcon',
              'badge',
              'hasRequiredIndicator',
              'htmlFor',
              'errors',
              'isVisible',
              'renderError',
              // data attributes are forwarded
            ])}
            horizontalConstraint="scale"
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            maxMenuHeight={this.props.maxMenuHeight}
            isDisabled={this.props.isDisabled}
            isMulti={this.props.isMulti}
            components={this.props.components}
            options={this.props.options}
            noOptionsMessage={this.props.noOptionsMessage}
            hasError={hasError}
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

SelectField.isTouched = SelectInput.isTouched;
// customizable components
SelectField.ClearIndicator = SelectInput.ClearIndicator;
SelectField.Control = SelectInput.Control;
SelectField.DropdownIndicator = SelectInput.DropdownIndicator;
SelectField.Group = SelectInput.Group;
SelectField.GroupHeading = SelectInput.GroupHeading;
SelectField.IndicatorsContainer = SelectInput.IndicatorsContainer;
SelectField.IndicatorSeparator = SelectInput.IndicatorSeparator;
SelectField.Input = SelectInput.Input;
SelectField.LoadingIndicator = SelectInput.LoadingIndicator;
SelectField.Menu = SelectInput.Menu;
SelectField.MenuList = SelectInput.MenuList;
SelectField.LoadingMessage = SelectInput.LoadingMessage;
SelectField.NoOptionsMessage = SelectInput.NoOptionsMessage;
SelectField.MultiValue = SelectInput.MultiValue;
SelectField.MultiValueContainer = SelectInput.MultiValueContainer;
SelectField.MultiValueLabel = SelectInput.MultiValueLabel;
SelectField.MultiValueRemove = SelectInput.MultiValueRemove;
SelectField.Option = SelectInput.Option;
SelectField.Placeholder = SelectInput.Placeholder;
SelectField.SelectContainer = SelectInput.SelectContainer;
SelectField.SingleValue = SelectInput.SingleValue;
SelectField.ValueContainer = SelectInput.ValueContainer;

export default SelectField;
