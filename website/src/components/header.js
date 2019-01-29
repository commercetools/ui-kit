import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings } from 'ui-kit';

const Header = props => (
  <div
    className={props.className}
    css={css`
      border-bottom: 1px solid ${customProperties.colorPurple};
      display: flex;
      align-items: center;
      padding: 0 16px;
    `}
  >
    <Spacings.Inline>
      <Link to="/">{props.siteTitle}</Link>
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
