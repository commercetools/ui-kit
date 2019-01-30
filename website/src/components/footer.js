import React from 'react';
import { css } from '@emotion/core';
// import { Link } from 'gatsby';
import { customProperties, Spacings } from 'ui-kit';

const Footer = () => (
  <div
    css={css`
      background-color: ${customProperties.colorNavy40};
      padding: 32px;
    `}
  >
    <div
      css={css`
        width: 80%;
        max-width: 900px;
        margin: 0 auto;
      `}
    >
      <Spacings.Stack scale="l">
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-around;
          `}
        >
          <Spacings.Stack scale="m">
            <div>{'Documentation'}</div>
          </Spacings.Stack>
          <Spacings.Stack scale="m">
            <div>{'Resources'}</div>
          </Spacings.Stack>
        </div>
        <div
          css={css`
            text-align: center;
          `}
        >
          {'copyright'}
        </div>
      </Spacings.Stack>
    </div>
  </div>
);
Footer.displayName = 'Footer';

export default Footer;
