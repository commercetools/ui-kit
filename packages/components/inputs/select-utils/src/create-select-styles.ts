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
  isCondensed?: boolean;
  controlShouldRenderValue?: boolean;
  appearance?: 'default' | 'quiet';
  minMenuWidth?:
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  maxMenuWidth?:
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
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

type TDesignTokenName = keyof typeof designTokens;

const getHorizontalConstraintValue = (
  value?: TProps['minMenuWidth'] | TProps['maxMenuWidth']
) => {
  switch (value) {
    case 'auto':
      return 'initial';
    default:
      return (
        designTokens[`constraint${value}` as TDesignTokenName] ||
        designTokens.constraintScale
      );
  }
};

const getInputBackgroundColor = (props: TProps) => {
  if (props.appearance === 'quiet') {
    return designTokens.colorTransparent;
  }
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return designTokens.backgroundColorForInput;
};

const getMultiValueBackgroundColor = (props: TProps) => {
  if (props.isDisabled) return designTokens.backgroundColorForInputWhenDisabled;
  if (props.isReadOnly) return designTokens.backgroundColorForInputWhenReadonly;
  return designTokens.colorPrimary95;
};

const getInputBorderColor = (props: TProps, state: TState) => {
  if (props.appearance === 'quiet') {
    return designTokens.colorTransparent;
  }
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral95;
  }
  if (state.isFocused) {
    return designTokens.borderColorForInputWhenFocused;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  return designTokens.borderColorForInput;
};

const getHoverInputBorderColor = (props: TProps) => {
  if (props.appearance === 'quiet') {
    return designTokens.colorTransparent;
  }
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.colorNeutral95;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  return designTokens.borderColorForInputWhenHovered;
};

const getHoverInputBackgroundColor = (props: TProps) => {
  if (!props.isDisabled && !props.isReadOnly) {
    if (props.appearance === 'quiet') {
      return 'hsla(240, 64%, 58%, 4%)'; //this is mainly a combination of our primary color hsl(240, 64%, 58%) and an alpha channel of 4%.
    } else {
      return designTokens.backgroundColorForInputWhenHovered;
    }
  }
  return null;
};

const controlStyles = (props: TProps) => (base: TBase, state: TState) => {
  return {
    ...base,
    fontSize: props.isCondensed
      ? designTokens.fontSize20
      : designTokens.fontSize30,
    backgroundColor: getInputBackgroundColor(props),
    borderColor: getInputBorderColor(props, state),
    borderWidth: (() => {
      if (
        props.hasWarning ||
        props.hasError ||
        state.isFocused ||
        props.appearance === 'quiet'
      ) {
        return designTokens.borderWidth2;
      }
      return designTokens.borderWidth1;
    })(),
    borderRadius: designTokens.borderRadiusForInput,
    minHeight: props.isCondensed
      ? designTokens.heightForInputAsSmall
      : designTokens.heightForInput,
    cursor: (() => {
      if (props.isDisabled) return 'not-allowed';
      if (props.isReadOnly) return 'default';
      return 'pointer';
    })(),
    padding:
      props.appearance === 'quiet'
        ? designTokens.spacing20
        : designTokens.spacing30,
    transition: `border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard}`,
    outline: 0,
    boxShadow: 'none',
    ...(props.horizontalConstraint === 'auto'
      ? { display: 'inline-flex' }
      : {}),

    '&:focus-within': {
      borderColor: (() => {
        if (!props.isDisabled && !props.isReadOnly)
          return designTokens.borderColorForInputWhenFocused;
        return null;
      })(),
    },

    '&:hover': {
      borderColor: getHoverInputBorderColor(props),
      backgroundColor: getHoverInputBackgroundColor(props),
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
    border: `1px solid ${designTokens.colorSurface}`,
    borderRadius: designTokens.borderRadiusForInput,
    backgroundColor: designTokens.backgroundColorForInput,
    boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.15)',
    fontSize: designTokens.fontSize30,
    fontFamily: 'inherit',
    margin: `${designTokens.spacing10} 0 0 0`,
    borderColor: (() => {
      if (props.hasError || props.hasWarning) {
        return designTokens.colorSurface;
      }
      return base.borderColorForInput;
    })(),
    width: props.horizontalConstraint === 'auto' ? 'auto' : '100%',
    minWidth: props.minMenuWidth
      ? getHorizontalConstraintValue(props.minMenuWidth)
      : designTokens.constraint3,
    maxWidth: props.maxMenuWidth
      ? getHorizontalConstraintValue(props.maxMenuWidth)
      : designTokens.constraintScale,
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
    marginLeft: designTokens.spacing20,
    fill: (() => {
      if (props.isDisabled || props.isReadOnly)
        return designTokens.fontColorForInputWhenDisabled;
      if (props.hasError) return designTokens.colorError;
      if (props.hasWarning) return designTokens.colorWarning;
      return designTokens.colorNeutral60;
    })(),
  };
};

const clearIndicatorStyles = () => (base: TBase) => ({
  ...base,
  display: 'flex',
  padding: 0,
  marginLeft: designTokens.spacing20,
});

const menuListStyles = () => (base: TBase) => {
  return {
    ...base,
    padding: `${designTokens.spacing10} 0`,
    borderRadius: designTokens.borderRadiusForInput,
    backgroundColor: designTokens.backgroundColorForInput,
  };
};

const optionStyles = (props: TProps) => (base: TBase, state: TState) => {
  return {
    ...base,
    transition: `border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard}`,
    padding: `${designTokens.spacing20} ${designTokens.spacing30}`,
    lineHeight: designTokens.lineHeight40,
    fontSize: props.isCondensed
      ? designTokens.fontSize20
      : designTokens.fontSize30,
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    color: (() => {
      if (!state.isDisabled) return designTokens.fontColorForInput;
      if (state.isSelected) return designTokens.fontColorForInput;
      return base.color;
    })(),
    backgroundColor: (() => {
      if (state.isSelected) return designTokens.colorPrimary95;
      if (state.isFocused)
        return designTokens.backgroundColorForInputWhenHovered;
      return base.backgroundColor;
    })(),

    '&:active': {
      color: (() => {
        if (!state.isDisabled) return designTokens.fontColorForInput;
        return base.color;
      })(),
      backgroundColor: designTokens.colorPrimary95,
    },
  };
};

const placeholderStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    color: (() => {
      if (
        props.appearance === 'quiet' &&
        !props.isReadOnly &&
        !props.isDisabled
      ) {
        if (props.hasError) {
          return designTokens.colorError;
        }
        if (props.hasWarning) {
          return designTokens.colorWarning;
        }
      }
      return designTokens.colorNeutral60;
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
      (props.iconLeft && !props.isMulti) ||
      (props.isMulti &&
        props.hasValue &&
        (props.controlShouldRenderValue ?? true))
        ? 'flex'
        : 'grid',
    fill:
      props.isDisabled || props.isReadOnly
        ? designTokens.fontColorForInputWhenDisabled
        : designTokens.colorNeutral60,
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
      if (props.hasError) return designTokens.colorError;
      if (props.hasWarning) return designTokens.colorWarning;
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
        ? `1px solid ${designTokens.colorNeutral90}`
        : base.borderTop,
    },
  };
};

const groupHeadingStyles = () => (base: TBase) => {
  return {
    ...base,
    color: designTokens.fontColorForInputWhenReadonly,
    fontSize: designTokens.fontSize20,
    borderBottom: `1px solid ${designTokens.colorNeutral90}`,
    textTransform: 'none',
    fontWeight: designTokens.fontWeight500,
    padding: `${designTokens.spacing20} ${designTokens.spacing30}`,
    '&:empty': {
      padding: 0,
    },
  };
};

const containerStyles = () => (base: TBase, state: TState) => {
  return {
    ...base,
    fontFamily: 'inherit',
    minHeight: designTokens.heightForInputAsSmall,
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

const multiValueStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    display: 'flex',
    alignItems: 'center',
    height: props.isCondensed ? 'inherit' : '32px',
    backgroundColor: getMultiValueBackgroundColor(props),
    padding: props.isCondensed
      ? `0 ${designTokens.spacing20} 0 calc(${designTokens.spacing05} + ${designTokens.spacing10})`
      : designTokens.spacing20,
    border: `1px solid ${designTokens.colorNeutral85}`,
    borderRadius: designTokens.borderRadius20,
  };
};

const multiValueLabelStyles = (props: TProps) => (base: TBase) => {
  return {
    ...base,
    fontSize: props.isCondensed
      ? designTokens.fontSize20
      : designTokens.fontSize30,
    lineHeight: props.isCondensed
      ? designTokens.lineHeight20
      : designTokens.lineHeight40,
    color: (() => {
      if (props.isDisabled) return designTokens.fontColorForInputWhenDisabled;
      if (props.isReadOnly) return designTokens.fontColorForInputWhenReadonly;
      return base.color;
    })(),
    padding: `${props.isCondensed ? '1px' : designTokens.spacing10} ${
      designTokens.spacing20
    }`,
    borderRadius: `${designTokens.borderRadius2} 0 0 ${designTokens.borderRadius2}`,
    border: 'none',
    borderWidth: '1px 0 1px 1px',

    '&:last-child': {
      borderRadius: designTokens.borderRadius2,
      borderWidth: designTokens.borderWidth1,
    },
  };
};

const multiValueRemoveStyles =
  (props: TProps) => (base: TBase, state: TState) => {
    return {
      ...base,
      borderColor: designTokens.colorNeutral,
      padding: `0 ${designTokens.spacing10}`,
      borderRadius: `0 ${designTokens.borderRadius2} ${designTokens.borderRadius2} 0`,
      borderStyle: 'none',
      borderWidth: '0',
      pointerEvents:
        state.isDisabled || props.isReadOnly ? 'none' : base.pointerEvents,
      backgroundColor: designTokens.colorNeutral95,

      'svg *': {
        fill: props.isReadOnly
          ? designTokens.fontColorForInputWhenReadonly
          : '',
      },

      '&:hover, &:focus': {
        borderColor: designTokens.colorWarning,
        backgroundColor: designTokens.colorNeutral95,

        'svg *': {
          fill: designTokens.colorError,
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
    multiValue: multiValueStyles(props),
    multiValueLabel: multiValueLabelStyles(props),
    multiValueRemove: multiValueRemoveStyles(props),
    indicatorsContainer: indicatorsContainerStyles(),
    option: optionStyles(props),
    placeholder: placeholderStyles(props),
    valueContainer: valueContainerStyles(props),
    singleValue: singleValueStyles(props),
    group: groupStyles(props),
    groupHeading: groupHeadingStyles(),
    container: containerStyles(),
  };
}
