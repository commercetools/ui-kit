import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';
import designTokens from '../../../materials/design-tokens';
import Constraints from '../constraints';
import AccessibleButton from '../buttons/accessible-button';
import Text from '../typography/text';
import { CloseBoldIcon } from '../icons';

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
    cursor: default;
    font-family: inherit;
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
  `;
};

const getWrapperBackgroundColor = (type, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return type === 'warning'
    ? overwrittenVars[designTokens.backgroundColorForTagWarning]
    : overwrittenVars[designTokens.backgroundColorForTag];
};
const getClickableContentWrapperStyles = ({ type, theme }) => {
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

export const TagLinkBody = props => {
  const isRemoveable = Boolean(props.onRemove);
  return (
    <div
      css={theme => [
        getContentWrapperStyles(props, theme),
        !props.isDisabled &&
          css`
            cursor: pointer;
          `,
        !props.isDisabled &&
          isRemoveable &&
          css`
            padding-right: ${vars.spacingS};
            &:hover {
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
        !props.isDisabled &&
          getClickableContentWrapperStyles({
            type: props.type,
            theme,
          }),
        isRemoveable &&
          css`
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          `,
        props.styles.body,
      ]}
    >
      {!props.isDisabled ? (
        <Link
          onClick={props.onClick}
          to={props.linkTo}
          css={css`
            text-decoration: none;
          `}
        >
          <Text.Detail
            css={theme => css`
              color: ${getTextDetailColor(props.isDisabled, theme)};
            `}
          >
            {props.children}
          </Text.Detail>
        </Link>
      ) : (
        <Text.Detail
          css={theme => css`
            color: ${getTextDetailColor(props.isDisabled, theme)};
          `}
        >
          {props.children}
        </Text.Detail>
      )}
    </div>
  );
};

TagLinkBody.displayName = 'TagLinkBody';
TagLinkBody.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  linkTo: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    body: PropTypes.object,
  }).isRequired,
};

export const TagNormalBody = props => (
  <div
    css={theme => [
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
        getClickableContentWrapperStyles({
          type: props.type,
          theme,
        }),
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
      props.styles.body,
    ]}
    onClick={props.isDisabled ? undefined : props.onClick}
  >
    <Text.Detail
      css={theme => css`
        color: ${getTextDetailColor(props.isDisabled, theme)};
      `}
    >
      {props.children}
    </Text.Detail>
  </div>
);
TagNormalBody.displayName = 'TagNormalBody';
TagNormalBody.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    body: PropTypes.object,
  }).isRequired,
};

const Tag = props => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <div
      css={theme => [
        css`
          min-width: 0;
          display: flex;
          background-color: ${getWrapperBackgroundColor(props.type, theme)};
        `,
      ]}
    >
      {props.linkTo ? (
        <TagLinkBody
          styles={props.styles}
          type={props.type}
          onClick={props.onClick}
          onRemove={props.onRemove}
          linkTo={props.linkTo}
          isDisabled={props.isDisabled}
        >
          {props.children}
        </TagLinkBody>
      ) : (
        <TagNormalBody
          styles={props.styles}
          type={props.type}
          onClick={props.onClick}
          onRemove={props.onRemove}
          isDisabled={props.isDisabled}
        >
          {props.children}
        </TagNormalBody>
      )}
      {Boolean(props.onRemove) && (
        <AccessibleButton
          label="Remove"
          isDisabled={props.isDisabled}
          onClick={props.isDisabled ? undefined : props.onRemove}
          css={theme => {
            const overwrittenVars = {
              ...vars,
              ...theme,
            };

            return [
              css`
                border-color: ${props.type === 'warning'
                  ? overwrittenVars[designTokens.borderColorForTagWarning]
                  : overwrittenVars[designTokens.borderColorForTag]};
                padding: 0 ${vars.spacingXs};
                border-radius: 0
                  ${overwrittenVars[designTokens.borderRadiusForTag]}
                  ${overwrittenVars[designTokens.borderRadiusForTag]} 0;
                display: flex;
                align-items: center;
                background: inherit;
                border-style: solid;
                border-width: 1px 1px 1px 1px;
                &:hover,
                &:focus {
                  border-color: ${overwrittenVars[
                    designTokens.borderColorForTagWarning
                  ]};

                  > svg * {
                    fill: ${overwrittenVars[
                      designTokens.borderColorForTagWarning
                    ]};
                  }
                }
                > svg * {
                  fill: ${overwrittenVars[designTokens.fontColorForTag]};
                }
              `,
              props.isDisabled &&
                css`
                  > svg * {
                    fill: ${overwrittenVars[
                      designTokens.fontColorForTagWhenDisabled
                    ]};
                  }
                `,
            ];
          }}
        >
          <CloseBoldIcon size="medium" />
        </AccessibleButton>
      )}
    </div>
  </Constraints.Horizontal>
);

Tag.propTypes = {
  type: PropTypes.oneOf(['normal', 'warning']),
  styles: PropTypes.shape({
    body: PropTypes.object,
  }).isRequired,
  linkTo: PropTypes.string,
  isDisabled: PropTypes.bool,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};
Tag.defaultProps = {
  type: 'normal',
  styles: {
    body: {},
  },
  isDisabled: false,
  horizontalConstraint: 'scale',
};
Tag.displayName = 'Tag';

export default Tag;
