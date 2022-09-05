import type { TTagProps } from './tag';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { Link } from 'react-router-dom';

export type TTagBodyProps = {
  to?: TTagProps['to'];
  as?: typeof Link;
  type?: TTagProps['type'];
  onClick?: TTagProps['onClick'];
  onRemove?: TTagProps['onRemove'];
  isDisabled?: boolean;
  children: ReactNode;
  styles?: TTagProps['styles'];
};

const defaultProps: Pick<TTagProps, 'type' | 'isDisabled'> = {
  type: 'normal',
  isDisabled: false,
};

type TBody = Pick<TTagBodyProps, 'to' | 'as'>;
const Body = styled.div<TBody>``;

const getClickableContentWrapperStyles = (type: TTagBodyProps['type']) => {
  return type === 'warning'
    ? []
    : [
        css`
          &:hover {
            border-color: ${customProperties.borderColorForTagWhenFocused};
          }
        `,
      ];
};

const getTextDetailColor = (isDisabled: TTagBodyProps['isDisabled']) => {
  if (isDisabled) return customProperties.fontColorForTagWhenDisabled;
  return customProperties.fontColorForTag;
};

const getContentWrapperStyles = (props: TTagBodyProps) => {
  return css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: ${customProperties.borderRadiusForTag};
    padding: 5px ${customProperties.spacingS};
    white-space: normal;
    text-align: left;
    min-width: 0;
    overflow-wrap: break-word;
    hyphens: auto;
    border-style: solid;
    border-width: 1px;
    border-color: ${props.type === 'warning'
      ? customProperties.borderColorForTagWarning
      : customProperties.borderColorForTag};

    /* fixing things for IE11 ... */
    width: 100%;

    small {
      color: ${getTextDetailColor(props.isDisabled)};
    }
  `;
};

const TagBody = (props: TTagBodyProps) => {
  const textTone = props.isDisabled ? 'secondary' : undefined;
  return (
    <Body
      to={props.to}
      as={props.as}
      css={[
        getContentWrapperStyles(props),
        Boolean(props.onRemove) &&
          css`
            padding-right: ${customProperties.spacingS};
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          `,
        !props.isDisabled &&
          Boolean(props.onClick) &&
          getClickableContentWrapperStyles(props.type),
        !props.isDisabled &&
          Boolean(props.onClick) &&
          css`
            &:hover {
              box-shadow: ${customProperties.shadowBoxTagWhenHovered};
              &::after {
                position: absolute;
                right: -1px;
                content: '';
                background-color: ${customProperties.borderColorForTagWhenFocused};
                width: 1px;
                height: 100%;
              }
            }
          `,
        props.styles?.body,
      ]}
      onClick={props.isDisabled ? undefined : props.onClick}
    >
      <Text.Detail tone={textTone}>{props.children}</Text.Detail>
    </Body>
  );
};

TagBody.defaultProps = defaultProps;
TagBody.displayName = 'TagBody';

export default TagBody;
