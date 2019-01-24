import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { AngleDownIcon, AngleRightIcon } from '../../icons';
import vars from '../../../../materials/custom-properties';

const sizeIconContainer = '24px';
const sizeIconContainerSmall = '16px';

const getArrowTheme = ({ tone, isDisabled }) => {
  if (isDisabled) return 'grey';
  if (tone === 'urgent') return 'white';
  return 'black';
};

const HeaderIcon = props => (
  <div
    css={[
      css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${props.size === 'small'
          ? sizeIconContainerSmall
          : sizeIconContainer};
        width: ${props.size === 'small'
          ? sizeIconContainerSmall
          : sizeIconContainer};
        border-radius: 50%;
        flex-shrink: 0;
        box-shadow: ${vars.shadow7};
        background-color: ${props.tone === 'urgent'
          ? vars.colorOrange
          : vars.colorWhite};
      `,
      props.isDisabled &&
        css`
          box-shadow: none;
        `,
    ]}
  >
    {props.isClosed ? (
      <AngleRightIcon
        theme={getArrowTheme({
          tone: props.tone,
          isDisabled: props.isDisabled,
        })}
        size={props.size}
      />
    ) : (
      <AngleDownIcon
        theme={getArrowTheme({
          tone: props.tone,
          isDisabled: props.isDisabled,
        })}
        size={props.size}
      />
    )}
  </div>
);

HeaderIcon.displayName = 'HeaderIcon';
HeaderIcon.propTypes = {
  tone: PropTypes.oneOf(['urgent', 'primary']),
  isClosed: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
};

HeaderIcon.defaultProps = {
  tone: 'primary',
};

export default HeaderIcon;
