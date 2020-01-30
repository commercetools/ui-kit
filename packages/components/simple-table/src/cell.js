import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getCellCursorStyle = (isCellClickable, shouldIgnoreRowClick) => {
  if (isCellClickable) return 'pointer';
  if (shouldIgnoreRowClick) return 'auto';
  return 'unset';
};

const getCellAlignment = props => {
  if (props.alignment === 'center') {
    return css`
      justify-content: center;
      text-align: center;
    `;
  }
  if (props.alignment === 'right') {
    return css`
      justify-content: flex-end;
      text-align: right;
    `;
  }
  return css`
    justify-content: flex-start;
    text-align: left;
  `;
};

const getCellStyles = props => css`
  display: flex;
  align-items: center;
  overflow: hidden;

  border-right: 1px solid ${vars.colorNeutral90};
  border-bottom: 1px solid ${vars.colorNeutral90};

  padding: ${props.isCondensed
    ? `${vars.spacingXs} ${vars.spacingXs}`
    : `${vars.spacingS} ${vars.spacingM}`};

  cursor: ${getCellCursorStyle(props.isClickable, props.shouldIgnoreRowClick)};
`;

const HeaderCell = styled.th`
  ${getCellStyles}
  ${getCellAlignment}
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};
  font-weight: normal;
`;

const BaseCell = styled.td`
  ${getCellStyles}
  ${getCellAlignment}
`;

const DataCell = props => {
  const onClick = event => {
    if (props.shouldIgnoreRowClick) event.stopPropagation();
    return props.onClick && props.onClick(event);
  };

  return (
    <BaseCell {...props} onClick={onClick} isClickable={props.onClick}>
      {props.isTruncated ? (
        <div
          css={css`
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          `}
        >
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </BaseCell>
  );
};
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  onClick: PropTypes.func,
  children: PropTypes.node,
  isTruncated: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
};
DataCell.defaultProps = {
  shouldIgnoreRowClick: false,
};

export { HeaderCell, DataCell };
