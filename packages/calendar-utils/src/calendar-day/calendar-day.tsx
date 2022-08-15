import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

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
      padding: ${customProperties.spacingS} 0;
      cursor: default;
      border-radius: ${customProperties.borderRadius4};
    `);
  }
  if (['heading', 'spacing'].includes(props.type || '')) {
    styles.push(css`
      text-align: center;
      padding: ${customProperties.spacingS} 0;
      cursor: default;
      color: ${customProperties.colorNeutral60};
    `);
  }
  if (props.isHighlighted) {
    styles.push(
      css`
        background-color: ${customProperties.colorNeutral90};
      `
    );
  }
  if (props.isSelected) {
    styles.push(
      css`
        background-color: ${customProperties.colorPrimary};
        color: ${customProperties.colorSurface};
      `
    );
  }
  if (props.isRangeStart || props.isRangeEnd) {
    styles.push(
      css`
        background-color: ${customProperties.colorPrimary40};
        color: ${customProperties.colorSurface};
      `
    );
  }
  if (props.isRangeBetween) {
    styles.push(
      css`
        background-color: ${customProperties.colorNeutral90};
        color: ${customProperties.fontColorForInput};
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
      color: ${customProperties.colorInfo};
      font-weight: bold;
    `);
  }

  if (props.disabled) {
    styles.push(css`
      color: ${customProperties.fontColorForInputWhenDisabled};
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
