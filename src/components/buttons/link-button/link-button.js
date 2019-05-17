import PropTypes from 'prop-types';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';
import getPassThroughProps from '../../../utils/get-pass-through-props';
import Text from '../../typography/text';
import Spacings from '../../spacings';

const hoverStyles = () => css`
  &:hover,
  &:focus,
  &:active {
    span {
      color: ${vars.colorPrimary25};
    }

    svg * {
      fill: ${vars.colorPrimary25};
    }
  }
`;

const createStyledComponent = component => styled(component)`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  border: none;
  background: none;
  padding: 0;
  min-height: initial;
  text-decoration: none;

  span {
    color: ${props =>
      props.isDisabled ? vars.colorNeutral : vars.colorPrimary};
  }

  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${props => !props.isDisabled && hoverStyles}
`;

const StyledReactRouterLink = createStyledComponent(ReactRouterLink);
const StyledExternalLink = createStyledComponent('a');

const componentProps = ['isExternal', 'to', 'label', 'isDisabled', 'iconLeft'];

const LinkBody = props => (
  <Spacings.Inline scale="xs" alignItems="center">
    {Boolean(props.iconLeft) &&
      React.cloneElement(props.iconLeft, {
        size: 'medium',
        theme: props.isDisabled ? 'grey' : 'green',
      })}
    <Text.Body isInline={true}>{props.label}</Text.Body>
  </Spacings.Inline>
);

LinkBody.displayName = 'LinkBody';
LinkBody.propTypes = {
  iconLeft: PropTypes.element,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
};

const LinkButton = props => {
  const remainingProps = getPassThroughProps(props, componentProps);

  if (props.isExternal) {
    return (
      <StyledExternalLink
        href={props.to}
        onClick={props.isDisabled ? event => event.preventDefault() : undefined}
        isDisabled={props.isDisabled}
        data-track-component="LinkButton"
        aria-label={props.label}
        {...remainingProps}
      >
        <LinkBody
          iconLeft={props.iconLeft}
          isDisabled={props.isDisabled}
          label={props.label}
        />
      </StyledExternalLink>
    );
  }

  return (
    <StyledReactRouterLink
      to={props.to}
      isDisabled={props.isDisabled}
      onClick={props.isDisabled ? event => event.preventDefault() : undefined}
      data-track-component="LinkButton"
      aria-label={props.label}
      {...remainingProps}
    >
      <LinkBody
        iconLeft={props.iconLeft}
        isDisabled={props.isDisabled}
        label={props.label}
      />
    </StyledReactRouterLink>
  );
};

LinkButton.displayName = 'LinkButton';
LinkButton.propTypes = {
  label: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      query: PropTypes.objectOf(PropTypes.string),
    }),
  ]).isRequired,
  iconLeft: PropTypes.element,
  isDisabled: PropTypes.bool,
  isExternal: PropTypes.bool,
};

LinkButton.defaultProps = {
  isDisabled: false,
  isExternal: false,
};

export default LinkButton;
