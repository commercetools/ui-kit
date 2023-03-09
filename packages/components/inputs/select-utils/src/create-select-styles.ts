// TODO: @redesign cleanup
/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/
import { ReactNode } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';

type TProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  showOptionGroupDivider?: boolean;
  menuPortalZIndex?: number;
  iconLeft?: ReactNode;
  isMulti?: boolean;
  hasValue?: boolean;
};

type TBase = {
  fontColorForInput?: string;
  borderColorForInput?: string;
  color?: string;
  backgroundColor?: string;
  borderTop?: string;
  borderColor?: string;
  boxShadow?: string;
  pointerEvents?: string;
};

type TState = {
  isFocused?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
};

const getControlBorderColor = (props: TProps, defaultColor: string) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForSelectInputWhenReadonly;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  return defaultColor;
};

const controlStyles = (props: TProps) => (base: TBase, state: TState) => {
  return {
    ...base,
    fontSize: designTokens.fontSizeForInput,
    backgroundColor: (() => {
      if (props.isDisabled)
        return designTokens.backgroundColorForInputWhenDisabled;
      if (props.isReadOnly)
        return designTokens.backgroundColorForInputWhenReadonly;
      return designTokens.backgroundColorForInput;
    })(),
    borderColor: (() => {
      if (props.isDisabled) return designTokens.borderColorForInputWhenDisabled;
      if (props.isReadOnly)
        return designTokens.borderColorForSelectInputWhenReadonly;
      if (state.isFocused) return designTokens.borderColorForInputWhenFocused;
      if (props.hasError) return designTokens.borderColorForInputWhenError;
      if (props.hasWarning) return designTokens.borderColorForInputWhenWarning;
      return designTokens.borderColorForInput;
    })(),
    borderWidth: (() => {
      if (props.hasWarning || props.hasError)
        return designTokens.borderWidthForSelectInput;
      return designTokens.borderWidth1;
    })(),
    borderRadius: designTokens.borderRadiusForInput,
    minHeight: designTokens.heightForInput,
    cursor: (() => {
      if (props.isDisabled) return 'not-allowed';
      if (props.isReadOnly) return 'default';
      return 'pointer';
    })(),
    padding: `0 ${designTokens.paddingForInput}`,
    transition: `border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard}`,
    outline: 0,
    boxShadow: 'none',

    '&:focus-within': {
      boxShadow: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return `${designTokens.boxShadowForSelectInputWhenFocused} ${designTokens.borderColorForInputWhenFocused}`;
        return null;
      })(),
      borderColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return designTokens.borderColorForInputWhenFocused;
        return null;
      })(),
    },

    '&:hover': {
      borderColor: getControlBorderColor(
        props,
        designTokens.borderColorForInputWhenHovered
      ),
      backgroundColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return designTokens.backgroundColorForInputWhenHovered;
        return null;
      })(),
    },
    pointerEvents: 'auto',
    color:
      props.isDisabled || props.isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : base.fontColorForInput,
  };
};

const menuStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    border: `1px solid ${designTokens.borderColorForSelectInputMenu}`,
    borderRadius: designTokens.borderRadiusForInput,
    backgroundColor: designTokens.backgroundColorForInput,
    boxShadow: designTokens.shadowForSelectInputMenu,
    fontSize: designTokens.fontSizeForInput,
    fontFamily: 'inherit',
    margin: `${designTokens.spacing10} 0 0 0`,
    borderColor: (() => {
      if (props.hasError)
        return designTokens.borderColorForSelectInputMenuWhenError;
      if (props.hasWarning)
        return designTokens.borderColorForSelectInputMenuWhenWarning;
      return base.borderColorForInput;
    })(),
  };
};

const indicatorSeparatorStyles = () => (base: TBase) => {
  return {
    ...base,
    display: 'none',
    margin: '0',
    padding: '0',
    marginLeft: designTokens.spacing10,
  };
};

const dropdownIndicatorStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: designTokens.fontColorForInput,
    margin: '0',
    padding: '0',
    marginLeft: designTokens.marginForSelectInputIcon,
    fill: (() => {
      if (props.isDisabled || props.isReadOnly)
        return designTokens.fontColorForInputWhenDisabled;
      if (props.hasError)
        return designTokens.fontColorForSelectInputIconWhenError;
      if (props.hasWarning)
        return designTokens.fontColorForSelectInputIconWhenWarning;
      return designTokens.fontColorForSelectInputIcon;
    })(),
  };
};

const clearIndicatorStyles = () => (base: TBase) => ({
  ...base,
  display: 'flex',
  padding: 0,
  marginLeft: designTokens.marginForSelectInputIcon,
});

const menuListStyles = () => (base: TBase) => {
  return {
    ...base,
    padding: designTokens.paddingForSelectInputMenu,
    borderRadius: designTokens.borderRadiusForInput,
    backgroundColor: designTokens.backgroundColorForInput,
  };
};

const optionStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    transition: `border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard}`,
    paddingLeft: designTokens.paddingLeftForSelectInputOptions,
    paddingRight: designTokens.paddingRightForSelectInputOptions,
    paddingTop: designTokens.paddingTopForSelectInputOptions,
    paddingBottom: designTokens.paddingBottomForSelectInputOptions,
    color: (() => {
      if (!state.isDisabled) return designTokens.fontColorForInput;
      if (state.isSelected) return designTokens.fontColorForInput;
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected)
        return designTokens.backgroundColorForInputWhenSelected;
      if (state.isFocused)
        return designTokens.backgroundColorForSelectInputOptionWhenHovered;
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled) return designTokens.fontColorForInput;
        return base.color;
      })(),
      backgroundColor: designTokens.backgroundColorForInputWhenActive,
    },
  };
};

const placeholderStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: (() => {
      return designTokens.placeholderFontColorForInput;
    })(),
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fill:
      props.isDisabled || props.isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : base.fontColorForInput,
  };
};

const valueContainerStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    padding: '0',
    backgroundColor: 'none',
    overflow: 'hidden',
    // Display property should be grid when isMulti and has no value so the Placeholder component is positioned correctly with the Input
    // Display property should be Flex when there is an iconLeft, also when the input has some values when isMulti.
    // See PR from react select for more insight https://github.com/JedWatson/react-select/pull/4833
    display:
      (props.iconLeft && !props.isMulti) || (props.isMulti && props.hasValue)
        ? 'flex'
        : 'grid',
    fill:
      props.isDisabled || props.isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : designTokens.fontColorForSelectInputIcon,
  };
};

const singleValueStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: (() => {
      if (props.isDisabled) {
        return designTokens.fontColorForInputWhenDisabled;
      }
      if (props.isReadOnly) {
        return designTokens.fontColorForInputWhenReadonly;
      }
      if (props.hasError) return designTokens.fontColorForSelectInputWhenError;
      if (props.hasWarning)
        return designTokens.fontColorForSelectInputWhenWarning;
      return designTokens.fontColorForInput;
    })(),
  };
};

const groupStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    padding: 0,
    '&:not(:first-of-type)': {
      borderTop: props.showOptionGroupDivider
        ? `1px solid ${designTokens.borderColorForGroupHeadingSelectInputOptions}`
        : base.borderTop,
    },
  };
};

const groupHeadingStyles = () => (base: TBase) => {
  return {
    ...base,
    color: designTokens.fontColorForInputWhenReadonly,
    fontSize: designTokens.fontSizeSmall,
    textTransform: 'none',
    fontWeight: 'bold',
    padding: `${designTokens.spacing20} ${designTokens.paddingForGroupHeadingSelectInputOptions}`,
    '&:empty': {
      padding: 0,
    },
  };
};

const containerStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    fontFamily: 'inherit',
    minHeight: designTokens.sizeHeightInput,
    borderRadius: designTokens.borderRadiusForInput,
    borderColor: state.isFocused
      ? designTokens.borderColorForInputWhenFocused
      : base.borderColor,

    boxShadow: state.isFocused ? 'none' : base.boxShadow,
  };
};

const indicatorsContainerStyles = () => () => ({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
});

const menuPortalStyles = (props: TProps) => (base: TBase) => ({
  ...base,
  zIndex: props.menuPortalZIndex,
});

const multiValueStyles = () => (base: TBase) => {
  return {
    ...base,
    display: 'flex',
    alignItems: designTokens.alignItemsForSelectInputTag,
    height: designTokens.heightForSelectInputTag,
    backgroundColor: designTokens.backgroundColorForTag,
    padding: '0',
    border: designTokens.borderForSelectInputTag,
  };
};

const multiValueLabelStyles =
  (props: TProps & { isNewTheme: boolean }) => (base: TBase) => {
    return {
      ...base,
      fontSize: designTokens.fontSizeForSelectInputTag,
      color: (() => {
        if (props.isDisabled) return designTokens.fontColorForInputWhenDisabled;
        if (props.isReadOnly) return designTokens.fontColorForInputWhenReadonly;
        return base.color;
      })(),
      padding: `${designTokens.spacing10} ${designTokens.spacing20}`,
      borderRadius: `${designTokens.borderRadiusForTag} 0 0 ${designTokens.borderRadiusForTag}`,
      border: props.isNewTheme
        ? 'none'
        : `1px ${designTokens.borderColorForTag} solid`,
      borderWidth: '1px 0 1px 1px',

      '&:last-child': {
        borderRadius: designTokens.borderRadiusForTag,
        borderWidth: designTokens.borderWidth1,
      },
    };
  };

const multiValueRemoveStyles =
  (props: TProps & { isNewTheme: boolean }) => (base: TBase, state: TState) => {
    return {
      ...base,
      borderColor: designTokens.borderColorForTag,
      padding: `0 ${designTokens.spacing10}`,
      borderRadius: `0 ${designTokens.borderRadiusForTag} ${designTokens.borderRadiusForTag} 0`,
      borderStyle: !props.isNewTheme ? 'solid' : 'none',
      borderWidth: !props.isNewTheme ? designTokens.borderWidth1 : '0',
      pointerEvents:
        state.isDisabled || props.isReadOnly ? 'none' : base.pointerEvents,
      backgroundColor: designTokens.backgroundColorForTag,

      'svg *': {
        fill: props.isReadOnly
          ? designTokens.fontColorForInputWhenReadonly
          : '',
      },

      '&:hover, &:focus': {
        borderColor: designTokens.borderColorForTagWarning,
        backgroundColor: designTokens.backgroundColorForTag,

        'svg *': {
          fill: designTokens.fontColorForClearInputIconWhenHovered,
        },
      },
    };
  };

export default function createSelectStyles(
  props: TProps & { isNewTheme: boolean }
) {
  return {
    control: controlStyles(props),
    menu: menuStyles(props),
    indicatorSeparator: indicatorSeparatorStyles(),
    dropdownIndicator: dropdownIndicatorStyles(props),
    clearIndicator: clearIndicatorStyles(),
    menuList: menuListStyles(),
    menuPortal: menuPortalStyles(props),
    multiValue: multiValueStyles(),
    multiValueLabel: multiValueLabelStyles(props),
    multiValueRemove: multiValueRemoveStyles(props),
    indicatorsContainer: indicatorsContainerStyles(),
    option: optionStyles(),
    placeholder: placeholderStyles(props),
    valueContainer: valueContainerStyles(props),
    singleValue: singleValueStyles(props),
    group: groupStyles(props),
    groupHeading: groupHeadingStyles(),
    container: containerStyles(),
  };
}
