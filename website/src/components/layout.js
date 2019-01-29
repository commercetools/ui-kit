import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css, Global } from '@emotion/core';
// TODO: overwrite custom editor styles
import reactLiveStyles from 'react-live/react-live.css';
import { customProperties } from 'ui-kit';
import Header from './header';

const Layout = props => (
  <React.Fragment>
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100vh;
          font-family: ${customProperties.fontFamilyDefault};
        }
        ${reactLiveStyles}
      `}
    />
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div
          css={css`
            height: 100vh;
            display: grid;
            grid-template-rows: auto 96px 1fr;
            grid-template-columns: auto 1fr;
          `}
        >
          <Header
            css={css`
              grid-row: 2;
              grid-column: 1/3;
              height: 96px;
            `}
            siteTitle={data.site.siteMetadata.title}
          />
          {props.showSidebar && (
            <aside
              css={css`
                position: relative;
                grid-row: 3;
                display: flex;
                flex-direction: column;
                width: 128px;
                border-right: 1px solid ${customProperties.colorPurple};
              `}
            >
              {'Side'}
            </aside>
          )}
          <div
            role="main"
            css={css`
              grid-column: 2;
              grid-row: 3;

              /*
              Allow the this flex child to grow smaller than its smallest content.
              This is needed when there is a really wide text inside that would stretch
              this node to be wider than the parent.
            */
              min-width: 0;
              overflow-x: hidden;
              overflow-y: scroll;

              /*
              layout the children. There will always be the page and side notification
              about the actual content. The content should stretch to fill the rest of
              the page.
            */
              display: flex;
              flex-direction: column;

              /*
              set position to relative to layout notifications and modals
            */
              position: relative;
            `}
          >
            <div
              css={css`
                flex-grow: 1;
                display: flex;
                flex-direction: column;
              `}
            >
              {props.children}
            </div>
          </div>
        </div>
      )}
    />
  </React.Fragment>
);
Layout.displayName = 'Layout';
Layout.propTypes = {
  showSidebar: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Layout.defaultProps = {
  showSidebar: true,
};

export default Layout;
