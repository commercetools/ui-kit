import type { Theme } from '@emotion/react';
import React, { ComponentType, MouseEvent, KeyboardEvent } from 'react';
import { css, useTheme } from '@emotion/react';
import omit from 'lodash/omit';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getTextColor, getButtonIconColor } from './flat-button.styles';

const propsToOmit = ['type'];

export type TExtendedTheme = Theme & {
  [key: string]: string;
};
export type TFlatButtonProps = {
  /**
   * You may pass in a string like "a" to have the button render as an anchor tag instead.
   * <br/>
   * Or you could pass in a React Component, like a `Link`.
   */
  as?: string | ComponentType;
  /**
   * Indicates the color scheme of button
   */
  tone?: 'primary' | 'secondary' | 'inverted';
  /**
   * Used as the HTML `type` attribute.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Should describe what the button is for
   */
  label: string;
  /**
   * Handler when the button is clicked
   * <br />
   * Signature: (event: MouseEvent<HTMLButtonElement) => void
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * The icon of the button
   */
  icon?: React.ReactElement;
  /**
   * The position of the icon
   */
  iconPosition?: 'left' | 'right';
  /**
   * Determines if the button is disabled.
   * <br />
   * Note that this influences the `tone` and `onClick` will not be triggered in this state.
   */
  isDisabled?: boolean;
};

const defaultProps: Pick<
  TFlatButtonProps,
  'tone' | 'isDisabled' | 'type' | 'iconPosition'
> = {
  tone: 'primary',
  type: 'button',
  iconPosition: 'left',
  isDisabled: false,
};

const ButtonIcon = (
  props: Pick<TFlatButtonProps, 'as' | 'isDisabled' | 'tone' | 'icon'>
) => {
  if (!props.icon) return null;
  const iconColor = getButtonIconColor(props);
  const Icon = React.cloneElement(props.icon, {
    size: 'medium',
    color: iconColor,
  });
  if (props.as && props.as !== 'button') {
    return (
      <span
        css={css`
          vertical-align: middle;
        `}
      >
        {Icon}
      </span>
    );
  }
  return Icon;
};
ButtonIcon.displayName = 'ButtonIcon';

const FlatButton = (props: TFlatButtonProps) => {
  const dataProps = {
    'data-track-component': 'FlatButton',
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  const theme = useTheme();
  const overwrittenVars: TExtendedTheme = {
    ...vars,
    ...theme,
  };

  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={css`
        min-height: initial;
        align-items: center;
        ${props.as && props.as !== 'button'
          ? `white-space: normal;
               display: inline-block;`
          : ''};

        span {
          color: ${props.isDisabled
            ? overwrittenVars.colorNeutral
            : getTextColor(props.tone, false, overwrittenVars)};
        }

        svg * {
          fill: ${props.isDisabled
            ? overwrittenVars.colorNeutral
            : getTextColor(props.tone, false, overwrittenVars)};
        }

        * + span,
        * + svg {
          margin-left: ${vars.spacingXs};
        }

        ${!props.isDisabled
          ? `
            &:hover,
            &:focus {
              span {
                color: ${getTextColor(props.tone, true, overwrittenVars)};
              }
              svg * {
                fill: ${getTextColor(props.tone, true, overwrittenVars)};
              }
            }`
          : ''}
      `}
      buttonAttributes={dataProps}
    >
      {props.icon && props.iconPosition === 'left' && <ButtonIcon {...props} />}
      <Text.Body as="span">{props.label}</Text.Body>
      {props.icon && props.iconPosition === 'right' && (
        <ButtonIcon {...props} />
      )}
    </AccessibleButton>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.defaultProps = defaultProps;

export default FlatButton;
