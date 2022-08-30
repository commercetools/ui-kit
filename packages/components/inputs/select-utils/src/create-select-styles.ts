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
  customProperties,
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
    fontSize: customProperties[designTokens.fontSizeForInput],
    backgroundColor: props.isDisabled
      ? customProperties[designTokens.backgroundColorForInputWhenDisabled]
      : customProperties[designTokens.backgroundColorForInput],
    borderColor: (() => {
      if (props.isDisabled)
        return customProperties[designTokens.borderColorForInputWhenDisabled];
      if (state.isFocused)
        return customProperties[designTokens.borderColorForInputWhenFocused];
      if (props.hasError)
        return customProperties[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return customProperties[designTokens.borderColorForInputWhenWarning];
      if (props.isReadOnly)
        return customProperties[designTokens.borderColorForInputWhenReadonly];
      return customProperties[designTokens.borderColorForInput];
    })(),
    borderRadius: customProperties[designTokens.borderRadiusForInput],
    minHeight: customProperties.sizeHeightInput,
    cursor: (() => {
      if (props.isDisabled) return 'not-allowed';
      if (props.isReadOnly) return 'default';
      return 'pointer';
    })(),
    padding: `0 ${customProperties.spacingS}`,
    transition: `border-color ${customProperties.transitionStandard},
    box-shadow ${customProperties.transitionStandard}`,
    outline: 0,
    boxShadow: 'none',

    '&:focus-within': {
      boxShadow: (() => {
        if (!props.isDisabled)
          return `inset 0 0 0 2px ${
            customProperties[designTokens.borderColorForInputWhenFocused]
          }`;
        return null;
      })(),
      borderColor: (() => {
        if (!props.isDisabled)
          return customProperties[designTokens.borderColorForInputWhenFocused];
        return null;
      })(),
    },

    '&:hover': {
      borderColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return customProperties[designTokens.borderColorForInputWhenFocused];
        return null;
      })(),
    },
    pointerEvents: 'auto',
    color:
      props.isDisabled || props.isReadOnly
        ? customProperties[designTokens.fontColorForInputWhenDisabled]
        : base.fontColorForInput,
  };
};

const menuStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    border: `1px ${
      customProperties[designTokens.borderColorForInputWhenFocused]
    } solid`,
    borderRadius: customProperties[designTokens.borderRadiusForInput],
    backgroundColor: customProperties[designTokens.backgroundColorForInput],
    boxShadow: customProperties.shadow7,
    fontSize: customProperties[designTokens.fontSizeForInput],
    fontFamily: 'inherit',
    margin: `${customProperties.spacingXs} 0 0 0`,
    borderColor: (() => {
      if (props.hasError)
        return customProperties[designTokens.borderColorForInputWhenError];
      if (props.hasWarning)
        return customProperties[designTokens.borderColorForInputWhenWarning];
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
    marginLeft: customProperties.spacingXs,
  };
};

const dropdownIndicatorStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: customProperties[designTokens.fontColorForInput],
    margin: '0',
    padding: '0',
    marginLeft: customProperties.spacingXs,
    fill:
      props.isDisabled || props.isReadOnly
        ? customProperties[designTokens.fontColorForInputWhenDisabled]
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
    borderRadius: customProperties[designTokens.borderRadiusForInput],
    backgroundColor: customProperties[designTokens.backgroundColorForInput],
  };
};

const optionStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    transition: `border-color ${customProperties.transitionStandard},
      background-color ${customProperties.transitionStandard},
      color ${customProperties.transitionStandard}`,
    paddingLeft: customProperties.spacingS,
    paddingRight: customProperties.spacingS,
    color: (() => {
      if (!state.isDisabled)
        return customProperties[designTokens.fontColorForInput];
      if (state.isSelected)
        return customProperties[designTokens.fontColorForInput];
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected)
        return customProperties[
          designTokens.backgroundColorForInputWhenSelected
        ];
      if (state.isFocused)
        return customProperties[
          designTokens.backgroundColorForInputWhenHovered
        ];
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled)
          return customProperties[designTokens.fontColorForInput];
        return base.color;
      })(),
      backgroundColor:
        customProperties[designTokens.backgroundColorForInputWhenSelected],
    },
  };
};

const placeholderStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: customProperties[designTokens.placeholderFontColorForInput],
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fill:
      props.isDisabled || props.isReadOnly
        ? customProperties[designTokens.fontColorForInputWhenDisabled]
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
        ? customProperties[designTokens.fontColorForInputWhenDisabled]
        : base.fontColorForInput,
  };
};

const singleValueStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: (() => {
      if (props.isDisabled) {
        return customProperties[designTokens.fontColorForInputWhenDisabled];
      }
      if (props.isReadOnly) {
        return customProperties[designTokens.fontColorForInputWhenReadonly];
      }
      return customProperties[designTokens.fontColorForInput];
    })(),
  };
};

const groupStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    padding: 0,
    '&:not(:first-of-type)': {
      borderTop: props.showOptionGroupDivider
        ? `1px solid ${customProperties.colorNeutral}`
        : base.borderTop,
    },
  };
};

const groupHeadingStyles = () => (base: TBase) => {
  return {
    ...base,
    color: customProperties[designTokens.fontColorForInputWhenReadonly],
    fontSize: customProperties.fontSizeSmall,
    textTransform: 'none',
    fontWeight: 'bold',
    margin: `0 ${customProperties.spacingXs}`,
    padding: `${customProperties.spacingS} ${customProperties.spacingXs}`,
    '&:empty': {
      padding: 0,
    },
  };
};

const containerStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    fontFamily: 'inherit',
    minHeight: customProperties.sizeHeightInput,
    borderRadius: customProperties[designTokens.borderRadiusForInput],
    borderColor: state.isFocused
      ? customProperties[designTokens.borderColorForInputWhenFocused]
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
    height: customProperties.sizeHeightTag,
    backgroundColor: customProperties[designTokens.backgroundColorForTag],
    padding: '0',
  };
};

const multiValueLabelStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    fontSize: customProperties.fontSizeSmall,
    color: (() => {
      if (props.isDisabled)
        return customProperties[designTokens.fontColorForInputWhenDisabled];
      if (props.isReadOnly)
        return customProperties[designTokens.fontColorForInputWhenReadonly];
      return base.color;
    })(),
    padding: `${customProperties.spacingXs} ${customProperties.spacingS}`,
    borderRadius: `${customProperties.borderRadiusForTag} 0 0 ${customProperties.borderRadiusForTag}`,
    border: `1px ${customProperties[designTokens.borderColorForTag]} solid`,
    borderWidth: '1px 0 1px 1px',

    '&:last-child': {
      borderRadius: customProperties.borderRadiusForTag,
      borderWidth: '1px',
    },
  };
};

const multiValueRemoveStyles =
  (props: TProps) => (base: TBase, state: TState) => {
    return {
      ...base,
      borderColor: customProperties[designTokens.borderColorForTag],
      padding: `0 ${customProperties.spacingXs}`,
      borderRadius: `0 ${customProperties[designTokens.borderRadiusForTag]} ${
        customProperties[designTokens.borderRadiusForTag]
      } 0`,
      borderStyle: 'solid',
      borderWidth: '1px',
      pointerEvents:
        state.isDisabled || props.isReadOnly ? 'none' : base.pointerEvents,
      backgroundColor: customProperties[designTokens.backgroundColorForTag],

      'svg *': {
        fill: props.isReadOnly
          ? customProperties[designTokens.fontColorForInputWhenReadonly]
          : '',
      },

      '&:hover, &:focus': {
        borderColor: customProperties.borderColorForTagWarning,
        backgroundColor: customProperties[designTokens.backgroundColorForTag],

        'svg *': {
          fill: customProperties[designTokens.borderColorForTagWarning],
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
