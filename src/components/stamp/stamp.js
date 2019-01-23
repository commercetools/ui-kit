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
        background-color: ${vars.colorRed95};
        border: 1px solid ${vars.colorRed};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${vars.colorOrange95};
        border: 1px solid ${vars.colorOrange};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${vars.colorGreen85};
        border: 1px solid ${vars.colorGreen40};
      `;
    }
    case 'information': {
      return css`
        background-color: ${vars.colorBlue95};
        border: 1px solid ${vars.colorBlue};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${vars.colorGreen95};
        border: 1px solid ${vars.colorGreen25};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${vars.colorGray90};
        border: 1px solid ${vars.colorGray60};
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
        color: ${vars.colorBlack};
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
