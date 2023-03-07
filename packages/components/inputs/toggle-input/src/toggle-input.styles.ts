// TODO: @redesign cleanup
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  designTokens,
  type TUseThemeResult,
} from '@commercetools-uikit/design-system';
import type { TToggleInputProps } from './toggle-input';

type NewThemeProps = {
  isNewTheme: boolean;
  themedTrack: ReturnType<typeof getThemedTrack>;
  themedThumb: ReturnType<typeof getThemedThumb>;
};

type TStyledLabelProps = Pick<TToggleInputProps, 'isDisabled' | 'size'> &
  NewThemeProps;
type TStyledSpanProps = Pick<TToggleInputProps, 'size'> & NewThemeProps;

const getThemedTrack = (themedValue: TUseThemeResult['themedValue']) =>
  themedValue(
    {
      small: {
        width: '32px',
        height: '16px',
      },
      big: {
        width: '64px',
        height: '32px',
      },
    },
    {
      small: {
        width: '29px',
        height: '12px',
      },
      big: {
        width: '56px',
        height: '24px',
      },
    }
  );

const getThemedThumb = (themedValue: TUseThemeResult['themedValue']) =>
  themedValue(
    {
      small: {
        diameter: '13px',
        shift: '2px',
        hoverAreaWidth: '0px',
      },
      big: {
        diameter: '26px',
        shift: '3px',
        hoverAreaWidth: '0px',
      },
    },
    {
      small: {
        diameter: '18px',
        shift: '3px',
        hoverAreaWidth: '4px',
      },
      big: {
        diameter: '32px',
        shift: '4px',
        hoverAreaWidth: '8px',
      },
    }
  );

const labelSizeStyles = (props: TStyledLabelProps) => css`
  height: ${props.themedTrack[props.size].height};
  width: ${props.themedTrack[props.size].width};
`;

const getThumbSize = (props: TStyledSpanProps) =>
  props.themedThumb[props.size].diameter;

const getThumbShift = (props: TStyledSpanProps) =>
  `${props.isNewTheme ? '-' : ''}${props.themedThumb[props.size].shift}`;

const getNewThemeTransformation = (props: TStyledSpanProps) =>
  `calc(${props.themedThumb[props.size].shift} * 2 + ${
    props.themedTrack[props.size].width
  } - ${props.themedThumb[props.size].diameter})`;

const getOldThemeTransformation = (props: TStyledSpanProps) =>
  props.size === 'small' ? '117%' : '127%';

const getFocusIndicatorWidth = (props: TStyledSpanProps) => `
    calc(
      ${props.themedTrack[props.size].width} + 2 *
        ${props.themedThumb[props.size].hoverAreaWidth} + 2 *
        ${props.themedThumb[props.size].shift} + 2px
    )`;

const getFocusIndicatorHeight = (props: TStyledSpanProps) => `
    calc(
      ${props.themedThumb[props.size].diameter} + 2 *
        ${props.themedThumb[props.size].hoverAreaWidth} + 2px
    )
`;

const getFocusIndicatorLeftPositioning = (props: TStyledSpanProps) => `
    calc(
      -${props.themedThumb[props.size].hoverAreaWidth} - ${
  props.themedThumb[props.size].shift
} - 1px
    )
`;

const getFocusIndicatorTopPositioning = (props: TStyledSpanProps) =>
  `calc(-50% - ${props.size === 'small' ? '2px' : '1px'})`;

const getNewThemeFocusIndicator = (props: TStyledSpanProps) => css`
  &::after {
    content: '';
    position: absolute;
    outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
    height: ${getFocusIndicatorHeight(props)};
    top: ${getFocusIndicatorTopPositioning(props)};
    width: ${getFocusIndicatorWidth(props)};
    left: ${getFocusIndicatorLeftPositioning(props)};
  }
`;

const Label = styled.label<TStyledLabelProps>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${labelSizeStyles}

  &:focus-within {
  ${(props) =>
    props.isNewTheme
      ? getNewThemeFocusIndicator
      : `outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
         outline-offset: 3px;
         `}
`;

const Span = styled.span<TStyledSpanProps>`
  /* this is the track */

  &::before {
    border-radius: ${(props) => (props.isNewTheme ? '12px' : '16px')};
    box-shadow: ${(props) =>
      props.isNewTheme ? 'none' : designTokens.shadow9};
    background-color: ${designTokens.backgroundColorForToggleInputTrack};
    left: 0;
    top: 50%;
    transition: background 0.2s ease-in-out;
    content: '';
    position: absolute;
    transform: translateY(-50%);
    height: 100%;
    width: 100%;
  }

  /* this is the thumb */
  &::after {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: ${getThumbShift};
    height: ${getThumbSize};
    width: ${getThumbSize};
    background-color: ${designTokens.colorSurface};
    box-shadow: ${designTokens.shadowForToggleInputThumb};
    border-radius: 50%;
    z-index: 1;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const getInputStyles = (props: TToggleInputProps & NewThemeProps) => css`
  /* when checked */
  &:checked {
    + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenChecked};
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenChecked};
      transform: translate(
        ${props.isNewTheme
          ? getNewThemeTransformation(props)
          : getOldThemeTransformation(props)},
        -50%
      );
    }
  }

  /* when disabled */
  &:disabled {
    & + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenDisabled};
      box-shadow: none;
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenDisabled};
      box-shadow: ${props.isNewTheme
        ? designTokens.shadowForToggleInputThumb
        : 'none'};
    }
  }

  /* when disabled and checked */
  &:disabled&:checked {
    & + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenCheckedAndDisabled};
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenCheckedAndDisabled};
    }
  }

  :not(:disabled)&:hover + span::after,
  :not(:disabled)&:focus + span::after {
    box-shadow: ${props.isNewTheme ? 'none' : designTokens.shadow16};
    outline: ${props.isNewTheme
      ? `${
          props.themedThumb[props.size].hoverAreaWidth
        } solid rgba(0, 0, 0, 0.1)`
      : 'none'};
  }
`;

export { Label, Span, getInputStyles, getThemedTrack, getThemedThumb };
