import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';

const Layout = props => (
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
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        {props.children}
      </>
    )}
  />
);
Layout.displayName = 'Layout';
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
