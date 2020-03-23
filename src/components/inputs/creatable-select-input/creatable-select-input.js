import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import { components as defaultComponents } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
} from '@commercetools-uikit/select-utils';
import createSelectStyles from '../../internals/create-select-styles';
import SafeHTMLElement from '../../../utils/helpers/safeHTMLElement';
import addStaticFields from '../../../utils/add-static-fields';
import messages from '../../internals/messages/select';

const useTheme = () => useContext(ThemeContext);

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

const CreatableSelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <CreatableSelect
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
          onChange={(value, info) => {
            // selectedOptions is either an array, or a single option, or null
            // depending on whether we're in multi-mode or not (isMulti)

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
          options={props.options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
          // Creatable props
          allowCreateWhileLoading={props.allowCreateWhileLoading}
          formatCreateLabel={
            props.formatCreateLabel ||
            ((inputValue) =>
              intl.formatMessage(messages.createLabel, {
                inputValue,
              }))
          }
          isValidNewOption={props.isValidNewOption}
          getNewOptionData={props.getNewOptionData}
          onCreateOption={props.onCreateOption}
          createOptionPosition={props.createOptionPosition}
        />
      </div>
    </Constraints.Horizontal>
  );
};

CreatableSelectInput.displayName = 'CreatableSelectInput';

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
CreatableSelectInput.isTouched = (touched) => Boolean(touched);

CreatableSelectInput.propTypes = {
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
  components: PropTypes.objectOf(PropTypes.func),
  filterOption: PropTypes.func,
  // This forwarded as react-select's "inputId"
  id: PropTypes.string,
  // This is forwarded as react-select's "id"
  inputValue: PropTypes.string,
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
      : PropTypes.shape({ value: PropTypes.string.isRequired })(props, ...rest),

  // Creatable props
  allowCreateWhileLoading: PropTypes.bool,
  formatCreateLabel: PropTypes.func,
  isValidNewOption: PropTypes.func,
  getNewOptionData: PropTypes.func,
  onCreateOption: PropTypes.func,
  createOptionPosition: PropTypes.string,
};

CreatableSelectInput.defaultProps = {
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

addStaticFields(CreatableSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: CreatableSelectInput.isTouched,
});

export default CreatableSelectInput;
