import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { css } from '@emotion/react';
import Inline from '@commercetools-uikit/spacings-inline';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getButtonStyles } from './primary-button.styles';

const propsToOmit = ['type'];

const PrimaryButton = (props) => {
  const dataProps = {
    'data-track-component': 'PrimaryButton',
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  const isActive = props.isToggleButton && props.isToggled;
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={dataProps}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={getButtonStyles(props.isDisabled, isActive, props.tone, props.size)}
    >
      <Inline alignItems="center" scale="xs">
        {Boolean(props.iconLeft) && (
          <span
            css={css`
              margin: 0 ${vars.spacingXs} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {React.cloneElement(props.iconLeft, {
              color: props.isDisabled ? 'neutral60' : 'surface',
              size: props.size === 'small' ? 'medium' : 'big',
            })}
          </span>
        )}
        <span>{props.label}</span>
      </Inline>
    </AccessibleButton>
  );
};

PrimaryButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  buttonAttributes: PropTypes.object,
  iconLeft: PropTypes.node,
  isToggleButton: PropTypes.bool.isRequired,
  isToggled(props, propName, componentName, ...rest) {
    if (props.isToggleButton) {
      return PropTypes.bool.isRequired(props, propName, componentName, ...rest);
    }
    if (!isNil(props[propName]))
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the button is not a toggle button.`
      );
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isDisabled: PropTypes.bool,
  onClick: requiredIf(PropTypes.func, (props) => !props.as),
  size: PropTypes.oneOf(['big', 'small']),
  tone: PropTypes.oneOf(['urgent', 'primary']),
};
PrimaryButton.defaultProps = {
  type: 'button',
  size: 'big',
  isToggleButton: false,
  tone: 'primary',
};
PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton };
