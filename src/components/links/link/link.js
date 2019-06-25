import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Link as ReactRouterLink } from 'react-router-dom';
import { css } from '@emotion/core';
import getPassThroughProps from '../../../utils/get-pass-through-props';
import vars from '../../../../materials/custom-properties';

const getLinkStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };
  return css`
    color: ${overwrittenVars.colorPrimary};
    font-size: ${overwrittenVars.fontSizeDefault};

    &:hover,
    &:focus,
    &:active {
      color: ${overwrittenVars.colorPrimary25};
    }
  `;
};

const Link = props => {
  const remainingProps = getPassThroughProps(
    props,
    Object.keys(Link.propTypes)
  );

  if (props.isExternal) {
    return (
      <a
        css={theme => getLinkStyles(props, theme)}
        href={props.to}
        target="_blank"
        rel="noopener noreferrer"
        {...remainingProps}
      />
    );
  }
  return (
    <ReactRouterLink
      css={theme => getLinkStyles(props, theme)}
      to={props.to}
      {...remainingProps}
    />
  );
};

Link.displayName = 'Link';

Link.propTypes = {
  isExternal: PropTypes.bool.isRequired,
  to: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
        hash: PropTypes.string,
        state: PropTypes.object,
      }),
    ]),
    props => !props.isExternal
  ),
};

Link.defaultProps = {
  isExternal: false,
};

export default Link;
