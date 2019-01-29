import React from 'react';
import { Link } from 'gatsby';
// import { css } from '@emotion/core';
import { Spacings, Text } from 'ui-kit';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import pkg from '../../../package.json';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={pkg.keywords} />
    <Spacings.Stack scale="l">
      <Text.Headline elementType="h1">
        {'commercetools UI Kit 💅'}
      </Text.Headline>
      <Text.Subheadline elementType="h4">
        {'✨ Component library based on our design system 🛠'}
      </Text.Subheadline>
      <Link to="/components">{'Components'}</Link>
    </Spacings.Stack>
  </Layout>
);
IndexPage.displayName = 'IndexPage';

export default IndexPage;
