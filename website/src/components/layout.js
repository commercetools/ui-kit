import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css, Global } from '@emotion/core';
import { customProperties } from 'ui-kit';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';

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

        /* Syntax highlighting custom colors */
        code {
          background-color: ${customProperties.colorNavy95};
          color: ${customProperties.colorBlue};
          padding: 2px 4px;
        }
        .prism-code,
        .hljs {
          display: block;
          white-space: pre;
          background-color: ${customProperties.colorNavy95};
          /* color: ${customProperties.colorNavy}; */
          padding: 0.5rem;
          margin: 0;
          box-sizing: content-box;
          vertical-align: baseline;
          outline: none;
          text-shadow: none;
          hyphens: none;
          word-wrap: normal;
          word-break: normal;
          text-align: left;
          word-spacing: normal;
          tab-size: 2;
        }
        .hljs {
          margin: ${customProperties.spacing16} 0;
        }
        .hljs code {
          padding: unset;
        }
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: ${customProperties.colorGray60};
        }
        .token.punctuation {
          opacity: 0.7;
          color: ${customProperties.colorOrange};
        }
        .namespace {
          opacity: 0.7;
        }
        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol {
          color: ${customProperties.colorNavy40};
        }
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: ${customProperties.colorGreen};
        }
        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable {
          color: ${customProperties.colorOrange};
        }
        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: ${customProperties.colorBlue};
        }
        .token.regex,
        .token.important {
          color: ${customProperties.colorPurple};
        }
        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }
        .token.entity {
          cursor: help;
        }
        .token.deleted {
          color: red;
        }
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
            grid-template-rows: 96px 1fr;
            grid-template-columns: auto 1fr;
          `}
        >
          <Header
            css={css`
              grid-row: 1;
              grid-column: 1/3;
              height: 96px;
            `}
            siteTitle={data.site.siteMetadata.title}
          />
          {props.showSidebar && (
            <aside
              css={css`
                position: relative;
                grid-row: 2;
                display: flex;
                flex-direction: column;
                width: 256px;
                border-right: 1px solid ${customProperties.colorGray};
                background-color: ${customProperties.colorNavy95};
              `}
            >
              <Navbar />
            </aside>
          )}
          <div
            role="main"
            css={css`
              grid-column: 2;
              grid-row: 2;

              /*
                Allow this flex child to grow smaller than its smallest content.
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
              <Footer />
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
