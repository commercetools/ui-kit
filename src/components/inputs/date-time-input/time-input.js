import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getInputStyles = () => css`
  width: 100%;
  text-align: center;
  border: 0;
  border-top: 1px solid ${vars.colorNeutral90};
  padding: 10px 0;
  outline: 0;
  font-size: ${vars.fontSizeDefault};
  margin-top: ${vars.spacingS};
  color: ${vars.colorSolid};

  :disabled {
    /* Fixes background color in Firefox */
    background-color: ${vars.colorSurface};
  }
`;
const DateCalendarTimeInput = (props) => (
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

DateCalendarTimeInput.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  timeInputRef: PropTypes.object.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DateCalendarTimeInput;
