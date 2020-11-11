import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { customProperties as vars } from '@commercetools-uikit/design-system';

export const availableTones = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];
const getPaddingStyle = (props) => {
  if (props.isCondensed)
    return css`
      padding: 1px ${vars.spacingXs};
    `;
  return css`
    padding: ${vars.spacingXs} ${vars.spacingS};
  `;
};

const getToneStyles = (props, theme) => {
  const overwrittenVars = { ...vars, ...theme };

  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${overwrittenVars.colorError95};
        border: 1px solid ${overwrittenVars.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${overwrittenVars.colorWarning95};
        border: 1px solid ${overwrittenVars.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${overwrittenVars.colorPrimary85};
        border: 1px solid ${overwrittenVars.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${overwrittenVars.colorInfo95};
        border: 1px solid ${overwrittenVars.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${overwrittenVars.colorPrimary95};
        border: 1px solid ${overwrittenVars.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${overwrittenVars.colorNeutral90};
        border: 1px solid ${overwrittenVars.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const getStampStyles = (props, theme) => {
  const overwrittenVars = { ...vars, ...theme };

  return css`
    color: ${overwrittenVars.colorSolid};
    font-size: ${overwrittenVars.fontSizeDefault};
    border-radius: ${overwrittenVars.borderRadius2};
  `;
};

const Stamp = (props) => {
  const theme = useTheme();
  return (
    <div
      css={[
        getStampStyles(props, theme),
        getToneStyles(props, theme),
        getPaddingStyle(props),
      ]}
    >
      {props.children}
    </div>
  );
};

Stamp.displayName = 'Stamp';
Stamp.propTypes = {
  /**
   * Indicates the color scheme of stamp
   */
  tone: PropTypes.oneOf(availableTones).isRequired,
  isCondensed: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Stamp;
