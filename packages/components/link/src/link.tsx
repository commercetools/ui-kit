import type { LocationDescriptor } from 'history';
import type { Theme } from '@emotion/react';
import type { MessageDescriptor } from 'react-intl';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes, warning } from '@commercetools-uikit/utils';

type TExtendedTheme = Theme & {
  [key: string]: string;
};

type TLinkProps = {
  /**
   * Value of the link.
   * <br />
   * Required if `intlMessage` is not provided.
   */
  children: React.ReactNode;
  /**
   * An `intl` message object that will be rendered with `FormattedMessage`.
   * <br />
   * Required if `children` is not provided.
   */
  intlMessage?: MessageDescriptor;
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
};

const warnIfMissingContent = (props: TLinkProps) => {
  const hasContent =
    props.intlMessage || Boolean(React.Children.count(props.children));

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

const getColorValue = (
  tone: string = 'primary',
  overwrittenVars: TExtendedTheme
) => {
  if (tone === 'primary') {
    return overwrittenVars.colorPrimary;
  }

  return overwrittenVars.fontColorForTextWhenInverted;
};
const getActiveColorValue = (
  tone: string = 'primary',
  overwrittenVars: TExtendedTheme
) => {
  if (tone === 'primary') {
    return overwrittenVars.colorPrimary25;
  }

  return overwrittenVars.fontColorForTextWhenInverted;
};

const getLinkStyles = (props: TLinkProps, theme: Theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  const color = getColorValue(props.tone, overwrittenVars);
  const hoverColor = getActiveColorValue(props.tone, overwrittenVars);

  return css`
    font-family: inherit;
    color: ${color};
    font-size: ${overwrittenVars.fontSizeDefault};
    text-decoration: underline;
    &:hover,
    &:focus,
    &:active {
      color: ${hoverColor};
    }
  `;
};

const Link = (props: TLinkProps) => {
  const theme = useTheme();

  const remainingProps = filterInvalidAttributes(props);

  // `filterInvalidAttributes` strips off `intlMessage` and `children`
  // so we pass in the "raw" props instead.
  warnIfMissingContent(props);

  if (props.isExternal) {
    if (typeof props.to !== 'string') {
      throw new Error('`to` must be a `string` when `isExternal` is provided.');
    }

    return (
      <a
        css={getLinkStyles(props, theme)}
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
    );
  }

  return (
    <ReactRouterLink
      css={getLinkStyles(props, theme)}
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
