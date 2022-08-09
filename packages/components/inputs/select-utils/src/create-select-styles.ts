/*
  ⚠️ These styles are used for
    - SelectInput
    - AsyncSelectInput
    - CreatableSelectInput
    - AsyncCreatableSelectInput

  Always check all affected components when making changes here!
*/
import { ReactNode } from 'react';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

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
    fontSize: vars[designTokens.fontSizeForInput],
    backgroundColor: props.isDisabled
      ? vars[designTokens.backgroundColorForInputWhenDisabled]
      : vars[designTokens.backgroundColorForInput],
    borderColor: (() => {
      if (props.isDisabled)
        return vars[designTokens.borderColorForInputWhenDisabled];
      if (state.isFocused)
        return vars[designTokens.borderColorForInputWhenFocused];
      if (props.hasError)
        return vars[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return vars[designTokens.borderColorForInputWhenWarning];
      if (props.isReadOnly)
        return vars[designTokens.borderColorForInputWhenReadonly];
      return vars[designTokens.borderColorForInput];
    })(),
    borderRadius: vars[designTokens.borderRadiusForInput],
    minHeight: vars.sizeHeightInput,
    cursor: (() => {
      if (props.isDisabled) return 'not-allowed';
      if (props.isReadOnly) return 'default';
      return 'pointer';
    })(),
    padding: `0 ${vars.spacingS}`,
    transition: `border-color ${vars.transitionStandard},
    box-shadow ${vars.transitionStandard}`,
    outline: 0,
    boxShadow: 'none',

    '&:focus-within': {
      boxShadow: (() => {
        if (!props.isDisabled)
          return `inset 0 0 0 2px ${
            vars[designTokens.borderColorForInputWhenFocused]
          }`;
        return null;
      })(),
      borderColor: (() => {
        if (!props.isDisabled)
          return vars[designTokens.borderColorForInputWhenFocused];
        return null;
      })(),
    },

    '&:hover': {
      borderColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return vars[designTokens.borderColorForInputWhenFocused];
        return null;
      })(),
    },
    pointerEvents: 'auto',
    color:
      props.isDisabled || props.isReadOnly
        ? vars[designTokens.fontColorForInputWhenDisabled]
        : base.fontColorForInput,
  };
};

const menuStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    border: `1px ${vars[designTokens.borderColorForInputWhenFocused]} solid`,
    borderRadius: vars[designTokens.borderRadiusForInput],
    backgroundColor: vars[designTokens.backgroundColorForInput],
    boxShadow: vars.shadow7,
    fontSize: vars[designTokens.fontSizeForInput],
    fontFamily: 'inherit',
    margin: `${vars.spacingXs} 0 0 0`,
    borderColor: (() => {
      if (props.hasError)
        return vars[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return vars[designTokens.borderColorForInputWhenWarning];
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
    marginLeft: vars.spacingXs,
  };
};

const dropdownIndicatorStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: vars[designTokens.fontColorForInput],
    margin: '0',
    padding: '0',
    marginLeft: vars.spacingXs,
    fill:
      props.isDisabled || props.isReadOnly
        ? vars[designTokens.fontColorForInputWhenDisabled]
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
    borderRadius: vars[designTokens.borderRadiusForInput],
    backgroundColor: vars[designTokens.backgroundColorForInput],
  };
};

const optionStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    transition: `border-color ${vars.transitionStandard},
      background-color ${vars.transitionStandard},
      color ${vars.transitionStandard}`,
    paddingLeft: vars.spacingS,
    paddingRight: vars.spacingS,
    color: (() => {
      if (!state.isDisabled) return vars[designTokens.fontColorForInput];
      if (state.isSelected) return vars[designTokens.fontColorForInput];
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected)
        return vars[designTokens.backgroundColorForInputWhenSelected];
      if (state.isFocused)
        return vars[designTokens.backgroundColorForInputWhenHovered];
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled) return vars[designTokens.fontColorForInput];
        return base.color;
      })(),
      backgroundColor: vars[designTokens.backgroundColorForInputWhenSelected],
    },
  };
};

const placeholderStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: vars[designTokens.placeholderFontColorForInput],
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fill:
      props.isDisabled || props.isReadOnly
        ? vars[designTokens.fontColorForInputWhenDisabled]
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
        ? vars[designTokens.fontColorForInputWhenDisabled]
        : base.fontColorForInput,
  };
};

const singleValueStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: (() => {
      if (props.isDisabled) {
        return vars[designTokens.fontColorForInputWhenDisabled];
      }
      if (props.isReadOnly) {
        return vars[designTokens.fontColorForInputWhenReadonly];
      }
      return vars[designTokens.fontColorForInput];
    })(),
  };
};

const groupStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    padding: 0,
    '&:not(:first-of-type)': {
      borderTop: props.showOptionGroupDivider
        ? `1px solid ${vars.colorNeutral}`
        : base.borderTop,
    },
  };
};

const groupHeadingStyles = () => (base: TBase) => {
  return {
    ...base,
    color: vars[designTokens.fontColorForInputWhenReadonly],
    fontSize: vars.fontSizeSmall,
    textTransform: 'none',
    fontWeight: 'bold',
    margin: `0 ${vars.spacingXs}`,
    padding: `${vars.spacingS} ${vars.spacingXs}`,
    '&:empty': {
      padding: 0,
    },
  };
};

const containerStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    fontFamily: 'inherit',
    minHeight: vars.sizeHeightInput,
    borderRadius: vars[designTokens.borderRadiusForInput],
    borderColor: state.isFocused
      ? vars[designTokens.borderColorForInputWhenFocused]
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
    height: vars.sizeHeightTag,
    backgroundColor: vars[designTokens.backgroundColorForTag],
    padding: '0',
  };
};

const multiValueLabelStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    fontSize: vars.fontSizeSmall,
    color: (() => {
      if (props.isDisabled)
        return vars[designTokens.fontColorForInputWhenDisabled];
      if (props.isReadOnly)
        return vars[designTokens.fontColorForInputWhenReadonly];
      return base.color;
    })(),
    padding: `${vars.spacingXs} ${vars.spacingS}`,
    borderRadius: `${vars.borderRadiusForTag} 0 0 ${vars.borderRadiusForTag}`,
    border: `1px ${vars[designTokens.borderColorForTag]} solid`,
    borderWidth: '1px 0 1px 1px',

    '&:last-child': {
      borderRadius: vars.borderRadiusForTag,
      borderWidth: '1px',
    },
  };
};

const multiValueRemoveStyles =
  (props: TProps) => (base: TBase, state: TState) => {
    return {
      ...base,
      borderColor: vars[designTokens.borderColorForTag],
      padding: `0 ${vars.spacingXs}`,
      borderRadius: `0 ${vars[designTokens.borderRadiusForTag]} ${
        vars[designTokens.borderRadiusForTag]
      } 0`,
      borderStyle: 'solid',
      borderWidth: '1px',
      pointerEvents:
        state.isDisabled || props.isReadOnly ? 'none' : base.pointerEvents,
      backgroundColor: vars[designTokens.backgroundColorForTag],

      'svg *': {
        fill: props.isReadOnly
          ? vars[designTokens.fontColorForInputWhenReadonly]
          : '',
      },

      '&:hover, &:focus': {
        borderColor: vars.borderColorForTagWarning,
        backgroundColor: vars[designTokens.backgroundColorForTag],

        'svg *': {
          fill: vars[designTokens.borderColorForTagWarning],
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
