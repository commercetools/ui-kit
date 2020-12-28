import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getBaseStyles } from './secondary-icon-button.styles';

const propsToOmit = ['type'];

const SecondaryIconButton = (props) => {
  const buttonAttributes = {
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    'data-track-component': 'SecondaryIconButton',
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };
  const theme = useTheme();
  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={getBaseStyles(props, theme)}
    >
      {props.icon}
    </AccessibleButton>
  );
};

SecondaryIconButton.displayName = 'SecondaryIconButton';

SecondaryIconButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  icon: PropTypes.element.isRequired,
  color: PropTypes.oneOf(['solid', 'primary']),
  label: PropTypes.string.isRequired,
  onClick: requiredIf(PropTypes.func, (props) => !props.as),
  isDisabled: PropTypes.bool,
};

SecondaryIconButton.defaultProps = {
  color: 'solid',
  type: 'button',
  isDisabled: false,
};

export default SecondaryIconButton;
