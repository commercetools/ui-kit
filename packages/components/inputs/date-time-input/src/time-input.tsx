/// <reference types="@emotion/react/types/css-prop" />
import type { KeyboardEventHandler, RefObject } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TDateTimeInputProps } from './date-time-input';

const getInputStyles = () => css`
  width: 100%;
  text-align: center;
  border: 0;
  border-top: 1px solid ${designTokens.colorNeutral90};
  padding: 10px 0;
  outline: 0;
  font-size: ${designTokens.fontSize30};
  margin-top: ${designTokens.spacing20};
  color: ${designTokens.colorSolid};

  :disabled {
    /* Fixes background color in Firefox */
    background-color: ${designTokens.colorSurface};
  }
`;

type TDateCalendarTimeInputProps = {
  timeInputRef: RefObject<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
} & Pick<
  TDateTimeInputProps,
  'isDisabled' | 'onChange' | 'value' | 'placeholder'
>;

const DateCalendarTimeInput = (props: TDateCalendarTimeInputProps) => (
  <input
    disabled={props.isDisabled}
    ref={props.timeInputRef}
    type="text"
    value={props.value}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
    placeholder={props.placeholder}
    css={getInputStyles()}
  />
);

DateCalendarTimeInput.displayName = 'DateCalendarTimeInput';

export default DateCalendarTimeInput;
