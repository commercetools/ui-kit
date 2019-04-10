import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Spacings from '../spacings';
import vars from '../../../materials/custom-properties';

export const availableTones = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];

const getToneStyles = props => {
  switch (props.tone) {
    case 'critical': {
      return css`
        background-color: ${vars.colorError95};
        border: 1px solid ${vars.colorError};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${vars.colorWarning95};
        border: 1px solid ${vars.colorWarning};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${vars.colorPrimary85};
        border: 1px solid ${vars.colorPrimary40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${vars.colorInfo95};
        border: 1px solid ${vars.colorInfo};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${vars.colorPrimary95};
        border: 1px solid ${vars.colorPrimary25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${vars.colorNeutral90};
        border: 1px solid ${vars.colorNeutral60};
      `;
    }
    default:
      return css``;
  }
};

const Label = props => (
  <div
    css={[
      css`
        font-family: ${vars.fontFamilyDefault};
        color: ${vars.colorSolid};
        font-size: ${vars.fontSizeDefault};
        border-radius: 2px;
      `,
      getToneStyles(props),
    ]}
  >
    <Spacings.InsetSquish scale="s">{props.children}</Spacings.InsetSquish>
  </div>
);

Label.displayName = 'Label';
Label.propTypes = {
  tone: PropTypes.oneOf(availableTones).isRequired,
  children: PropTypes.node.isRequired,
};

export default Label;
