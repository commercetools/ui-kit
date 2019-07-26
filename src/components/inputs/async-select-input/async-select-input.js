import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import { components as defaultComponents } from 'react-select';
import AsyncSelect from 'react-select/async';
import Constraints from '../../constraints';
import SafeHTMLElement from '../../../utils/helpers/safeHTMLElement';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import addStaticFields from '../../../utils/add-static-fields';
import ClearIndicator from '../../internals/clear-indicator';
import TagRemove from '../../internals/tag-remove';
import DropdownIndicator from '../../internals/dropdown-indicator';
import LoadingIndicator from '../../internals/loading-indicator';
import messages from './messages';
import createSelectStyles from '../../internals/create-select-styles';

const useTheme = () => useContext(ThemeContext);

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  LoadingIndicator,
  MultiValueRemove: TagRemove,
};

const AsyncSelectInput = props => {
  const theme = useTheme();
  const intl = useIntl();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <AsyncSelect
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
          isClearable={props.isClearable}
          isDisabled={props.isDisabled}
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
            props.onBlur
              ? () => {
                  const event = {
                    target: {
                      name: (() => {
                        if (!props.name) return undefined;
                        if (!props.isMulti) return props.name;
                        // We append the ".0" to make Formik set the touched
                        // state as an array instead of a boolean only.
                        // Otherwise the shapes would clash on submission, as
                        // Formik will create an array on submission anyways.
                        return `${props.name}.0`;
                      })(),
                    },
                    persist: () => {},
                  };
                  props.onBlur(event);
                }
              : undefined
          }
          onChange={(value, info) => {
            let newValue = value;
            if (props.isMulti && !newValue) {
              newValue = [];
            }

            props.onChange(
              {
                target: { name: props.name, value: newValue },
                persist: () => {},
              },
              info
            );
          }}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
          // Async react-select props
          defaultOptions={props.defaultOptions}
          loadOptions={props.loadOptions}
          cacheOptions={props.cacheOptions}
        />
      </div>
    </Constraints.Horizontal>
  );
};

// Formik will set the field to an array on submission, so we always have to
// deal with an array. The touched state ends up being an empty array in case
// values were removed only. So we have to treat any array we receive as
// a signal of the field having been touched.
AsyncSelectInput.isTouched = touched => Boolean(touched);

AsyncSelectInput.displayName = 'AsyncSelectInput';

AsyncSelectInput.defaultProps = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  isSearchable: true,
  menuPortalZIndex: 1,
};

AsyncSelectInput.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
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
  // renamed autoFocus of react-select
  isAutofocussed: PropTypes.bool,
  backspaceRemovesValue: PropTypes.bool,
  components: PropTypes.objectOf(PropTypes.func),
  filterOption: PropTypes.func,
  // This forwarded as react-select's "inputId"
  id: PropTypes.string,
  // inputValue: PropTypes.string,
  // This is forwarded as react-select's "id"
  containerId: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOptionDisabled: PropTypes.func,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  maxMenuHeight: PropTypes.number,
  menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
  menuPortalZIndex: PropTypes.number.isRequired,
  menuShouldBlockScroll: PropTypes.bool,
  name: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.string,
  tabSelectsValue: PropTypes.bool,
  value: (props, ...rest) =>
    props.isMulti
      ? PropTypes.arrayOf(
          PropTypes.shape({ value: PropTypes.string.isRequired })
        )(props, ...rest)
      : PropTypes.shape({ value: PropTypes.string.isRequired })(props, ...rest),

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
  showOptionGroupDivider: PropTypes.bool,
};

addStaticFields(AsyncSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: AsyncSelectInput.isTouched,
});

export default AsyncSelectInput;
