import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import AsyncSelectInput from '../../inputs/async-select-input';
import withId from '../../../hocs/with-id';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import FieldErrors from '../../field-errors';

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class AsyncSelectField extends React.Component {
  static displayName = 'AsyncSelectField';

  static isTouched = AsyncSelectInput.isTouched;

  // customizable components
  static ClearIndicator = AsyncSelectInput.ClearIndicator;
  static Control = AsyncSelectInput.Control;
  static DropdownIndicator = AsyncSelectInput.DropdownIndicator;
  static Group = AsyncSelectInput.Group;
  static GroupHeading = AsyncSelectInput.GroupHeading;
  static IndicatorsContainer = AsyncSelectInput.IndicatorsContainer;
  static IndicatorSeparator = AsyncSelectInput.IndicatorSeparator;
  static Input = AsyncSelectInput.Input;
  static LoadingIndicator = AsyncSelectInput.LoadingIndicator;
  static Menu = AsyncSelectInput.Menu;
  static MenuList = AsyncSelectInput.MenuList;
  static LoadingMessage = AsyncSelectInput.LoadingMessage;
  static NoOptionsMessage = AsyncSelectInput.NoOptionsMessage;
  static MultiValue = AsyncSelectInput.MultiValue;
  static MultiValueContainer = AsyncSelectInput.MultiValueContainer;
  static MultiValueLabel = AsyncSelectInput.MultiValueLabel;
  static MultiValueRemove = AsyncSelectInput.MultiValueRemove;
  static Option = AsyncSelectInput.Option;
  static Placeholder = AsyncSelectInput.Placeholder;
  static SelectContainer = AsyncSelectInput.SelectContainer;
  static SingleValue = AsyncSelectInput.SingleValue;
  static ValueContainer = AsyncSelectInput.ValueContainer;

  static propTypes = {
    // AsyncSelectField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.bool, ...rest)(props, ...rest)
        : PropTypes.bool(props, ...rest),

    // AsyncSelectInput
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    isAutofocussed: PropTypes.bool,
    backspaceRemovesValue: PropTypes.bool,
    components: PropTypes.objectOf(PropTypes.func),
    filterOption: PropTypes.func,
    containerId: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionDisabled: PropTypes.func,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    maxMenuHeight: PropTypes.number,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.string,
    tabSelectsValue: PropTypes.bool,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),

    // Async props
    defaultOptions: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
    ]),
    loadOptions: PropTypes.func.isRequired,
    cacheOptions: PropTypes.any,

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
    const hasError =
      AsyncSelectInput.isTouched(this.props.touched) &&
      hasErrors(this.props.errors);
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
          <AsyncSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.props.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            maxMenuHeight={this.props.maxMenuHeight}
            name={this.props.name}
            noOptionsMessage={this.props.noOptionsMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Async react-select props
            defaultOptions={this.props.defaultOptions}
            loadOptions={this.props.loadOptions}
            cacheOptions={this.props.cacheOptions}
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

export default withId('async-select-field-')(AsyncSelectField);
