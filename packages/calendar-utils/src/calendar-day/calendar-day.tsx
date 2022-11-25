import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

type TCalendarDay = {
  children?: ReactNode;
  type?: 'heading' | 'spacing' | 'day';
  isHighlighted?: boolean;
  isSelected?: boolean;
  isRangeStart?: boolean;
  isRangeBetween?: boolean;
  isRangeEnd?: boolean;
  isToday?: boolean;
  disabled?: boolean;
};

const getStyles = (props: TCalendarDay) => {
  const styles = [];

  if (!['heading', 'spacing'].includes(props.type || '')) {
    styles.push(css`
      text-align: center;
      padding: ${designTokens.spacing20} 0;
      cursor: default;
      border-radius: ${designTokens.borderRadius4};
    `);
  }
  if (['heading', 'spacing'].includes(props.type || '')) {
    styles.push(css`
      text-align: center;
      padding: ${designTokens.spacing20} 0;
      cursor: default;
      color: ${designTokens.colorNeutral60};
    `);
  }
  if (props.isHighlighted) {
    styles.push(
      css`
        background-color: ${designTokens.colorNeutral90};
      `
    );
  }
  if (props.isSelected) {
    styles.push(
      css`
        background-color: ${designTokens.colorPrimary};
        color: ${designTokens.colorSurface};
      `
    );
  }
  if (props.isRangeStart || props.isRangeEnd) {
    styles.push(
      css`
        background-color: ${designTokens.colorPrimary40};
        color: ${designTokens.colorSurface};
      `
    );
  }
  if (props.isRangeBetween) {
    styles.push(
      css`
        background-color: ${designTokens.colorNeutral90};
        color: ${designTokens.fontColorForInput};
      `
    );
  }
  if (
    !props.isSelected &&
    !props.isRangeStart &&
    !props.isRangeEnd &&
    props.isToday
  ) {
    styles.push(css`
      color: ${designTokens.colorInfo};
      font-weight: bold;
    `);
  }

  if (props.disabled) {
    styles.push(css`
      color: ${designTokens.fontColorForInputWhenDisabled};
      cursor: not-allowed;
    `);
  }

  return styles;
};

const CalendarDay = (props: TCalendarDay) => {
  const {
    isHighlighted,
    isSelected,
    isRangeStart,
    isRangeBetween,
    isRangeEnd,
    isToday,
    ...rest
  } = props;
  return (
    <li
      css={css`
        list-style-type: none;
        display: inline-block;
        margin: 2px 1%;
        width: 12%;
      `}
    >
      <div css={getStyles(props)} {...rest} />
    </li>
  );
};

CalendarDay.displayName = 'CalendarDay';

export default CalendarDay;
