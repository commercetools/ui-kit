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
        background-color: ${vars['--color-red-95']};
        border: 1px solid ${vars['--color-red']};
      `;
    }
    case 'warning': {
      return css`
        background-color: ${vars['--color-orange-95']};
        border: 1px solid ${vars['--color-orange']};
      `;
    }
    case 'positive': {
      return css`
        background-color: ${vars['--color-green-85']};
        border: 1px solid ${vars['--color-green-40']};
      `;
    }
    case 'information': {
      return css`
        background-color: ${vars['--color-blue-95']};
        border: 1px solid ${vars['--color-blue']};
      `;
    }
    case 'primary': {
      return css`
        background-color: ${vars['--color-green-95']};
        border: 1px solid ${vars['--color-green-25']};
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${vars['--color-gray-90']};
        border: 1px solid ${vars['--color-gray-60']};
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
        font-family: ${vars['--font-family-default']};
        color: ${vars['-color-black']};
        font-size: ${vars['--font-size-default']};
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
