import type { TTagProps } from './tag';

import { ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { DragIcon } from '@commercetools-uikit/icons';

export type TTagBodyProps = {
  to?: TTagProps['to'];
  as?: ElementType;
  onClick?: TTagProps['onClick'];
  onRemove?: TTagProps['onRemove'];
  isDisabled?: boolean;
  isDraggable?: boolean;
  children: ReactNode;
  styles?: TTagProps['styles'];
};

const defaultProps: Pick<TTagProps, 'isDisabled' | 'isDraggable'> = {
  isDisabled: false,
  isDraggable: false,
};

type TBody = Pick<TTagBodyProps, 'to' | 'as'>;
const Body = styled.div<TBody>``;

const getTextDetailColor = (isDisabled: TTagBodyProps['isDisabled']) => {
  if (isDisabled) return designTokens.colorNeutral60;
  return designTokens.colorSolid;
};

const getContentWrapperStyles = (props: TTagBodyProps) => {
  return css`
    all: unset;
    position: relative;
    display: flex;
    align-items: center;
    gap: ${designTokens.spacing20};
    padding-top: ${designTokens.spacing10};
    padding-bottom: ${designTokens.spacing10};
    padding-left: ${designTokens.spacing25};
    padding-right: ${!props.isDisabled && props.onRemove
      ? '0'
      : designTokens.spacing25};
    white-space: normal;
    text-align: left;
    min-width: 0;
    overflow-wrap: break-word;
    hyphens: auto;
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
      {props.isDraggable && !props.isDisabled ? (
        <DragIcon data-testid="drag-icon" size="medium" />
      ) : null}
      <Text.Detail tone={textTone} as="span">
        {props.children}
      </Text.Detail>
    </Body>
  );
};

TagBody.defaultProps = defaultProps;
TagBody.displayName = 'TagBody';

export default TagBody;
