import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

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

  cursor: ${props.onClick ? `pointer` : 'unset'};
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

const DataCell = props => (
  <BaseCell {...props}>
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
DataCell.displayName = 'DataCell';
DataCell.propTypes = {
  children: PropTypes.node,
  isTruncated: PropTypes.bool,
};

export { HeaderCell, DataCell };
