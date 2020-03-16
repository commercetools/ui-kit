import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const Card = props => (
  <div
    {...filterDataAttributes(props)}
    css={css`
      box-sizing: border-box;
      width: 100%;
      padding: ${vars.spacingM};
      font-size: 1rem;
      box-shadow: ${props.type === 'raised' ? vars.shadow1 : 'none'};
      border-radius: ${vars.borderRadius6};
      background: ${props.theme === 'dark'
        ? vars.colorNeutral95
        : vars.colorSurface};
    `}
    className={props.className}
  >
    {props.children}
  </div>
);

Card.displayName = 'Card';
Card.propTypes = {
  type: PropTypes.oneOf(['raised', 'flat']),
  theme: PropTypes.oneOf(['light', 'dark']),
  children: PropTypes.any,
  className: PropTypes.string,
};

Card.defaultProps = {
  type: 'raised',
  theme: 'light',
};

export default Card;
