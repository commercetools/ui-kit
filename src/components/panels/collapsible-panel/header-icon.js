import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleRightIcon } from '@commercetools-uikit/icons';

const sizeIconContainer = '22px';
const sizeIconContainerSmall = '14px';

const getArrowColor = ({ tone, isDisabled }) => {
  if (isDisabled) return 'neutral60';
  if (tone === 'urgent') return 'surface';
  return 'solid';
};

const HeaderIcon = props => {
  const backgroundColor =
    props.tone === 'urgent' ? vars.colorWarning : vars.colorSurface;
  return (
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
          background-color: ${backgroundColor};
          border: 1px solid ${backgroundColor};
        `,
        props.isDisabled &&
          css`
            box-shadow: none;
            border: 1px solid ${vars.colorNeutral};
            background-color: ${vars.colorAccent98};
          `,
      ]}
    >
      {props.isClosed ? (
        <AngleRightIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
          })}
          size={props.size}
        />
      ) : (
        <AngleDownIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
          })}
          size={props.size}
        />
      )}
    </div>
  );
};

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
