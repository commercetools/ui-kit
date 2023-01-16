// TODO: @redesign cleanup
import type { TTagProps } from './tag';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { DragIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import AccessibleButton from '@commercetools-uikit/accessible-button';

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
            border-color: ${designTokens.borderColorForTagWhenFocused};
          }
        `,
      ];
};

const getTextDetailColor = (isDisabled: TTagBodyProps['isDisabled']) => {
  if (isDisabled) return designTokens.fontColorForTagWhenDisabled;
  return designTokens.colorSolid;
};

const getContentWrapperStyles = (props: TTagBodyProps, isNewTheme: boolean) => {
  return css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: ${designTokens.borderRadius2};
    padding: ${designTokens.paddingForTag};
    white-space: normal;
    text-align: left;
    min-width: 0;
    overflow-wrap: break-word;
    hyphens: auto;
    border-style: solid;
    border-width: 1px;
    border-color: ${props.type === 'warning'
      ? designTokens.colorWarning
      : designTokens.borderColorForTag};
    color: ${designTokens.fontColorForTag};

    /* fixing things for IE11 ... */
    width: 100%;

    small {
      color: ${getTextDetailColor(props.isDisabled)};
    }

    ${props.isDisabled &&
    isNewTheme &&
    `
      * {
        color: ${designTokens.colorNeutral60} !important;
      }
    `}
  `;
};

const TagBody = (props: TTagBodyProps) => {
  const { themedValue, isNewTheme } = useTheme();
  const textTone = props.isDisabled ? 'secondary' : 'inherit';
  const TextComponent = themedValue(Text.Detail, Text.Body);

  return (
    <Body
      to={props.to}
      as={props.as}
      css={[
        getContentWrapperStyles(props, isNewTheme),
        Boolean(props.onRemove) &&
          css`
            border-right: ${!(props.isDisabled && isNewTheme) && '0'};
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
              box-shadow: ${designTokens.shadowBoxTagWhenHovered};
              &::after {
                position: absolute;
                right: -1px;
                content: '';
                background-color: ${props.type === 'warning'
                  ? designTokens.colorWarning
                  : designTokens.borderColorForTagWhenFocused};
                width: 1px;
                height: 100%;
              }
            }
          `,
        props.styles?.body,
      ]}
      onClick={props.isDisabled ? undefined : props.onClick}
    >
      <Spacings.Inline scale="s" alignItems="center">
        {props.isDraggable && !props.isDisabled ? (
          <AccessibleButton
            label="Drag"
            isDisabled={props.isDisabled}
            css={[
              css`
                > svg * {
                  fill: ${designTokens.fontColorForTagDragIcon} !important;
                }
              `,
            ]}
          >
            <DragIcon
              data-testid="drag-icon"
              size="medium"
              color={themedValue('solid', undefined)}
            />
          </AccessibleButton>
        ) : null}
        <TextComponent tone={textTone}>{props.children}</TextComponent>
      </Spacings.Inline>
    </Body>
  );
};

TagBody.defaultProps = defaultProps;
TagBody.displayName = 'TagBody';

export default TagBody;
