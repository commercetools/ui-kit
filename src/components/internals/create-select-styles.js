/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/

import vars from '../../../materials/custom-properties';
import designTokens from '../../../materials/design-tokens';

const controlStyles = (props, theme) => (base, state) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    fontSize: overwrittenVars[designTokens.fontSizeForInput],
    backgroundColor: state.isDisabled
      ? overwrittenVars[designTokens.backgroundColorForInputWhenDisabled]
      : overwrittenVars[designTokens.backgroundColorForInput],
    borderColor: (() => {
      if (state.isDisabled)
        return overwrittenVars[designTokens.borderColorForInputWhenDisabled];
      if (props.hasError)
        return overwrittenVars[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return overwrittenVars[designTokens.borderColorForInputWhenWarning];
      if (state.isFocused)
        return overwrittenVars[designTokens.borderColorForInputWhenFocused];
      return overwrittenVars[designTokens.borderColorForInput];
    })(),
    borderRadius: overwrittenVars[designTokens.borderRadiusForInput],
    minHeight: overwrittenVars.sizeHeightInput,
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    padding: `0 ${overwrittenVars.spacingS}`,

    boxShadow: state.isFocused ? 'none' : base.boxShadow,

    '&:hover': {
      borderColor: state.isDisabled
        ? overwrittenVars[designTokens.borderColorForInputWhenDisabled]
        : overwrittenVars[designTokens.borderColorForInputWhenFocused],
      boxShadow: 'none',
    },
    '&:active': {
      borderColor: state.isDisabled
        ? overwrittenVars[designTokens.borderColorForInputWhenDisabled]
        : overwrittenVars[designTokens.borderColorForInputWhenFocused],
      boxShadow: 'none',
    },
    '&:focus': {
      borderColor: state.isDisabled
        ? overwrittenVars[designTokens.borderColorForInputWhenDisabled]
        : overwrittenVars[designTokens.borderColorForInputWhenFocused],
      boxShadow: 'none',
    },
    pointerEvents: 'all',
    color: state.isDisabled
      ? overwrittenVars[designTokens.fontColorForInputWhenDisabled]
      : base.fontColorForInput,
  };
};

const menuStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    border: `1px ${
      overwrittenVars[designTokens.borderColorForInputWhenFocused]
    } solid`,
    borderRadius: overwrittenVars[designTokens.borderRadiusForInput],
    backgroundColor: overwrittenVars[designTokens.backgroundColorForInput],
    boxShadow: overwrittenVars.shadow7,
    fontSize: overwrittenVars[designTokens.fontSizeForInput],
    fontFamily: overwrittenVars.fontFamilyDefault,
    margin: `${overwrittenVars.spacingXs} 0 0 0`,
    borderColor: (() => {
      if (props.hasError)
        return overwrittenVars[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return overwrittenVars[designTokens.borderColorForInputWhenWarning];
      return base.borderColorForInput;
    })(),
  };
};

const indicatorSeparatorStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    display: 'none',
    margin: '0',
    padding: '0',
    marginLeft: overwrittenVars.spacingXs,
  };
};

const dropdownIndicatorStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    color: overwrittenVars[designTokens.fontColorForInput],
    margin: '0',
    padding: '0',
    marginLeft: overwrittenVars.spacingXs,
  };
};

const clearIndicatorStyles = () => base => ({
  ...base,
  display: 'flex',
  padding: 0,
});

const menuListStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    padding: '0',
    borderRadius: overwrittenVars[designTokens.borderRadiusForInput],
    backgroundColor: overwrittenVars[designTokens.backgroundColorForInput],
  };
};

const optionStyles = (props, theme) => (base, state) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    transition: overwrittenVars.transitionStandard,
    paddingLeft: overwrittenVars.spacingS,
    paddingRight: overwrittenVars.spacingS,
    color: (() => {
      if (!state.isDisabled)
        return overwrittenVars[designTokens.fontColorForInput];
      if (state.isSelected)
        return overwrittenVars[designTokens.fontColorForInput];
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected)
        return overwrittenVars[
          designTokens.backgroundColorForInputWhenSelected
        ];
      if (state.isFocused)
        return overwrittenVars[designTokens.backgroundColorForInputWhenHovered];
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled)
          return overwrittenVars[designTokens.fontColorForInput];
        return base.color;
      })(),
      backgroundColor:
        overwrittenVars[designTokens.backgroundColorForInputWhenSelected],
    },
  };
};

const placeholderStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    color: overwrittenVars[designTokens.placeholderFontColorForInput],
  };
};

const valueContainerStyles = () => base => ({
  ...base,
  padding: '0',
  backgroundColor: 'none',
  overflow: 'hidden',
});

const singleValueStyles = (props, theme) => (base, state) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    color: (() => {
      if (state.isDisabled) {
        return overwrittenVars[designTokens.fontColorForInputWhenDisabled];
      }
      return overwrittenVars[designTokens.fontColorForInput];
    })(),
  };
};

const groupStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    padding: 0,
    '&:not(:first-of-type)': {
      borderTop: props.showOptionGroupDivider
        ? `1px solid ${overwrittenVars.colorNeutral}`
        : base.borderTop,
    },
  };
};

const groupHeadingStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    color: overwrittenVars[designTokens.fontColorForInputWhenReadonly],
    fontSize: overwrittenVars.fontSizeSmall,
    textTransform: 'none',
    fontWeight: 'bold',
    margin: `0 ${overwrittenVars.spacingXs}`,
    padding: `${overwrittenVars.spacingS} ${overwrittenVars.spacingXs}`,
    '&:empty': {
      padding: 0,
    },
  };
};

const containerStyles = (props, theme) => (base, state) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    fontFamily: overwrittenVars.fontFamilyDefault,
    minHeight: overwrittenVars.sizeHeightInput,
    borderRadius: overwrittenVars[designTokens.borderRadiusForInput],
    cursor: state.isDisabled ? 'not-allowed' : base.cursor,
    borderColor: state.isFocused
      ? overwrittenVars[designTokens.borderColorForInputWhenFocused]
      : base.borderColor,

    boxShadow: state.isFocused ? 'none' : base.boxShadow,
  };
};

const indicatorsContainerStyles = () => () => ({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
});

const menuPortalStyles = props => base => ({
  ...base,
  zIndex: props.menuPortalZIndex,
});

const multiValueStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    height: vars.sizeHeightTag,
    backgroundColor: overwrittenVars[designTokens.backgroundColorForTag],
    padding: '0',
  };
};

const multiValueLabelStyles = (props, theme) => (base, state) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    fontSize: vars.fontSizeSmall,
    color: (() => {
      if (state.isDisabled)
        return overwrittenVars[designTokens.fontColorForInputWhenDisabled];
      return base.color;
    })(),
    padding: `${overwrittenVars.spacingXs} ${overwrittenVars.spacingS}`,
    borderRadius: `${overwrittenVars.borderRadiusForTag} 0 0 ${overwrittenVars.borderRadiusForTag}`,
    border: `1px ${overwrittenVars[designTokens.borderColorForTag]} solid`,
    borderWidth: '1px 0 1px 1px',
  };
};

const multiValueRemoveStyles = (props, theme) => base => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return {
    ...base,
    borderColor: overwrittenVars[designTokens.borderColorForTag],
    padding: `0 ${overwrittenVars.spacingXs}`,
    borderRadius: `0 ${overwrittenVars[designTokens.borderRadiusForTag]} ${
      overwrittenVars[designTokens.borderRadiusForTag]
    } 0`,
    borderStyle: 'solid',
    borderWidth: '1px',

    '&:hover': {
      borderColor: overwrittenVars.borderColorForTagWarning,
      backgroundColor: overwrittenVars[designTokens.backgroundColorForTag],

      'svg *': {
        fill: overwrittenVars[designTokens.borderColorForTagWarning],
      },
    },
  };
};

export default (props, theme) => ({
  control: controlStyles(props, theme),
  menu: menuStyles(props, theme),
  indicatorSeparator: indicatorSeparatorStyles(props, theme),
  dropdownIndicator: dropdownIndicatorStyles(props, theme),
  clearIndicator: clearIndicatorStyles(props, theme),
  menuList: menuListStyles(props, theme),
  menuPortal: menuPortalStyles(props, theme),
  multiValue: multiValueStyles(props, theme),
  multiValueLabel: multiValueLabelStyles(props, theme),
  multiValueRemove: multiValueRemoveStyles(props, theme),
  indicatorsContainer: indicatorsContainerStyles(props, theme),
  option: optionStyles(props, theme),
  placeholder: placeholderStyles(props, theme),
  valueContainer: valueContainerStyles(props, theme),
  singleValue: singleValueStyles(props, theme),
  group: groupStyles(props, theme),
  groupHeading: groupHeadingStyles(props, theme),
  container: containerStyles(props, theme),
});
