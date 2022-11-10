import type { LocationDescriptor } from 'history';
import type { MessageDescriptor } from 'react-intl';
import {
  Children,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import styled from '@emotion/styled';
import { Link as ReactRouterLink } from 'react-router-dom';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { designTokens } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';
import { ExternalLinkIcon } from '@commercetools-uikit/icons';

type TLinkProps = {
  /**
   * Value of the link.
   * <br />
   * Required if `intlMessage` is not provided.
   */
  children?: ReactNode;
  /**
   * An `intl` message object that will be rendered with `FormattedMessage`.
   * <br />
   * Required if `children` is not provided.
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * A flag to indicate if the Link points to an external source.
   * <bt />
   * If `true`, a regular `<a>` is rendered instead of the default `react-router`s `<Link />`
   */
  isExternal: boolean;
  /**
   * The URL that the Link should point to.
   */
  to: string | LocationDescriptor;
  /**
   * Color of the link
   */
  tone?: 'primary' | 'inverted';

  /**
   * Handler when the link is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLLinkElement> | KeyboardEvent<HTMLLinkElement>
  ) => void;
};
type TIconColor = 'primary' | 'surface';

const warnIfMissingContent = (props: TLinkProps) => {
  const hasContent =
    Boolean(props.intlMessage) || Boolean(Children.count(props.children));

  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`intlMessage\` is marked as required in \`Link\``,
      'but its value is `undefined`',
    ].join(' ')
  );
  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`children\` is marked as required in \`Link\``,
      'but its value is `undefined`',
    ].join(' ')
  );
};

const defaultProps: Pick<TLinkProps, 'tone' | 'isExternal'> = {
  tone: 'primary',
  isExternal: false,
};

const getTextColorValue = (tone: TLinkProps['tone'] = 'primary') => {
  if (tone === 'primary') {
    return designTokens.colorPrimary;
  }

  return designTokens.fontColorForTextWhenInverted;
};
const getIconColorValue = (
  tone: TLinkProps['tone'] = 'primary'
): TIconColor => {
  if (tone === 'inverted') {
    return 'surface';
  }

  return tone;
};
const getActiveColorValue = (tone: string = 'primary') => {
  if (tone === 'primary') {
    return designTokens.colorPrimary25;
  }

  return designTokens.fontColorForTextWhenInverted;
};

const getLinkStyles = (props: TLinkProps) => {
  const color = getTextColorValue(props.tone);
  const hoverColor = getActiveColorValue(props.tone);

  return css`
    font-family: inherit;
    color: ${color};
    font-size: ${designTokens.fontSizeDefault};
    &:hover,
    &:focus,
    &:active {
      color: ${hoverColor};
    }
    text-decoration: underline;
  `;
};

const Wrapper = styled.span`
  > svg {
    margin: 0 0 0 ${designTokens.spacingXs} !important;
    vertical-align: bottom;
  }
`;

const Link = (props: TLinkProps) => {
  const remainingProps = filterInvalidAttributes(props);

  // `filterInvalidAttributes` strips off `intlMessage` and `children`
  // so we pass in the "raw" props instead.
  warnIfMissingContent(props);

  if (props.isExternal) {
    if (typeof props.to !== 'string') {
      throw new Error('`to` must be a `string` when `isExternal` is provided.');
    }

    return (
      <Wrapper>
        <a
          css={getLinkStyles(props)}
          href={props.to}
          target="_blank"
          rel="noopener noreferrer"
          {...remainingProps}
        >
          {props.intlMessage ? (
            <FormattedMessage {...props.intlMessage} />
          ) : (
            props.children
          )}
        </a>
        {props.isExternal && (
          <ExternalLinkIcon
            size="medium"
            color={getIconColorValue(props.tone)}
          />
        )}
      </Wrapper>
    );
  }

  return (
    <ReactRouterLink
      css={getLinkStyles(props)}
      to={props.to}
      {...remainingProps}
    >
      {props.intlMessage ? (
        <FormattedMessage {...props.intlMessage} />
      ) : (
        props.children
      )}
    </ReactRouterLink>
  );
};

Link.displayName = 'Link';
Link.defaultProps = defaultProps;

export default Link;
