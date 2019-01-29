import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import MarkdownLayout from '../components/markdown-layout';

const MarkdownTemplate = props => {
  return (
    <MarkdownLayout frontmatter={props.data.mdx.frontmatter}>
      <MDXRenderer>{props.data.mdx.code.body}</MDXRenderer>
    </MarkdownLayout>
  );
};
MarkdownTemplate.displayName = 'MarkdownTemplate';
MarkdownTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        permalink: PropTypes.string,
      }).isRequired,
      code: PropTypes.shape({
        body: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
export default MarkdownTemplate;

export const pageQuery = graphql`
  query QueryMarkdownPage($id: String!) {
    mdx(frontmatter: { id: { eq: $id } }) {
      id
      frontmatter {
        id
        title
        permalink
      }
      code {
        body
      }
    }
  }
`;
