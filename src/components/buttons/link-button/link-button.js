import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import Spacings from '../../spacings';

const LinkButton = props => (
  <Link
    to={props.to}
    css={[
      css`
        display: inline-flex;
        align-items: center;
        font-size: 1rem;
        border: none;
        background: none;
        padding: 0;
        min-height: initial;
        cursor: pointer;
        text-decoration: none;
        span {
          color: ${vars.colorPrimary};
          ${props.isDisabled ? `color: ${vars.colorNeutral};` : ''}
        }
        &:hover {
          span {
            color: ${vars.colorPrimary25};
            ${props.isDisabled ? `color: ${vars.colorNeutral});` : ''}
          }
        }
      `,
      props.isDisabled &&
        css`
          cursor: not-allowed;
        `,
    ]}
    onClick={props.isDisabled ? event => event.preventDefault() : undefined}
    data-track-component="LinkButton"
    {...filterAriaAttributes(props)}
    {...filterDataAttributes(props)}
    aria-label={props.label}
  >
    <Spacings.Inline scale="xs" alignItems="center">
      {Boolean(props.iconLeft) &&
        React.cloneElement(props.iconLeft, {
          size: 'medium',
          color: props.isDisabled ? 'neutral60' : 'primary',
        })}
      <Text.Body isInline={true}>{props.label}</Text.Body>
    </Spacings.Inline>
  </Link>
);

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
};

LinkButton.defaultProps = {
  isDisabled: false,
};

export default LinkButton;
