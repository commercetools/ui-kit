import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';
import Constraints from '../constraints';
import AccessibleButton from '../buttons/accessible-button';
import Text from '../typography/text';
import { CloseBoldIcon } from '../icons';

const getTextDetailColor = isDisabled => {
  if (isDisabled) return vars.colorGray60;
  return vars.colorBlack;
};

const getContentWrapperStyles = props => css`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  min-height: ${vars.sizeHeightTag};
  border-radius: ${vars.borderRadiusTag};
  padding: 5px ${vars.spacing8};
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
    ? vars.borderColorTagWarning
    : vars.borderColorTagPristine};

  /* fixing things for IE11 ... */
  width: 100%;
`;

const getWrapperBackgroundColor = type =>
  type === 'warning'
    ? vars.backgroundColorTagWarning
    : vars.backgroundColorTagPristine;

const getClickableContentWrapperStyles = ({ type, isRemoveable }) => {
  const base = [
    isRemoveable &&
      css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `,
  ];

  return type === 'warning'
    ? base
    : base.concat([
        css`
          &:hover {
            border-color: ${vars.borderColorTagFocus};
          }
        `,
      ]);
};

export const TagLinkBody = props => (
  <div
    css={[
      getContentWrapperStyles(props),
      !props.isDisabled &&
        css`
          cursor: pointer;
        `,
      !props.isDisabled &&
        Boolean(props.onRemove) &&
        css`
          padding-right: ${vars.spacing8};
        `,
      !props.isDisabled &&
        getClickableContentWrapperStyles({
          type: props.type,
          isRemoveable: Boolean(props.onRemove),
        }),
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
          css={css`
            color: ${getTextDetailColor(props.isDisabled)};
          `}
        >
          {props.children}
        </Text.Detail>
      </Link>
    ) : (
      <Text.Detail
        css={css`
          color: ${getTextDetailColor(props.isDisabled)};
        `}
      >
        {props.children}
      </Text.Detail>
    )}
  </div>
);

TagLinkBody.displayName = 'TagLinkBody';
TagLinkBody.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  linkTo: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export const TagNormalBody = props => (
  <div
    css={[
      getContentWrapperStyles(props),
      Boolean(props.onRemove) &&
        css`
          padding-right: ${vars.spacing8};
        `,
      !props.isDisabled &&
        Boolean(props.onClick) &&
        getClickableContentWrapperStyles({
          type: props.type,
          isRemoveable: Boolean(props.onRemove),
        }),
      !props.isDisabled &&
        Boolean(props.onClick) &&
        css`
          &:hover {
            box-shadow: ${vars.shadowBoxTagHover};
          }
        `,
    ]}
    onClick={props.isDisabled ? undefined : props.onClick}
  >
    <Text.Detail
      css={css`
        color: ${getTextDetailColor(props.isDisabled)};
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
};

const Tag = props => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <div
      css={[
        css`
          min-width: 0;
          display: flex;
          background-color: ${getWrapperBackgroundColor(props.type)};
        `,
      ]}
    >
      {props.linkTo ? (
        <TagLinkBody
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
          css={[
            css`
              border-color: ${vars.borderColorTagPristine};
              padding: 0 ${vars.spacing4};
              border-radius: 0 ${vars.borderRadiusTag} ${vars.borderRadiusTag} 0;
              display: flex;
              align-items: center;
              background: inherit;
              border-style: solid;
              border-width: 1px 1px 1px 0;
              &:hover {
                background-color: ${vars.backgroundColorTagNormalHover};
                box-shadow: ${vars.shadowBoxTagHover};
              }
              > svg * {
                fill: ${vars.fontColorDefault};
              }
            `,
            props.type === 'warning' &&
              css`
                border-color: ${vars.borderColorTagWarning};
                &:hover {
                  background-color: ${vars.borderColorTagWarning};
                }
              `,
            props.isDisabled &&
              css`
                &:hover {
                  background: inherit;
                  box-shadow: none;
                }
                > svg * {
                  fill: ${vars.colorGray60};
                }
              `,
          ]}
        >
          <CloseBoldIcon size="medium" />
        </AccessibleButton>
      )}
    </div>
  </Constraints.Horizontal>
);

Tag.propTypes = {
  type: PropTypes.oneOf(['normal', 'warning']),
  linkTo: PropTypes.string,
  isDisabled: PropTypes.bool,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  children: PropTypes.node.isRequired,
};
Tag.defaultProps = {
  type: 'normal',
  isDisabled: false,
  horizontalConstraint: 'scale',
};
Tag.displayName = 'Tag';

export default Tag;
