import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
  SafeHTMLElement,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import CreatableSelectInput from '@commercetools-uikit/creatable-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('creatable-select-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

export default class CreatableSelectField extends React.Component {
  static displayName = 'CreatableSelectField';

  static propTypes = {
    // CreatableSelectField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.bool, ...rest)(props, ...rest)
        : PropTypes.bool(props, ...rest),

    // CreatableSelectInput
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    isAutofocussed: PropTypes.bool,
    backspaceRemovesValue: PropTypes.bool,
    components: PropTypes.objectOf(PropTypes.func),
    filterOption: PropTypes.func,
    containerId: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isOptionDisabled: PropTypes.func,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    maxMenuHeight: PropTypes.number,
    menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
    menuPortalZIndex: PropTypes.number,
    menuShouldBlockScroll: PropTypes.bool,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInputChange: PropTypes.func,
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
    placeholder: PropTypes.string,
    tabIndex: PropTypes.string,
    tabSelectsValue: PropTypes.bool,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          )(props, ...rest)
        : PropTypes.shape({ value: PropTypes.string.isRequired })(
            props,
            ...rest
          ),
    showOptionGroupDivider: PropTypes.bool,

    // Creatable props
    allowCreateWhileLoading: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    isValidNewOption: PropTypes.func,
    getNewOptionData: PropTypes.func,
    onCreateOption: PropTypes.func,
    createOptionPosition: PropTypes.string,

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
    const hasError =
      CreatableSelectInput.isTouched(this.props.touched) &&
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
            htmlFor={this.state.id}
          />
          <CreatableSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            maxMenuHeight={this.props.maxMenuHeight}
            menuPortalTarget={this.props.menuPortalTarget}
            menuPortalZIndex={this.props.menuPortalZIndex}
            menuShouldBlockScroll={this.props.menuShouldBlockScroll}
            name={this.props.name}
            noOptionsMessage={this.props.noOptionsMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            options={this.props.options}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Creatable props
            allowCreateWhileLoading={this.props.allowCreateWhileLoading}
            formatCreateLabel={this.props.formatCreateLabel}
            isValidNewOption={this.props.isValidNewOption}
            getNewOptionData={this.props.getNewOptionData}
            onCreateOption={this.props.onCreateOption}
            createOptionPosition={this.props.createOptionPosition}
            showOptionGroupDivider={this.props.showOptionGroupDivider}
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
