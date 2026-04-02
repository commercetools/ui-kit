import type { TLocationDescriptor } from '@commercetools-uikit/router-provider';

import { cloneElement, ReactElement } from 'react';
import {
  useNavigate,
  locationDescriptorToString,
} from '@commercetools-uikit/router-provider';
import {
  designTokens,
  type TIconProps,
} from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  useWarnDeprecatedComponent,
  filterInvalidAttributes,
} from '@commercetools-uikit/utils';
import Inline from '@commercetools-uikit/spacings-inline';
import Text from '@commercetools-uikit/text';

export type TLinkButtonProps = {
  /**
   * Should describe what the button is for.
   */
  label: string;

  /**
   * A string or an object representing the link location.
   */
  to: string | TLocationDescriptor;

  /**
   * The icon of the button.
   */
  iconLeft?: ReactElement<TIconProps>;

  /**
   * Determines if the button is disabled.
   * <br />
   * Note that this influences the `tone` and `onClick` will not be triggered in this state.
   */
  isDisabled?: boolean;

  /**
   * Determines if the button link should be a normal `<a>` element or not.
   */
  isExternal?: boolean;
};

const hoverStyles = css`
  &:hover,
  &:focus,
  &:active {
    span {
      color: ${designTokens.colorPrimary25};
    }

    svg * {
      fill: ${designTokens.colorPrimary25};
    }
  }
`;

const StyledExternalLink = styled.a<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  border: none;
  background: none;
  padding: 0;
  min-height: initial;
  text-decoration: none;

  span {
    color: ${(props) =>
      props.disabled ? designTokens.colorNeutral : designTokens.colorPrimary};
  }

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) => !props.disabled && hoverStyles}
`;

const LinkBody = (
  props: Pick<TLinkButtonProps, 'iconLeft' | 'label'> & { disabled?: boolean }
) => (
  <Inline scale="xs" alignItems="center">
    {props.iconLeft
      ? cloneElement(props.iconLeft, {
          size: 'medium',
          color: props.disabled ? 'neutral60' : 'primary',
        })
      : null}
    <Text.Body as="span">{props.label}</Text.Body>
  </Inline>
);

LinkBody.displayName = 'LinkBody';

const LinkButton = ({
  isDisabled = false,
  isExternal = false,
  ...props
}: TLinkButtonProps) => {
  useWarnDeprecatedComponent('LinkButton');
  const navigate = useNavigate();
  const remainingProps = filterInvalidAttributes({
    isDisabled,
    isExternal,
    ...props,
  });

  if (isExternal) {
    if (typeof props.to !== 'string') {
      throw new Error('`to` must be a `string` when `isExternal` is provided.');
    }

    return (
      <StyledExternalLink
        href={props.to}
        onClick={isDisabled ? (event) => event.preventDefault() : undefined}
        disabled={isDisabled}
        data-track-component="LinkButton"
        aria-label={props.label}
        {...remainingProps}
      >
        <LinkBody
          iconLeft={props.iconLeft}
          disabled={isDisabled}
          label={props.label}
        />
      </StyledExternalLink>
    );
  }

  return (
    <StyledExternalLink
      href={locationDescriptorToString(props.to)}
      disabled={isDisabled}
      onClick={
        isDisabled
          ? (event) => event.preventDefault()
          : navigate
          ? (event) => {
              event.preventDefault();
              navigate(props.to);
            }
          : undefined
      }
      data-track-component="LinkButton"
      aria-label={props.label}
      {...remainingProps}
    >
      <LinkBody
        iconLeft={props.iconLeft}
        disabled={isDisabled}
        label={props.label}
      />
    </StyledExternalLink>
  );
};

LinkButton.displayName = 'LinkButton';

export default LinkButton;
