/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/

import vars from '../../../materials/custom-properties.json';

const controlStyles = props => (base, state) => ({
  ...base,
  fontSize: vars['--font-size-default'],
  backgroundColor: state.isDisabled
    ? vars['--background-color-input-disabled']
    : vars['--background-color-input-pristine'],
  borderColor: (() => {
    if (state.isDisabled) return vars['--border-color-input-disabled'];
    if (props.hasError) return vars['--border-color-input-error'];
    if (props.hasWarning) return vars['--border-color-input-warning'];
    if (state.isFocused) return vars['--border-color-input-focus'];
    return vars['--border-color-input-pristine'];
  })(),
  borderRadius: vars['--border-radius-input'],
  minHeight: vars['--size-height-input'],
  cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  padding: `0 ${vars['--spacing-8']}`,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,

  '&:hover': {
    borderColor: vars['--border-color-input-focus'],
    boxShadow: 'none',
  },
  '&:active': {
    borderColor: vars['--border-color-input-focus'],
    boxShadow: 'none',
  },
  '&:focus': {
    borderColor: vars['--border-color-input-focus'],
    boxShadow: 'none',
  },

  pointerEvents: state.isDisabled ? 'none' : base.pointerEvents,
  color: state.isDisabled ? vars['--font-color-disabled'] : base.color,
});

const menuStyles = props => base => ({
  ...base,
  border: `1px ${vars['--border-color-input-focus']} solid`,
  borderRadius: vars['--border-radius-input'],
  backgroundColor: vars['--background-color-input-pristine'],
  boxShadow: vars['--shadow-7'],
  fontSize: vars['--font-size-default'],
  margin: `${vars['--spacing-4']} 0 0 0`,
  borderColor: (() => {
    if (props.hasError) return vars['--border-color-input-error'];
    if (props.hasWarning) return vars['--border-color-input-warning'];
    return base.borderColor;
  })(),
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
  color: vars['--font-color-default'],
  margin: '0',
  padding: '0',
  marginLeft: vars['--spacing-4'],
});

const clearIndicatorStyles = () => base => ({
  ...base,
  display: 'flex',
  padding: 0,
});

const menuListStyles = () => base => ({
  ...base,
  padding: '0',
  borderRadius: vars['--border-radius-input'],
  backgroundColor: vars['--background-color-input-pristine'],
});

const optionStyles = () => (base, state) => ({
  ...base,
  transition: vars['--transition-standard'],
  paddingLeft: vars['--spacing-8'],
  paddingRight: vars['--spacing-8'],
  color: (() => {
    if (!state.isDisabled) return vars['--font-size-default'];
    if (state.isSelected) return vars['--font-color-default'];
    return base.color;
  })(),
  backgroundColor: (() => {
    if (state.isSelected) return vars['--background-color-input-selected'];
    if (state.isFocused) return vars['--background-color-input-hover'];
    return base.backgroundColor;
  })(),

  '&:active': {
    color: (() => {
      if (!state.isDisabled) return vars['--font-color-default'];
      return base.color;
    })(),
    backgroundColor: vars['--background-color-input-selected'],
  },
});

const placeholderStyles = () => base => ({
  ...base,
  color: vars['--font-color-placeholder'],
});

const valueContainerStyles = () => base => ({
  ...base,
  padding: '0',
  backgroundColor: 'none',
  overflow: 'hidden',
});

const multiValueStyles = () => base => ({
  ...base,
  height: vars['--size-height-tag'],
  backgroundColor: vars['--background-color-tag-pristine'],
  padding: '0',
});

const multiValueLabelStyles = () => base => ({
  ...base,
  fontSize: vars['--font-size-small'],
  padding: `${vars['--spacing-4']} ${vars['--spacing-8']}`,
  borderRadius: vars['--border-radius-tag'],
  border: `1px ${vars['--border-color-tag-pristine']} solid`,
});

const multiValueRemoveStyles = () => base => ({
  ...base,
  borderColor: vars['--border-color-tag-pristine'],
  padding: `0 ${vars['--spacing-4']}`,
  borderRadius: `0 ${vars['--border-radius-tag']} ${
    vars['--border-radius-tag']
  } 0`,
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0',

  '&:hover': {
    backgroundColor: vars['--background-color-tag-normal-hover'],
    boxShadow: vars['--shadow-box-tag-hover'],
  },
});

const groupStyles = () => base => ({
  ...base,
  padding: 0,
  '&:not(:firstChild)': {
    borderTop: `1px ${vars['--border-color-separator']} solid`,
  },
});

const groupHeadingStyles = () => base => ({
  ...base,
  color: vars['--font-color-readonly'],
  fontSize: vars['--font-size-small'],
  textTransform: 'none',
  fontWeight: 'bold',
  margin: `0 ${vars['--spacing-4']}`,
  padding: `${vars['--spacing-8']} ${vars['--spacing-4']} ${
    vars['--spacing-4']
  }`,
});

const containerStyles = () => (base, state) => ({
  ...base,
  fontFamily: vars['--font-family-default'],
  minHeight: vars['--size-height-input'],
  borderRadius: vars['--border-radius-input'],
  cursor: state.isDisabled ? 'not-allowed' : base.cursor,
  borderColor: state.isFocused
    ? vars['--border-color-input-focus']
    : base.borderColor,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,
});

const indicatorsContainerStyles = () => () => ({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
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
