import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

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
      color: ${vars.colorGray60};
    `);
  }
  if (props.isHighlighted) {
    styles.push(
      css`
        background-color: ${vars.colorGray90};
      `
    );
  }
  if (props.isSelected) {
    styles.push(
      css`
        background-color: ${vars.colorGreen};
        color: ${vars.colorWhite};
      `
    );
  }
  if (props.isRangeStart || props.isRangeEnd) {
    styles.push(
      css`
        background-color: ${vars.colorGreen40};
        color: ${vars.colorWhite};
      `
    );
  }
  if (props.isRangeBetween) {
    styles.push(
      css`
        background-color: ${vars.colorGray90};
        color: ${vars.fontColorDefault};
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
      color: ${vars.colorBlue};
      font-weight: bold;
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
