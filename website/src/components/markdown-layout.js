import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MDXProvider } from '@mdx-js/tag';
import { css } from '@emotion/core';
import { Text, customProperties } from 'ui-kit';
import SEO from './seo';
import Layout from './layout';
import CodeEditor from './code-editor';

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
const TagPre = props => props.children;
TagPre.displayName = 'TagPre';
const TagCode = props => {
  const isLive = /language-\.jsx/.test(props.className);
  if (!isLive) {
    return (
      <SyntaxHighlighter
        language="javascript"
        // Styles are defined globally in the `layout.js` component
        useInlineStyles={false}
        {...props}
      />
    );
  }
  const code = React.Children.toArray(props.children).join('\n');
  const shouldInlineCode = code.trim().startsWith('<');
  // For now, you can pass custom styles to the live editor panels
  // by appending a list of CSS-in-JS styles next to the language tag.
  // For example:
  //
  // ```.jsx-(minHeight:400px,maxHeight:400px)
  const customStyles = props.className
    .replace(/language-\.jsx(-\((.*)\))?/, '$2')
    .split(',')
    .reduce((styles, styleString) => {
      const styleParts = styleString.split(':');
      if (styleParts.length === 2) {
        return { ...styles, [styleParts[0]]: styleParts[1] };
      }
      return styles;
    }, {});
  return (
    <CodeEditor
      code={code}
      noInline={!shouldInlineCode}
      customStyles={customStyles}
    />
  );
};
TagCode.displayName = 'TagCode';
TagCode.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

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
      <div
        css={css`
          padding: ${customProperties.spacing16};
        `}
      >
        <SEO title={props.frontmatter.title} />
        {props.children}
      </div>
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
