import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings, CodeViewIcon } from 'ui-kit';

const Header = props => (
  <div
    className={props.className}
    css={css`
      background-color: ${customProperties.colorNavy40};
      display: flex;
      align-items: center;
      padding: 0 16px;
      flex: 1;
    `}
  >
    <Link
      to="/"
      css={css`
        text-decoration: none;
        font-size: 2rem;
        color: ${customProperties.colorNavy98};
        white-space: nowrap;
      `}
    >
      <Spacings.Inline scale="m" alignItems="center">
        <CodeViewIcon size="scale" theme="white" />
        {/* TODO: replace this with a proper logo */}
        <div
          css={css`
            color: ${customProperties.colorNavy98};
          `}
        >
          {props.siteTitle}
        </div>
      </Spacings.Inline>
    </Link>
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
