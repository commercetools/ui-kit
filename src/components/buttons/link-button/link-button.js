import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';

const LinkButton = props => (
  <Link
    to={props.to}
    css={css`
      display: inline-flex;
      align-items: center;
      font-size: 1rem;
      border: none;
      background: none;
      padding: 0;
      min-height: initial;
      cursor: pointer;
      text-decoration: none;
      ${props.isDisabled ? 'cursor: not-allowed;' : ''}

      > * + * {
        margin: 0 0 0 ${vars['--spacing-4']};
      }
      p {
        color: ${vars['--color-green']};
        ${props.isDisabled ? `color: ${vars['--color-gray']};` : ''}
      }
      &:hover {
        p {
          color: ${vars['--color-green-25']};
          ${props.isDisabled ? `color: ${vars['--color-gray']});` : ''}
        }
      }
    `}
    onClick={props.isDisabled ? event => event.preventDefault() : undefined}
    data-track-component="LinkButton"
    {...filterDataAttributes(props)}
    aria-label={props.label}
  >
    {Boolean(props.iconLeft) &&
      React.cloneElement(props.iconLeft, {
        size: 'medium',
        theme: props.isDisabled ? 'grey' : 'green',
      })}
    <div>
      <Text.Body>{props.label}</Text.Body>
    </div>
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
