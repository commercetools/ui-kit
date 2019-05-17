import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import has from 'lodash/has';
import flatMap from 'lodash/flatMap';
import { withTheme } from 'emotion-theming';
import Select, { components as defaultComponents } from 'react-select';
import Constraints from '../../constraints';
import SafeHTMLElement from '../../../utils/helpers/safeHTMLElement';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import addStaticFields from '../../../utils/add-static-fields';
import ClearIndicator from '../../internals/clear-indicator';
import TagRemove from '../../internals/tag-remove';
import DropdownIndicator from '../../internals/dropdown-indicator';
import messages from './messages';
import createSelectStyles from '../../internals/create-select-styles';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

export class SelectInput extends React.Component {
  static displayName = 'SelectInput';

  // Both "true" and an empty array [] represent a touched state. The Boolean
  // conveniently handles both cases
  static isTouched = touched => Boolean(touched);

  static defaultProps = {
    maxMenuHeight: 220,
    menuPortalZIndex: 1,
  };

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    // withTheme
    theme: PropTypes.object,
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
    // blurInputOnSelect: PropTypes.bool,
    // captureMenuScroll: PropTypes.bool,
    // className: PropTypes.string,
    // classNamePrefix: PropTypes.string,
    // closeMenuOnSelect: PropTypes.bool,
    // closeMenuOnScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    components: PropTypes.objectOf(PropTypes.func),
    // controlShouldRenderValue: PropTypes.bool,
    // delimiter: PropTypes.string,
    // escapeClearsValue: PropTypes.bool,
    filterOption: PropTypes.func,
    // formatGroupLabel: PropTypes.func,
    // formatOptionLabel: PropTypes.func,
    // getOptionLabel: PropTypes.func,
    // getOptionValue: PropTypes.func,
    // hideSelectedOptions: PropTypes.bool,
    // This forwarded as react-select's "inputId"
    id: PropTypes.string,
    // inputValue: PropTypes.string,
    // This is forwarded as react-select's "id"
    containerId: PropTypes.string,
    // instanceId: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    // isLoading: PropTypes.bool,
    isOptionDisabled: PropTypes.func,
    // isOptionSelected: PropTypes.func,
    isMulti: PropTypes.bool,
    // isRtl: PropTypes.bool,
    isSearchable: PropTypes.bool,
    // loadingMessage: PropTypes.func,
    // minMenuHeight: PropTypes.number,
    maxMenuHeight: PropTypes.number,
    // menuIsOpen: PropTypes.bool,
    // menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),
    // menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
    menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
    menuPortalZIndex: PropTypes.number.isRequired,
    menuShouldBlockScroll: PropTypes.bool,
    // menuShouldScrollIntoView: PropTypes.bool,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInputChange: PropTypes.func,
    // onKeyDown: PropTypes.func,
    // onMenuOpen: PropTypes.func,
    // onMenuClose: PropTypes.func,
    // onMenuScrollToTop: PropTypes.func,
    // onMenuScrollToBottom: PropTypes.func,
    // openMenuOnFocus: PropTypes.bool,
    // openMenuOnClick: PropTypes.bool,
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
    // pageSize: PropTypes.number,
    placeholder: PropTypes.string,
    // screenReaderStatus: PropTypes.func,
    // styles: PropTypes.objectOf(PropTypes.func),
    // theme: PropTypes.object,
    tabIndex: PropTypes.string,
    tabSelectsValue: PropTypes.bool,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
        : PropTypes.string(props, ...rest),
  };

  state = { selectedOptions: [] };

  static getDerivedStateFromProps = props => {
    // Options can be grouped as
    //   const colourOptions = [{ value: 'green', label: 'Green' }];
    //   const flavourOptions = [{ value: 'vanilla', label: 'Vanilla' }];
    //   const groupedOptions = [
    //     { label: 'Colours', options: colourOptions },
    //     { label: 'Flavours', options: flavourOptions },
    //   ];
    // So we "ungroup" the options by merging them all into one list first.
    const optionsWithoutGroups = flatMap(props.options, option =>
      has(option, 'value') ? option : option.options
    );

    /**
     * Select (from react-select) will not update the selected value when the next value gets passed as undefined.
     * So we need to pass null instead, so that Select clears the selected value.
     */
    return {
      selectedOptions: props.isMulti
        ? props.value
            // Pass the options in the order selected by the use, so that the
            // sorting is not lost
            .map(value =>
              optionsWithoutGroups.find(option => option.value === value)
            )
            .filter(Boolean)
        : optionsWithoutGroups.find(
            option => has(option, 'value') && option.value === props.value
          ) || null,
    };
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <Select
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            autoFocus={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={{
              ...customizedComponents,
              ...this.props.components,
            }}
            styles={createSelectStyles(
              {
                hasWarning: this.props.hasWarning,
                hasError: this.props.hasError,
                showOptionGroupDivider: this.props.showOptionGroupDivider,
                menuPortalZIndex: this.props.menuPortalZIndex,
              },
              this.props.theme
            )}
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
            onChange={selectedOptions =>
              // selectedOptions is either an array, or a single option
              // depending on whether we're in multi-mode or not (isMulti)
              this.props.onChange({
                target: {
                  name: this.props.name,
                  // eslint-disable-next-line no-nested-ternary
                  value: selectedOptions
                    ? this.props.isMulti
                      ? selectedOptions.map(option => option.value)
                      : selectedOptions.value
                    : selectedOptions,
                },
                persist: () => {},
              })
            }
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            options={this.props.options}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.state.selectedOptions}
          />
        </div>
      </Constraints.Horizontal>
    );
  }
}

const IntlEnhanced = injectIntl(SelectInput);
const ThemeEnhanced = withTheme(IntlEnhanced);

addStaticFields(ThemeEnhanced, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: SelectInput.isTouched,
});
export default ThemeEnhanced;
