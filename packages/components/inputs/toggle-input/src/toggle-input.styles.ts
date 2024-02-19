import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TToggleInputProps } from './toggle-input';

type SizesProps = {
  trackSizes: typeof trackSizes;
  thumbSizes: typeof thumbSizes;
};

type TStyledLabelProps = Pick<TToggleInputProps, 'isDisabled' | 'size'> &
  SizesProps;
type TStyledSpanProps = Pick<TToggleInputProps, 'size'> & SizesProps;

const trackSizes = {
  small: {
    width: '29px',
    height: '12px',
  },
  big: {
    width: '56px',
    height: '24px',
  },
};
const thumbSizes = {
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
};

const labelSizeStyles = (props: TStyledLabelProps) => css`
  height: ${props.trackSizes[props.size].height};
  width: ${props.trackSizes[props.size].width};
`;

const getThumbSize = (props: TStyledSpanProps) =>
  props.thumbSizes[props.size].diameter;

const getThumbShift = (props: TStyledSpanProps) =>
  `-${props.thumbSizes[props.size].shift}`;

const getFocusIndicatorWidth = (props: TStyledSpanProps) => `
    calc(
      ${props.trackSizes[props.size].width} + 2 *
        ${props.thumbSizes[props.size].hoverAreaWidth} + 2 *
        ${props.thumbSizes[props.size].shift} + 2px
    )`;

const getFocusIndicatorHeight = (props: TStyledSpanProps) => `
    calc(
      ${props.thumbSizes[props.size].diameter} + 2 *
        ${props.thumbSizes[props.size].hoverAreaWidth} + 2px
    )
`;

const getFocusIndicatorLeftPositioning = (props: TStyledSpanProps) => `
    calc(
      -${props.thumbSizes[props.size].hoverAreaWidth} - ${
  props.thumbSizes[props.size].shift
} - 1px
    )
`;

const getFocusIndicatorTopPositioning = (props: TStyledSpanProps) =>
  `calc(-50% - ${props.size === 'small' ? '2px' : '1px'})`;

const getFocusIndicator = (props: TStyledSpanProps) => css`
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

const getMargin = (props: TStyledLabelProps) =>
  css`
    margin: ${`calc(2px + ${props.thumbSizes[props.size].hoverAreaWidth} + (${
      props.thumbSizes[props.size].diameter
    } - ${props.trackSizes[props.size].height}) / 2)`};
  `;

const Label = styled.label<TStyledLabelProps>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  align-self: center;
  ${getMargin}

  ${labelSizeStyles}

  &:focus-within {
  ${(props) => getFocusIndicator(props)}
`;

const Span = styled.span<TStyledSpanProps>`
  /* this is the track */

  &::before {
    border-radius: 12px;
    box-shadow: none;
    background-color: ${designTokens.colorNeutral};
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
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const getInputStyles = (props: TToggleInputProps & SizesProps) => css`
  /* when checked */
  &:checked {
    + span::before {
      background: ${designTokens.backgroundColorForToggleTrackWhenActive};
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleThumbWhenActive};
      transform: translate(${props.thumbSizes[props.size].diameter}, -50%);
    }
  }

  /* when disabled */
  &:disabled {
    & + span::before {
      background: ${designTokens.backgroundColorForToggleTrackWhenDisabled};
      box-shadow: none;
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleThumbWhenDisabled};
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    }
  }

  /* when disabled and checked */
  &:disabled&:checked {
    & + span::before {
      background: ${designTokens.colorAccent90};
    }
    & + span::after {
      background: ${designTokens.colorAccent60};
    }
  }

  :not(:disabled)&:hover + span::after,
  :not(:disabled)&:focus + span::after {
    box-shadow: none;
    outline: ${`${
      props.thumbSizes[props.size].hoverAreaWidth
    } solid rgba(0, 0, 0, 0.1)`}
`;

export { Label, Span, trackSizes, thumbSizes, getInputStyles };
