import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  components as defaultComponents,
  Creatable as CreatableSelect,
} from 'react-select';
import Constraints from '../../constraints';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import getElement from '../../../utils/get-element';
import addStaticFields from '../../../utils/add-static-fields';
import ClearIndicator from '../../internals/clear-indicator';
import DropdownIndicator from '../../internals/dropdown-indicator';
import MultiValue from '../../internals/multivalue';
import createSelectStyles from '../../internals/create-select-styles';
import messages from './messages';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValue,
};

const PropTypeElement = getElement();

export class CreatableSelectInput extends React.Component {
  static displayName = 'SelectInput';

  // Both "true" and an empty array [] represent a touched state. The Boolean
  // conveniently handles both cases
  static isTouched = touched => Boolean(touched);

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,

    // react-select base props
    //
    // Currently unsupported props are commented out. In case you need one of
    // these props when using UI Kit, you can submit a PR and enable the
    // prop. Don't forget to add it to the story, docs and other select input
    // components as well!
    //
    // See https://react-select.com/props#select-props
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    isAutofocussed: PropTypes.bool, // original: autoFocus
    backspaceRemovesValue: PropTypes.bool,
    components: PropTypes.objectOf(PropTypes.func),
    filterOption: PropTypes.func,
    // This forwarded as react-select's "inputId"
    id: PropTypes.string,
    // This is forwarded as react-select's "id"
    containerId: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionDisabled: PropTypes.func,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    maxMenuHeight: PropTypes.number,
    menuPortalTarget: PropTypes.instanceOf(PropTypeElement),
    menuPortalZIndex: PropTypes.number.isRequired,
    menuShouldBlockScroll: PropTypes.bool,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
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
    showOptionGroupDivider: PropTypes.bool,
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

    // Creatable props
    allowCreateWhileLoading: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    isValidNewOption: PropTypes.func,
    getNewOptionData: PropTypes.func,
    onCreateOption: PropTypes.func,
    createOptionPosition: PropTypes.string,
  };

  static defaultProps = {
    // Using "null" will ensure that the currently selected value disappears in
    // case "undefined" gets passed as the next value
    value: null,
    // The input needs to be searchable, otherwise it's not possible to create
    // new options.
    // We still allow consumers to pass isSearchable={false} so that they can
    // use CreatableSelectInput as an alternative to SelectInput, which does
    // not do the option/value mapping going on there and therefore provides
    // the default API of react-select.
    isSearchable: true,
    menuPortalZIndex: 1,
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <CreatableSelect
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            autoFocus={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={{
              ...customizedComponents,
              ...this.props.components,
            }}
            styles={createSelectStyles({
              hasWarning: this.props.hasWarning,
              hasError: this.props.hasError,
              showOptionGroupDivider: this.props.showOptionGroupDivider,
              menuPortalZIndex: this.props.menuPortalZIndex,
            })}
            filterOption={this.props.filterOption}
            // react-select uses "id" (for the container) and "inputId" (for the input),
            // but we use "id" (for the input) and "containerId" (for the container)
            // instead.
            // This makes it easier to less confusing to use with <label />s.
            id={this.props.containerId}
            inputId={this.props.id}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            maxMenuHeight={this.props.maxMenuHeight}
            menuPortalTarget={this.props.menuPortalTarget}
            menuShouldBlockScroll={this.props.menuShouldBlockScroll}
            name={this.props.name}
            noOptionsMessage={
              this.props.noOptionsMessage ||
              (({ inputValue }) =>
                inputValue === ''
                  ? this.props.intl.formatMessage(
                      messages.noOptionsMessageWithoutInputValue
                    )
                  : this.props.intl.formatMessage(
                      messages.noOptionsMessageWithInputValue,
                      { inputValue }
                    ))
            }
            onBlur={
              typeof this.props.onBlur === 'function'
                ? () => {
                    const event = {
                      target: {
                        name: (() => {
                          if (!this.props.isMulti) return this.props.name;
                          // We append the ".0" to make Formik set the touched
                          // state as an array instead of a boolean only.
                          // Otherwise the shapes would clash on submission, as
                          // Formik will create an array on submission anyways.
                          return this.props.name
                            ? `${this.props.name}.0`
                            : undefined;
                        })(),
                      },
                      persist: () => {},
                    };
                    this.props.onBlur(event);
                  }
                : undefined
            }
            onChange={(value, info) =>
              // selectedOptions is either an array, or a single option
              // depending on whether we're in multi-mode or not (isMulti)
              this.props.onChange(
                {
                  target: { name: this.props.name, value },
                  persist: () => {},
                },
                info
              )
            }
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            options={this.props.options}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Creatable props
            allowCreateWhileLoading={this.props.allowCreateWhileLoading}
            formatCreateLabel={
              this.props.formatCreateLabel ||
              (inputValue =>
                this.props.intl.formatMessage(messages.createLabel, {
                  inputValue,
                }))
            }
            isValidNewOption={this.props.isValidNewOption}
            getNewOptionData={this.props.getNewOptionData}
            onCreateOption={this.props.onCreateOption}
            createOptionPosition={this.props.createOptionPosition}
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}

const Enhanced = injectIntl(CreatableSelectInput);
addStaticFields(Enhanced, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: CreatableSelectInput.isTouched,
});
export default Enhanced;
