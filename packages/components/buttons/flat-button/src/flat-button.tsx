import type { Theme } from '@emotion/react';
import {
  MouseEvent,
  KeyboardEvent,
  ElementType,
  ReactElement,
  ComponentPropsWithRef,
  cloneElement,
} from 'react';
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
export type TFlatButtonProps<
  TStringOrComponent extends ElementType = 'button'
> = {
  /**
   * You may pass in a string like "a" to have the button element render an anchor tag, or
   * you could pass in a React Component, like a `Link`.
   * <br />
   * The `<FlatButton>` additionally accepts any props or attributes specific to the given element or component.
   */
  as?: TStringOrComponent;
  /**
   * Indicates the color scheme of the button.
   */
  tone?: 'primary' | 'secondary' | 'inverted';
  /**
   * Used as the HTML `type` attribute.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Should describe what the button is for.
   */
  label: string;
  /**
   * Handler when the button is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * The icon of the button.
   */
  icon?: ReactElement;
  /**
   * The position of the icon.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Determines if the button is disabled.
   * <br />
   * Note that this influences the `tone` and `onClick` will not be triggered in this state.
   */
  isDisabled?: boolean;
} & /**
 * Include any props derived from the React component passed to the `as` prop.
 * For example, given `as={Link}`, all props of the `<Link>` component are allowed to be
 * passed to `<FlatButton>`: <FlatButton as={Link} to="/foo" label="Foo" />.
 */ ComponentPropsWithRef<TStringOrComponent>;

const defaultProps: Pick<
  TFlatButtonProps,
  'tone' | 'isDisabled' | 'type' | 'iconPosition'
> = {
  tone: 'primary',
  type: 'button',
  iconPosition: 'left',
  isDisabled: false,
};

const ButtonIcon = <TStringOrComponent extends ElementType = 'button'>(
  props: Pick<
    TFlatButtonProps<TStringOrComponent>,
    'as' | 'isDisabled' | 'tone' | 'icon'
  >
) => {
  if (!props.icon) return null;
  const iconColor = getButtonIconColor(props);
  const Icon = cloneElement(props.icon, {
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

const FlatButton = <TStringOrComponent extends ElementType = 'button'>(
  props: TFlatButtonProps<TStringOrComponent>
) => {
  const buttonAttributes = {
    'data-track-component': 'FlatButton',
    // Forward valid attributes to the `<AccessibleButton>`.
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
      buttonAttributes={buttonAttributes}
    >
      {props.icon && props.iconPosition === 'left' && (
        <ButtonIcon<TStringOrComponent> {...props} />
      )}
      <Text.Body as="span">{props.label}</Text.Body>
      {props.icon && props.iconPosition === 'right' && (
        <ButtonIcon<TStringOrComponent> {...props} />
      )}
    </AccessibleButton>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.defaultProps = defaultProps;

export default FlatButton;
