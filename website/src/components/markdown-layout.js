import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MDXProvider } from '@mdx-js/tag';
import { css } from '@emotion/core';
import { Text, ChainIcon, customProperties } from 'ui-kit';
import GithubSlugger from 'github-slugger';
import SEO from './seo';
import Layout from './layout';
import CodeEditor from './code-editor';

const slugger = new GithubSlugger();

const headersTagToComponentMap = {
  h1: Text.Headline,
  h2: Text.Headline,
  h3: Text.Headline,
  h4: Text.Subheadline,
  h5: Text.Subheadline,
};

const headersTagToSpacingMap = {
  h1: '48px',
  h2: customProperties.spacing32,
  h3: customProperties.spacing24,
  h4: customProperties.spacing16,
  h5: customProperties.spacing16,
};

const createStyledHeaderTag = elementType => {
  const Component = headersTagToComponentMap[elementType];
  const Element = props => {
    const text = React.Children.toArray(props.children).join('\n');
    const anchorId = slugger.slug(text);
    return (
      <div
        id={anchorId}
        css={css`
          display: flex;
          align-items: center;
          margin-top: ${headersTagToSpacingMap[elementType]};
          > * + * {
            margin: 0 0 0 ${customProperties.spacing4};
          }
          a {
            visibility: hidden;
            align-items: center;
            display: flex;
          }
          &:hover {
            a {
              visibility: visible;
            }
          }
        `}
      >
        <a href={`#${anchorId}`} aria-hidden={true}>
          <ChainIcon size="medium" theme="grey" />
        </a>
        <Component elementType={elementType} {...props} />
      </div>
    );
  };
  Element.displayName = Component.displayName;
  Element.propTypes = {
    children: PropTypes.node,
  };
  return Element;
};

const TagH1 = createStyledHeaderTag('h1');
const TagH2 = createStyledHeaderTag('h2');
const TagH3 = createStyledHeaderTag('h3');
const TagH4 = createStyledHeaderTag('h4');
const TagH5 = createStyledHeaderTag('h5');
const TagParagraph = props => (
  <div
    css={css`
      margin-top: ${customProperties.spacing16};
      code {
        background-color: ${customProperties.colorNavy95};
        color: ${customProperties.colorBlue};
        padding: 2px 4px;
      }
      p {
        line-height: 1.3rem;
      }
    `}
  >
    <Text.Body {...props} />
  </div>
);
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
