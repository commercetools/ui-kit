import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Link as ReactRouterLink } from 'react-router-dom';
import Styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

const createStyledComponent = component => Styled(component)`
  font-family: ${vars.fontFamily};
  color: ${vars.colorPrimary};
  font-size: ${vars.fontSizeDefault};

  &:hover {
    color: ${vars.colorPrimary25};
  }
`;

const StyledReactRouterLink = createStyledComponent(ReactRouterLink);
const StyledExternalLink = createStyledComponent('a');

const componentProps = ['isExternal', 'to'];

const Link = props => {
  // instead of object destructing
  const remainingProps = Object.keys(props)
    .filter(key => !componentProps.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = props[key];
      return obj;
    }, {});

  if (props.isExternal) {
    return <StyledExternalLink href={props.to} {...remainingProps} />;
  }
  return <StyledReactRouterLink to={props.to} {...remainingProps} />;
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
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  isExternal: false,
};

export default Link;
