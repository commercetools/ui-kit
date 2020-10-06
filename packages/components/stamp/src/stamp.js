import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import InsetSquish from '@commercetools-uikit/spacings-inset-squish';

export const availableTones = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];

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

const Stamp = (props) => (
  <div
    css={(theme) => [getStampStyles(props, theme), getToneStyles(props, theme)]}
  >
    <InsetSquish scale="s">{props.children}</InsetSquish>
  </div>
);

Stamp.displayName = 'Stamp';
Stamp.propTypes = {
  /**
   * Indicates the color scheme of stamp
   */
  tone: PropTypes.oneOf(availableTones).isRequired,
  children: PropTypes.node.isRequired,
};

export default Stamp;
