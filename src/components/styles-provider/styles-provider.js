import React from 'react';
import PropTypes from 'prop-types';
import { css, Global } from '@emotion/core';
import vars from '../../../materials/custom-properties';

const StylesProvider = props => (
  <React.Fragment>
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html,
        body {
          color: ${vars.fontColorDefault};
          font-family: ${vars.fontFamilyDefault};
          font-size: ${props.baseFontSize || vars.fontSizeDefault};
          margin: 0;
          padding: 0;
          height: 100vh;
        }

        html {
          box-sizing: border-box;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }
      `}
    />
    {props.children}
  </React.Fragment>
);
StylesProvider.displayName = 'StylesProvider';
StylesProvider.propTypes = {
  baseFontSize: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default StylesProvider;
