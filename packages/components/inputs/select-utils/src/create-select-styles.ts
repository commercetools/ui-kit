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

const controlStyles = (props: TProps) => (base: TBase, state: TState) => {
  return {
    ...base,
    fontSize: designTokens.fontSizeForInput,
    backgroundColor: props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput,
    borderColor: (() => {
      if (props.isDisabled) return designTokens.borderColorForInputWhenDisabled;
      if (state.isFocused) return designTokens.borderColorForInputWhenFocused;
      if (props.hasError) return designTokens.borderColorForInputWhenError;
      if (props.hasWarning) return designTokens.borderColorForInputWhenWarning;
      if (props.isReadOnly) return designTokens.borderColorForInputWhenReadonly;
      return designTokens.borderColorForInput;
    })(),
    borderRadius: designTokens.borderRadiusForInput,
    minHeight: designTokens.sizeHeightInput,
    cursor: (() => {
      if (props.isDisabled) return 'not-allowed';
      if (props.isReadOnly) return 'default';
      return 'pointer';
    })(),
    padding: `0 ${designTokens.spacing20}`,
    transition: `border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard}`,
    outline: 0,
    boxShadow: 'none',

    '&:focus-within': {
      boxShadow: (() => {
        if (!props.isDisabled)
          return `inset 0 0 0 2px ${designTokens.borderColorForInputWhenFocused}`;
        return null;
      })(),
      borderColor: (() => {
        if (!props.isDisabled)
          return designTokens.borderColorForInputWhenFocused;
        return null;
      })(),
    },

    '&:hover': {
      borderColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return designTokens.borderColorForInputWhenFocused;
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
    border: `1px ${designTokens.borderColorForInputWhenFocused} solid`,
    borderRadius: designTokens.borderRadiusForInput,
    backgroundColor: designTokens.backgroundColorForInput,
    boxShadow: designTokens.shadow7,
    fontSize: designTokens.fontSizeForInput,
    fontFamily: 'inherit',
    margin: `${designTokens.spacing10} 0 0 0`,
    borderColor: (() => {
      if (props.hasError) return designTokens.borderColorForInputWhenError;
      if (props.hasWarning) return designTokens.borderColorForInputWhenWarning;
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
    marginLeft: designTokens.spacing10,
    fill:
      props.isDisabled || props.isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : base.fontColorForInput,
  };
};

const clearIndicatorStyles = () => (base: TBase) => ({
  ...base,
  display: 'flex',
  padding: 0,
});

const menuListStyles = () => (base: TBase) => {
  return {
    ...base,
    padding: '0',
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
    paddingLeft: designTokens.spacing20,
    paddingRight: designTokens.spacing20,
    color: (() => {
      if (!state.isDisabled) return designTokens.fontColorForInput;
      if (state.isSelected) return designTokens.fontColorForInput;
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected)
        return designTokens.backgroundColorForInputWhenSelected;
      if (state.isFocused)
        return designTokens.backgroundColorForInputWhenHovered;
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled) return designTokens.fontColorForInput;
        return base.color;
      })(),
      backgroundColor: designTokens.backgroundColorForInputWhenSelected,
    },
  };
};

const placeholderStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: designTokens.placeholderFontColorForInput,
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
        : base.fontColorForInput,
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
        ? `1px solid ${designTokens.colorNeutral}`
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
    margin: `0 ${designTokens.spacing10}`,
    padding: `${designTokens.spacing20} ${designTokens.spacing10}`,
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
    height: designTokens.sizeHeightTag,
    backgroundColor: designTokens.backgroundColorForTag,
    padding: '0',
  };
};

const multiValueLabelStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    fontSize: designTokens.fontSizeSmall,
    color: (() => {
      if (props.isDisabled) return designTokens.fontColorForInputWhenDisabled;
      if (props.isReadOnly) return designTokens.fontColorForInputWhenReadonly;
      return base.color;
    })(),
    padding: `${designTokens.spacing10} ${designTokens.spacing20}`,
    borderRadius: `${designTokens.borderRadiusForTag} 0 0 ${designTokens.borderRadiusForTag}`,
    border: `1px ${designTokens.borderColorForTag} solid`,
    borderWidth: '1px 0 1px 1px',

    '&:last-child': {
      borderRadius: designTokens.borderRadiusForTag,
      borderWidth: '1px',
    },
  };
};

const multiValueRemoveStyles =
  (props: TProps) => (base: TBase, state: TState) => {
    return {
      ...base,
      borderColor: designTokens.borderColorForTag,
      padding: `0 ${designTokens.spacing10}`,
      borderRadius: `0 ${designTokens.borderRadiusForTag} ${designTokens.borderRadiusForTag} 0`,
      borderStyle: 'solid',
      borderWidth: '1px',
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
          fill: designTokens.borderColorForTagWarning,
        },
      },
    };
  };

export default function createSelectStyles(props: TProps) {
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
