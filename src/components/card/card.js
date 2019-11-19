import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const Card = props => (
  <div
    {...filterDataAttributes(props)}
    css={css`
      display: flex;
      font-size: 1rem;
      flex-direction: column;
      width: 100%;
      box-shadow: ${props.type === 'raised' ? vars.shadow1 : 'none'};
      border-radius: ${vars.borderRadius6};
      background: ${props.theme === 'dark'
        ? vars.colorNeutral95
        : vars.colorSurface};
    `}
    className={props.className}
  >
    <div
      css={css`
        padding: ${vars.spacingM};
      `}
    >
      {props.children}
    </div>
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
