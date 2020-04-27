import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import has from 'lodash/has';
import flatMap from 'lodash/flatMap';
import Select, { components as defaultComponents } from 'react-select';
import Constraints from '@commercetools-uikit/constraints';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
} from '@commercetools-uikit/select-utils';
import {
  addStaticFields,
  SafeHTMLElement,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import createSelectStyles from '../../internals/create-select-styles';
import messages from '../../internals/messages/select';

const useTheme = () => useContext(ThemeContext);

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

const SelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);
  // Options can be grouped as
  //   const colourOptions = [{ value: 'green', label: 'Green' }];
  //   const flavourOptions = [{ value: 'vanilla', label: 'Vanilla' }];
  //   const groupedOptions = [
  //     { label: 'Colours', options: colourOptions },
  //     { label: 'Flavours', options: flavourOptions },
  //   ];
  // So we "ungroup" the options by merging them all into one list first.
  const optionsWithoutGroups = flatMap(props.options, (option) =>
    has(option, 'value') ? option : option.options
  );

  const selectedOptions = props.isMulti
    ? props.value
        // Pass the options in the order selected by the use, so that the
        // sorting is not lost
        .map((value) =>
          optionsWithoutGroups.find((option) => option.value === value)
        )
        .filter(Boolean)
    : optionsWithoutGroups.find(
        (option) => has(option, 'value') && option.value === props.value
      ) || null;

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <Select
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          autoFocus={props.isAutofocussed}
          backspaceRemovesValue={props.backspaceRemovesValue}
          components={{
            ...customizedComponents,
            ...props.components,
          }}
          styles={createSelectStyles(
            {
              hasWarning: props.hasWarning,
              hasError: props.hasError,
              showOptionGroupDivider: props.showOptionGroupDivider,
              menuPortalZIndex: props.menuPortalZIndex,
              isDisabled: props.isDisabled,
              isReadOnly: props.isReadOnly,
            },
            theme
          )}
          filterOption={props.filterOption}
          // react-select uses "id" (for the container) and "inputId" (for the input),
          // but we use "id" (for the input) and "containerId" (for the container)
          // instead.
          // This makes it easier to less confusing to use with <label />s.
          id={props.containerId}
          inputId={props.id}
          inputValue={props.inputValue}
          isClearable={props.isClearable}
          isDisabled={props.isDisabled || props.isReadOnly}
          isReadOnly={props.isReadOnly}
          isOptionDisabled={props.isOptionDisabled}
          isMulti={props.isMulti}
          isSearchable={props.isSearchable}
          maxMenuHeight={props.maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          name={props.name}
          noOptionsMessage={
            props.noOptionsMessage ||
            (({ inputValue }) =>
              inputValue === ''
                ? intl.formatMessage(messages.noOptionsMessageWithoutInputValue)
                : intl.formatMessage(messages.noOptionsMessageWithInputValue, {
                    inputValue,
                  }))
          }
          onBlur={
            typeof props.onBlur === 'function'
              ? () => {
                  const event = {
                    target: {
                      name: (() => {
                        if (!props.isMulti) return props.name;
                        // We append the ".0" to make Formik set the touched
                        // state as an array instead of a boolean only.
                        // Otherwise the shapes would clash on submission, as
                        // Formik will create an array on submission anyways.
                        return props.name ? `${props.name}.0` : undefined;
                      })(),
                    },
                    persist: () => {},
                  };
                  props.onBlur(event);
                }
              : undefined
          }
          onChange={(nextSelectedOptions) => {
            // nextSelectedOptions is either an array, or a single option, or null
            // depending on whether we're in multi-mode or not (isMulti)

            let value = null;

            if (props.isMulti) {
              if (nextSelectedOptions) {
                value = nextSelectedOptions.map((option) => option.value);
              } else {
                value = [];
              }
            } else if (nextSelectedOptions) {
              value = nextSelectedOptions.value;
            }

            props.onChange({
              target: {
                name: props.name,
                value,
              },
              persist: () => {},
            });
          }}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          options={props.options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={selectedOptions}
        />
      </div>
    </Constraints.Horizontal>
  );
};

SelectInput.displayName = 'SelectInput';

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
SelectInput.isTouched = (touched) => Boolean(touched);

SelectInput.defaultProps = {
  maxMenuHeight: 220,
  menuPortalZIndex: 1,
};

SelectInput.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  isReadOnly: PropTypes.bool,

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
  inputValue: PropTypes.string,
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

addStaticFields(SelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: SelectInput.isTouched,
});
export default SelectInput;
