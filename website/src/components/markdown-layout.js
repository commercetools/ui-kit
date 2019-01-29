import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prismStyles from 'react-syntax-highlighter/dist/styles/prism/xonokai';
import { MDXProvider } from '@mdx-js/tag';
import styled from '@emotion/styled';
import { Text } from 'ui-kit';
import SEO from './seo';
import Layout from './layout';

const TagH1 = props => <Text.Headline elementType="h1" {...props} />;
TagH1.displayName = 'TagH1';
const TagH2 = props => <Text.Headline elementType="h2" {...props} />;
TagH2.displayName = 'TagH2';
const TagH3 = props => <Text.Headline elementType="h3" {...props} />;
TagH3.displayName = 'TagH3';
const TagH4 = props => <Text.Subheadline elementType="h4" {...props} />;
TagH4.displayName = 'TagH4';
const TagH5 = props => <Text.Subheadline elementType="h5" {...props} />;
TagH5.displayName = 'TagH5';
const TagParagraph = Text.Body;
TagParagraph.displayName = 'TagParagraph';
const TagStrong = props => (
  <Text.Body isBold={true} isInline={true} {...props} />
);
TagStrong.displayName = 'TagStrong';
// The `<SyntaxHighlighter>` renders a `<pre><code/></pre>`, therefore we
// should render a `<div/>` for the `pre` tag that works as a wrapper.
const TagPre = styled.div``;
TagPre.displayName = 'TagPre';
const TagCode = props => (
  <SyntaxHighlighter language="javascript" style={prismStyles} {...props} />
);
TagCode.displayName = 'TagCode';

const MarkdownLayout = props => (
  <Layout>
    <MDXProvider
      components={{
        h1: TagH1,
        h2: TagH2,
        h3: TagH3,
        h4: TagH4,
        h5: TagH5,
        p: TagParagraph,
        strong: TagStrong,
        pre: TagPre,
        code: TagCode,
      }}
    >
      <>
        <SEO title={props.frontmatter.title} />
        {props.children}
      </>
    </MDXProvider>
  </Layout>
);
MarkdownLayout.displayName = 'MarkdownLayout';
MarkdownLayout.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    permalink: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default MarkdownLayout;
