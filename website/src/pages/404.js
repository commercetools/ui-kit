import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const PageNotFound = () => (
  <Layout>
    <SEO title="Page not found" />
    <h1>NOT FOUND</h1>
    <p>This is not the page you were looking for 👋</p>
  </Layout>
);
PageNotFound.displayName = 'PageNotFound';

export default PageNotFound;
