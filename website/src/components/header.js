import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings } from 'ui-kit';

const Header = props => (
  <div
    className={props.className}
    css={css`
      background-color: ${customProperties.colorGreen};
      display: flex;
      align-items: center;
      padding: 0 16px;
      flex: 1;
    `}
  >
    <Spacings.Inline>
      <Link
        to="/"
        css={css`
          text-decoration: none;
          font-size: 2rem;
          color: ${customProperties.colorGreen85};
        `}
      >
        {props.siteTitle}
      </Link>
    </Spacings.Inline>
  </div>
);
Header.displayName = 'Header';
Header.propTypes = {
  className: PropTypes.string,
  siteTitle: PropTypes.string,
};
Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
