/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/

import vars from '../../../materials/custom-properties';

const controlStyles = props => (base, state) => ({
  ...base,
  fontSize: vars.fontSizeForInput,
  backgroundColor: state.isDisabled
    ? vars.backgroundColorForInputWhenDisabled
    : vars.backgroundColorForInput,
  borderColor: (() => {
    if (state.isDisabled) return vars.borderColorForInputWhenDisabled;
    if (props.hasError) return vars.borderColorForInputWhenError;
    if (props.hasWarning) return vars.borderColorForInputWhenWarning;
    if (state.isFocused) return vars.borderColorForInputWhenFocused;
    return vars.borderColorForInput;
  })(),
  borderRadius: vars.borderRadiusForInput,
  minHeight: vars.sizeHeightInput,
  cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  padding: `0 ${vars.spacingS}`,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,

  '&:hover': {
    borderColor: vars.borderColorForInputWhenFocused,
    boxShadow: 'none',
  },
  '&:active': {
    borderColor: vars.borderColorForInputWhenFocused,
    boxShadow: 'none',
  },
  '&:focus': {
    borderColor: vars.borderColorForInputWhenFocused,
    boxShadow: 'none',
  },

  pointerEvents: state.isDisabled ? 'none' : base.pointerEvents,
  color: state.isDisabled
    ? vars.fontColorForInputWhenDisabled
    : base.fontColorForInput,
});

const menuStyles = props => base => ({
  ...base,
  border: `1px ${vars.borderColorForInputWhenFocused} solid`,
  borderRadius: vars.borderRadiusForInput,
  backgroundColor: vars.backgroundColorForInput,
  boxShadow: vars.shadow7,
  fontSize: vars.fontSizeForInput,
  margin: `${vars.spacingXs} 0 0 0`,
  borderColor: (() => {
    if (props.hasError) return vars.borderColorForInputWhenError;
    if (props.hasWarning) return vars.borderColorForInputWhenWarning;
    return base.borderColorForInput;
  })(),
});

const indicatorSeparatorStyles = () => base => ({
  ...base,
  display: 'none',
  margin: '0',
  padding: '0',
  marginLeft: vars.spacingXs,
});

const dropdownIndicatorStyles = () => base => ({
  ...base,
  color: vars.fontColorForInput,
  margin: '0',
  padding: '0',
  marginLeft: vars.spacingXs,
});

const clearIndicatorStyles = () => base => ({
  ...base,
  display: 'flex',
  padding: 0,
});

const menuListStyles = () => base => ({
  ...base,
  padding: '0',
  borderRadius: vars.borderRadiusForInput,
  backgroundColor: vars.backgroundColorForInput,
});

const optionStyles = () => (base, state) => ({
  ...base,
  transition: vars.transitionStandard,
  paddingLeft: vars.spacingS,
  paddingRight: vars.spacingS,
  color: (() => {
    if (!state.isDisabled) return vars.fontColorForInput;
    if (state.isSelected) return vars.fontColorForInput;
    return base.color;
  })(),
  backgroundColor: (() => {
    if (state.isSelected) return vars.backgroundColorForInputWhenSelected;
    if (state.isFocused) return vars.backgroundColorForInputWhenHovered;
    return base.backgroundColor;
  })(),

  '&:active': {
    color: (() => {
      if (!state.isDisabled) return vars.fontColorForInput;
      return base.color;
    })(),
    backgroundColor: vars.backgroundColorForInputWhenSelected,
  },
});

const placeholderStyles = () => base => ({
  ...base,
  color: vars.placeholderFontColorForInput,
});

const valueContainerStyles = () => base => ({
  ...base,
  padding: '0',
  backgroundColor: 'none',
  overflow: 'hidden',
});

const groupStyles = props => base => ({
  ...base,
  padding: 0,
  '&:not(:first-child)': {
    borderTop: props.showOptionGroupDivider
      ? `1px solid ${vars.colorNeutral}`
      : base.borderTop,
  },
});

const groupHeadingStyles = () => base => ({
  ...base,
  color: vars.fontColorForInputWhenReadonly,
  fontSize: vars.fontSizeSmall,
  textTransform: 'none',
  fontWeight: 'bold',
  margin: `0 ${vars.spacingXs}`,
  padding: `${vars.spacingS} ${vars.spacingXs}`,
  '&:empty': {
    padding: 0,
  },
});

const containerStyles = () => (base, state) => ({
  ...base,
  fontFamily: vars.fontFamilyDefault,
  minHeight: vars.sizeHeightInput,
  borderRadius: vars.borderRadiusForInput,
  cursor: state.isDisabled ? 'not-allowed' : base.cursor,
  borderColor: state.isFocused
    ? vars.borderColorForInputWhenFocused
    : base.borderColor,

  boxShadow: state.isFocused ? 'none' : base.boxShadow,
});

const indicatorsContainerStyles = () => () => ({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
});

const menuPortalStyles = props => base => ({
  ...base,
  zIndex: props.menuPortalZIndex,
});

export default props => ({
  control: controlStyles(props),
  menu: menuStyles(props),
  indicatorSeparator: indicatorSeparatorStyles(props),
  dropdownIndicator: dropdownIndicatorStyles(props),
  clearIndicator: clearIndicatorStyles(props),
  menuList: menuListStyles(props),
  menuPortal: menuPortalStyles(props),
  indicatorsContainer: indicatorsContainerStyles(props),
  option: optionStyles(props),
  placeholder: placeholderStyles(props),
  valueContainer: valueContainerStyles(props),
  group: groupStyles(props),
  groupHeading: groupHeadingStyles(props),
  container: containerStyles(props),
});
