import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import { Text, Spacings, customProperties } from 'ui-kit';

const NavbarLink = props => {
  const { level, ...restProps } = props;
  const indentation = 16 * level;
  return (
    <ClassNames>
      {({ css: makeClassName }) => (
        <Link
          css={css`
            border-left: 4px solid ${customProperties.colorNavy95};
            padding-left: calc(${indentation}px - 4px);
            text-decoration: none;
            &:hover {
              h5 {
                color: ${customProperties.colorNavy40};
              }
            }
          `}
          activeClassName={makeClassName`
            border-left: 4px solid ${customProperties.colorNavy40} !important;
            h5 { color: ${customProperties.colorNavy40}; }
          `}
          {...restProps}
        />
      )}
    </ClassNames>
  );
};
NavbarLink.displayName = 'NavbarLink';
NavbarLink.propTypes = {
  level: PropTypes.oneOf([1, 2]),
};

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
            <Spacings.Stack scale="s" key={link.linkTo}>
              <Text.Subheadline elementType="h4" tone="secondary">
                {link.label}
              </Text.Subheadline>
              {link.subgroup.map((subLink, index) => {
                if (subLink.subgroup) {
                  return (
                    <Spacings.Stack scale="xs" key={index}>
                      <div
                        css={css`
                          padding-left: ${customProperties.spacing16};
                        `}
                      >
                        <Text.Subheadline elementType="h5" tone="secondary">
                          {subLink.label}
                        </Text.Subheadline>
                      </div>
                      {subLink.subgroup.map(subSubLink => (
                        <NavbarLink
                          to={subSubLink.linkTo}
                          key={subSubLink.linkTo}
                          level={2}
                        >
                          <Text.Detail>{subSubLink.label}</Text.Detail>
                        </NavbarLink>
                      ))}
                    </Spacings.Stack>
                  );
                }
                return (
                  <NavbarLink
                    to={subLink.linkTo}
                    key={subLink.linkTo}
                    level={1}
                  >
                    <Text.Subheadline elementType="h5">
                      {subLink.label}
                    </Text.Subheadline>
                  </NavbarLink>
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
