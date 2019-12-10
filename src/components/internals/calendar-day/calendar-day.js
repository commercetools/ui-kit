import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getStyles = props => {
  const styles = [];

  if (!['heading', 'spacing'].includes(props.type)) {
    styles.push(css`
      text-align: center;
      padding: ${vars.spacingS} 0;
      cursor: default;
      border-radius: ${vars.borderRadius4};
    `);
  }
  if (['heading', 'spacing'].includes(props.type)) {
    styles.push(css`
      text-align: center;
      padding: ${vars.spacingS} 0;
      cursor: default;
      color: ${vars.colorNeutral60};
    `);
  }
  if (props.isHighlighted) {
    styles.push(
      css`
        background-color: ${vars.colorNeutral90};
      `
    );
  }
  if (props.isSelected) {
    styles.push(
      css`
        background-color: ${vars.colorPrimary};
        color: ${vars.colorSurface};
      `
    );
  }
  if (props.isRangeStart || props.isRangeEnd) {
    styles.push(
      css`
        background-color: ${vars.colorPrimary40};
        color: ${vars.colorSurface};
      `
    );
  }
  if (props.isRangeBetween) {
    styles.push(
      css`
        background-color: ${vars.colorNeutral90};
        color: ${vars.fontColorForInput};
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
      color: ${vars.colorInfo};
      font-weight: bold;
    `);
  }

  if (props.disabled) {
    styles.push(css`
      color: ${vars.fontColorForInputWhenDisabled};
      cursor: not-allowed;
    `);
  }

  return styles;
};

const CalendarDay = props => {
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

CalendarDay.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['heading', 'spacing', 'day']),
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
  isRangeStart: PropTypes.bool,
  isRangeBetween: PropTypes.bool,
  isRangeEnd: PropTypes.bool,
  isToday: PropTypes.bool,
};

export default CalendarDay;
