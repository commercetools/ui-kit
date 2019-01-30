import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

const Card = props => (
  <div
    css={[
      css`
        display: flex;
        font-family: ${vars.fontFamilyDefault};
        font-size: 1rem;
        flex-direction: column;
        width: 100%;
        box-shadow: ${props.type === 'raised' ? vars.shadow1Second : 'none'};
        border-radius: ${vars.borderRadius6};
        padding: ${vars.spacing16};
        background: ${props.theme === 'dark'
          ? vars.colorGray95
          : vars.colorWhite};
      `,
    ]}
    className={props.className}
  >
    {props.children}
  </div>
);

Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['raised', 'flat']),
  children: PropTypes.any,
  theme: PropTypes.oneOf(['light', 'dark']),
};

Card.defaultProps = {
  type: 'raised',
  theme: 'light',
};

export default Card;
