import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import { Text, Spacings, customProperties } from 'ui-kit';

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        site {
          siteMetadata {
            navbarLinks {
              label
              subgroup {
                label
                linkTo
                subgroup {
                  label
                  linkTo
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Spacings.Inset scale="l">
        <Spacings.Stack scale="l">
          {data.site.siteMetadata.navbarLinks.map(link => (
            <Spacings.Stack scale="m" key={link.linkTo}>
              <Text.Headline elementType="h3">{link.label}</Text.Headline>
              {link.subgroup.map((subLink, index) => {
                if (subLink.subgroup) {
                  return (
                    <Spacings.Stack scale="s" key={index}>
                      <div
                        css={css`
                          padding-left: ${customProperties.spacing16};
                        `}
                      >
                        <Text.Subheadline elementType="h5">
                          {subLink.label}
                        </Text.Subheadline>
                      </div>
                      {subLink.subgroup.map(subSubLink => (
                        <Link
                          to={subSubLink.linkTo}
                          key={subSubLink.linkTo}
                          css={css`
                            padding-left: ${customProperties.spacing32};
                          `}
                        >
                          <Text.Detail>{subSubLink.label}</Text.Detail>
                        </Link>
                      ))}
                    </Spacings.Stack>
                  );
                }
                return (
                  <Link
                    to={subLink.linkTo}
                    key={subLink.linkTo}
                    css={css`
                      padding-left: ${customProperties.spacing16};
                    `}
                  >
                    <Text.Subheadline elementType="h4">
                      {subLink.label}
                    </Text.Subheadline>
                  </Link>
                );
              })}
            </Spacings.Stack>
          ))}
        </Spacings.Stack>
      </Spacings.Inset>
    )}
  />
);
Navbar.displayName = 'Navbar';

export default Navbar;
