import type { TTagProps } from './tag';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { designTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { DragIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';

export type TTagBodyProps = {
  to?: TTagProps['to'];
  as?: typeof Link;
  type?: TTagProps['type'];
  onClick?: TTagProps['onClick'];
  onRemove?: TTagProps['onRemove'];
  isDisabled?: boolean;
  isDraggable?: boolean;
  children: ReactNode;
  styles?: TTagProps['styles'];
};

const defaultProps: Pick<TTagProps, 'type' | 'isDisabled' | 'isDraggable'> = {
  type: 'normal',
  isDisabled: false,
  isDraggable: false,
};

type TBody = Pick<TTagBodyProps, 'to' | 'as'>;
const Body = styled.div<TBody>``;

const getClickableContentWrapperStyles = (type: TTagBodyProps['type']) => {
  return type === 'warning'
    ? []
    : [
        css`
          &:hover {
            border-color: ${designTokens.colorNeutral};
          }
        `,
      ];
};

const getTextDetailColor = (isDisabled: TTagBodyProps['isDisabled']) => {
  if (isDisabled) return designTokens.colorNeutral60;
  return designTokens.colorSolid;
};

const getContentWrapperStyles = (props: TTagBodyProps) => {
  return css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: ${designTokens.borderRadius2};
    padding: ${designTokens.spacing05} ${designTokens.spacing25};
    white-space: normal;
    text-align: left;
    min-width: 0;
    overflow-wrap: break-word;
    hyphens: auto;
    border-style: solid;
    border-width: 1px;
    border-color: ${props.type === 'warning'
      ? designTokens.colorWarning
      : designTokens.colorNeutral};
    color: ${designTokens.colorSolid};
    fill: ${designTokens.colorNeutral40};

    /* fixing things for IE11 ... */
    width: 100%;

    small {
      color: ${getTextDetailColor(props.isDisabled)};
    }

    ${props.isDisabled &&
    `
      * {
        color: ${designTokens.colorNeutral60} !important;
      }
    `}
  `;
};

const TagBody = (props: TTagBodyProps) => {
  const textTone = props.isDisabled ? 'secondary' : 'inherit';

  return (
    <Body
      to={props.to}
      as={props.as}
      css={[
        getContentWrapperStyles(props),
        Boolean(props.onRemove) &&
          css`
            border-right: ${!props.isDisabled && '0'};
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
              box-shadow: ${designTokens.shadow0};
            }
          `,
        props.styles?.body,
      ]}
      onClick={props.isDisabled ? undefined : props.onClick}
    >
      <Spacings.Inline scale="s" alignItems="center">
        {props.isDraggable && !props.isDisabled ? (
          <DragIcon data-testid="drag-icon" size="medium" />
        ) : null}
        <Text.Body tone={textTone} as="span">
          {props.children}
        </Text.Body>
      </Spacings.Inline>
    </Body>
  );
};

TagBody.defaultProps = defaultProps;
TagBody.displayName = 'TagBody';

export default TagBody;
