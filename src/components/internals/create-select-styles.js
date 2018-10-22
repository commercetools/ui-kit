/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/

import * as vars from '../../../materials/custom-properties.json';

const controlStyles = props => (base, state) => ({
  ...base,
  fontSize: vars['--token-font-size-default'],
  backgroundColor: state.isDisabled
    ? vars['--token-background-color-input-disabled']
    : vars['--token-background-color-input-pristine'],
  borderColor: do {
    if (state.isDisabled) vars['--token-border-color-input-disabled'];
    else if (props.hasError) vars['--token-border-color-input-error'];
    else if (props.hasWarning) vars['--token-border-color-input-warning'];
    else if (state.isFocused) vars['--token-border-color-input-focus'];
    else vars['--token-border-color-input-pristine'];
  },
  borderRadius: vars['--token-border-radius-input'],
  minHeight: vars['--token-size-height-input'],
  cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  padding: `0 ${vars['--spacing-8']}`,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,

  '&:hover': {
    borderColor: vars['--token-border-color-input-focus'],
    boxShadow: 'none',
  },
  '&:active': {
    borderColor: vars['--token-border-color-input-focus'],
    boxShadow: 'none',
  },
  '&:focus': {
    borderColor: vars['--token-border-color-input-focus'],
    boxShadow: 'none',
  },

  pointerEvents: state.isDisabled ? 'none' : base.pointerEvents,
  color: state.isDisabled ? vars['--token-font-color-disabled'] : base.color,
});

const menuStyles = props => base => ({
  ...base,
  border: `1px ${vars['--token-border-color-input-focus']} solid`,
  borderRadius: vars['--token-border-radius-input'],
  backgroundColor: vars['--token-background-color-input-pristine'],
  boxShadow: `${vars['--shadow-7-first']} ${vars['--shadow-7-second']}`,
  margin: `${vars['--spacing-4']} 0 0 0`,
  borderColor: do {
    if (props.hasError) vars['--token-border-color-input-error'];
    else if (props.hasWarning) vars['--token-border-color-input-warning'];
    else base.borderColor;
  },
});

const indicatorSeparatorStyles = () => base => ({
  ...base,
  display: 'none',
  margin: '0',
  padding: '0',
  marginLeft: vars['--spacing-4'],
});

const dropdownIndicatorStyles = () => base => ({
  ...base,
  color: vars['--token-font-color-default'],
  marginRight: vars['--spacing-8'],
  margin: '0',
  padding: '0',
  marginLeft: vars['--spacing-4'],
});

const clearIndicatorStyles = () => base => ({
  ...base,
  display: 'flex',
});

const menuListStyles = () => base => ({
  ...base,
  padding: '0',
  borderRadius: vars['--token-border-radius-input'],
  backgroundColor: vars['--token-background-color-input-pristine'],
});

const optionStyles = () => (base, state) => ({
  ...base,
  transition: '--transition-standard',
  paddingLeft: vars['--spacing-8'],
  paddingRight: vars['--spacing-8'],
  color: do {
    if (!state.isDisabled) vars['--token-font-size-default'];
    else if (state.isSelected) vars['--token-font-color-default'];
    else base.color;
  },
  backgroundColor: do {
    if (state.isSelected) vars['--token-background-color-input-selected'];
    else if (state.isFocused) vars['--token-background-color-input-hover'];
    else base.backgroundColor;
  },

  '&:active': {
    color: do {
      if (!state.isDisabled) vars['--token-font-color-default'];
      else base.color;
    },
    backgroundColor: vars['--token-background-color-input-selected'],
  },
});

const placeholderStyles = () => base => ({
  ...base,
  color: vars['--token-font-color-placeholder'],
});

const valueContainerStyles = () => base => ({
  ...base,
  padding: '0',
  backgroundColor: 'none',
  overflow: 'hidden',
});

const multiValueStyles = () => base => ({
  ...base,
  height: vars['--token-size-height-tag'],
  backgroundColor: vars['--token-background-color-tag-pristine'],
  padding: '0',
});

const multiValueLabelStyles = () => base => ({
  ...base,
  fontSize: vars['--token-font-size-small'],
  padding: `${vars['--spacing-4']} ${vars['--spacing-8']}`,
  borderRadius: vars['--token-border-radius-tag'],
  border: `1px ${vars['--token-border-color-tag-pristine']} solid`,
});

const multiValueRemoveStyles = () => base => ({
  ...base,
  borderColor: vars['--token-border-color-tag-pristine'],
  padding: `0 ${vars['--spacing-4']}`,
  borderRadius: `0 ${vars['--token-border-radius-tag']} ${
    vars['--token-border-radius-tag']
  } 0`,
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0',

  '&:hover': {
    backgroundColor: vars['--token-background-color-tag-normal-hover'],
    boxShadow: vars['--token-shadow-box-tag-hover'],
  },
});

const groupStyles = () => base => ({
  ...base,
  padding: 0,
  '&:not(:first-child)': {
    borderTop: `1px ${vars['--token-border-color-separator']} solid`,
  },
});

const groupHeadingStyles = () => base => ({
  ...base,
  color: vars['--token-font-color-readonly'],
  fontSize: vars['--token-font-size-small'],
  textTransform: 'none',
  fontWeight: 'bold',
  margin: `0 ${vars['--spacing-4']}`,
  padding: `${vars['--spacing-8']} ${vars['--spacing-4']} ${
    vars['--spacing-4']
  }`,
});

const containerStyles = () => (base, state) => ({
  ...base,
  minHeight: vars['--token-size-height-input'],
  borderRadius: vars['--token-border-radius-input'],
  cursor: state.isDisabled ? 'not-allowed' : base.cursor,
  borderColor: state.isFocused
    ? vars['--token-border-color-input-focus']
    : base.borderColor,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,
});

const indicatorsContainerStyles = () => () => ({
  background: 'none',
});

export default props => ({
  control: controlStyles(props),
  menu: menuStyles(props),
  indicatorSeparator: indicatorSeparatorStyles(props),
  dropdownIndicator: dropdownIndicatorStyles(props),
  clearIndicator: clearIndicatorStyles(props),
  menuList: menuListStyles(props),
  indicatorsContainer: indicatorsContainerStyles(props),
  option: optionStyles(props),
  placeholder: placeholderStyles(props),
  valueContainer: valueContainerStyles(props),
  multiValue: multiValueStyles(props),
  multiValueLabel: multiValueLabelStyles(props),
  multiValueRemove: multiValueRemoveStyles(props),
  group: groupStyles(props),
  groupHeading: groupHeadingStyles(props),
  container: containerStyles(props),
});
