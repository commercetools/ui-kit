import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

const SEO = props => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription =
        props.description || data.site.siteMetadata.description;
      return (
        <Helmet
          htmlAttributes={{
            lang: props.lang,
          }}
          title={props.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: props.title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: data.site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: props.title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ]
            .concat(
              props.keywords.length > 0
                ? {
                    name: `keywords`,
                    content: props.keywords.join(`, `),
                  }
                : []
            )
            .concat(props.meta)}
        />
      );
    }}
  />
);
SEO.displayName = 'SEO';
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

export default SEO;
