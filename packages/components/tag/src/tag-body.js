import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';

const Body = styled.div``;

const getClickableContentWrapperStyles = (type, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return type === 'warning'
    ? []
    : [
        css`
          &:hover {
            border-color: ${overwrittenVars[
              designTokens.borderColorForTagWhenFocused
            ]};
          }
        `,
      ];
};

const getTextDetailColor = (isDisabled, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };
  if (isDisabled)
    return overwrittenVars[designTokens.fontColorForTagWhenDisabled];
  return overwrittenVars[designTokens.fontColorForTag];
};

const getContentWrapperStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: ${overwrittenVars[designTokens.borderRadiusForTag]};
    padding: 5px ${vars.spacingS};
    white-space: normal;
    text-align: left;
    min-width: 0;
    overflow-wrap: break-word;
    hyphens: auto;
    border-style: solid;
    border-width: 1px;
    border-color: ${props.type === 'warning'
      ? overwrittenVars[designTokens.borderColorForTagWarning]
      : overwrittenVars[designTokens.borderColorForTag]};

    /* fixing things for IE11 ... */
    width: 100%;

    small {
      color: ${getTextDetailColor(props.isDisabled, theme)};
    }
  `;
};

const TagBody = (props) => {
  const theme = useTheme();
  return (
    <Body
      to={props.to}
      as={props.as}
      css={[
        getContentWrapperStyles(props, theme),
        Boolean(props.onRemove) &&
          css`
            padding-right: ${vars.spacingS};
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          `,
        !props.isDisabled &&
          Boolean(props.onClick) &&
          getClickableContentWrapperStyles(props.type, theme),
        !props.isDisabled &&
          Boolean(props.onClick) &&
          css`
            &:hover {
              box-shadow: ${vars.shadowBoxTagWhenHovered};
              &::after {
                position: absolute;
                right: -1px;
                content: '';
                background-color: ${vars.borderColorForTagWhenFocused};
                width: 1px;
                height: 100%;
              }
            }
          `,
        props.styles?.body,
      ]}
      onClick={props.isDisabled ? undefined : props.onClick}
    >
      <Text.Detail>{props.children}</Text.Detail>
    </Body>
  );
};

TagBody.displayName = 'TagBody';
TagBody.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  to: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    body: PropTypes.object,
  }),
};

export default TagBody;
