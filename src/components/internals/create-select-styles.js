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
  fontSize: vars.fontSizeDefault,
  backgroundColor: state.isDisabled
    ? vars.backgroundColorInputDisabled
    : vars.backgroundColorInputPristine,
  borderColor: (() => {
    if (state.isDisabled) return vars.borderColorInputDisabled;
    if (props.hasError) return vars.borderColorInputError;
    if (props.hasWarning) return vars.borderColorInputWarning;
    if (state.isFocused) return vars.borderColorInputFocus;
    return vars.borderColorInputPristine;
  })(),
  borderRadius: vars.borderRadiusInput,
  minHeight: vars.sizeHeightInput,
  cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  padding: `0 ${vars.spacing8}`,
  boxShadow: state.isFocused ? 'none' : base.boxShadow,

  '&:hover': {
    borderColor: vars.borderColorInputFocus,
    boxShadow: 'none',
  },
  '&:active': {
    borderColor: vars.borderColorInputFocus,
    boxShadow: 'none',
  },
  '&:focus': {
    borderColor: vars.borderColorInputFocus,
    boxShadow: 'none',
  },

  pointerEvents: state.isDisabled ? 'none' : base.pointerEvents,
  color: state.isDisabled ? vars.fontColorDisabled : base.color,
});

const menuStyles = props => base => ({
  ...base,
  border: `1px ${vars.borderColorInputFocus} solid`,
  borderRadius: vars.borderRadiusInput,
  backgroundColor: vars.backgroundColorInputPristine,
  boxShadow: vars.shadow7,
  fontSize: vars.fontSizeDefault,
  margin: `${vars.spacing4} 0 0 0`,
  borderColor: (() => {
    if (props.hasError) return vars.borderColorInputError;
    if (props.hasWarning) return vars.borderColorInputWarning;
    return base.borderColor;
  })(),
});

const indicatorSeparatorStyles = () => base => ({
  ...base,
  display: 'none',
  margin: '0',
  padding: '0',
  marginLeft: vars.spacing4,
});

const dropdownIndicatorStyles = () => base => ({
  ...base,
  color: vars.fontColorDefault,
  margin: '0',
  padding: '0',
  marginLeft: vars.spacing4,
});

const clearIndicatorStyles = () => base => ({
  ...base,
  display: 'flex',
  padding: 0,
});

const menuListStyles = () => base => ({
  ...base,
  padding: '0',
  borderRadius: vars.borderRadiusInput,
  backgroundColor: vars.backgroundColorInputPristine,

  // this CSS is here to override the default scroll behaviour in Mac OSX
  // that hides the scrollbar unless you are scrolling.
  // it comes from here http://blog.0100.tv/2012/11/webkit-scrollbars-on-os-x/

  '&::-webkit-scrollbar': {
    width: '9px',
  },

  '&::-webkit-scrollbar-track': {
    '-webkit-border-radius': '5px',
    borderRadius: '5px',
  },

  '&::-webkit-scrollbar-thumb': {
    '-webkit-border-radius': '5px',
    borderRadius: '5px',
    background: 'rgba(0,0,0,0.2)',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0,0,0,0.4)',
  },

  '&::-webkit-scrollbar-thumb:window-inactive': {
    background: 'rgba(0,0,0,0.05)',
  },
});

const optionStyles = () => (base, state) => ({
  ...base,
  transition: vars.transitionStandard,
  paddingLeft: vars.spacing8,
  paddingRight: vars.spacing8,
  color: (() => {
    if (!state.isDisabled) return vars.fontSizeDefault;
    if (state.isSelected) return vars.fontColorDefault;
    return base.color;
  })(),
  backgroundColor: (() => {
    if (state.isSelected) return vars.backgroundColorInputSelected;
    if (state.isFocused) return vars.backgroundColorInputHover;
    return base.backgroundColor;
  })(),

  '&:active': {
    color: (() => {
      if (!state.isDisabled) return vars.fontColorDefault;
      return base.color;
    })(),
    backgroundColor: vars.backgroundColorInputSelected,
  },
});

const placeholderStyles = () => base => ({
  ...base,
  color: vars.fontColorPlaceholder,
});

const valueContainerStyles = () => base => ({
  ...base,
  padding: '0',
  backgroundColor: 'none',
  overflow: 'hidden',
});

const multiValueStyles = () => base => ({
  ...base,
  height: vars.sizeHeightTag,
  backgroundColor: vars.backgroundColorTagPristine,
  padding: '0',
});

const multiValueLabelStyles = () => (base, state) => ({
  ...base,
  fontSize: vars.fontSizeSmall,
  color: (() => {
    if (state.isDisabled) return vars.fontColorForInputWhenDisabled;
    return base.color;
  })(),
  padding: `${vars.spacing4} ${vars.spacing8}`,
  borderRadius: vars.borderRadiusTag,
  border: `1px ${vars.borderColorTagPristine} solid`,
});

const multiValueRemoveStyles = () => base => ({
  ...base,
  borderColor: vars.borderColorTagPristine,
  padding: `0 ${vars.spacing4}`,
  borderRadius: `0 ${vars.borderRadiusTag} ${vars.borderRadiusTag} 0`,
  borderStyle: 'solid',
  borderWidth: '1px 1px 1px 0',

  '&:hover': {
    backgroundColor: vars.backgroundColorTagNormalHover,
    boxShadow: vars.shadowBoxTagHover,
  },
});

const groupStyles = props => base => ({
  ...base,
  padding: 0,
  '&:not(:first-child)': {
    borderTop: props.showOptionGroupDivider
      ? `1px solid ${vars.colorGray}`
      : base.borderTop,
  },
});

const groupHeadingStyles = () => base => ({
  ...base,
  color: vars.fontColorReadonly,
  fontSize: vars.fontSizeSmall,
  textTransform: 'none',
  fontWeight: 'bold',
  margin: `0 ${vars.spacing4}`,
  padding: `${vars.spacing8} ${vars.spacing4} ${vars.spacing4}`,
  '&:empty': {
    padding: 0,
  },
});

const containerStyles = () => (base, state) => ({
  ...base,
  fontFamily: vars.fontFamilyDefault,
  minHeight: vars.sizeHeightInput,
  borderRadius: vars.borderRadiusInput,
  cursor: state.isDisabled ? 'not-allowed' : base.cursor,
  borderColor: state.isFocused ? vars.borderColorInputFocus : base.borderColor,

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
