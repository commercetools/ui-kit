import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import omit from 'lodash/omit';

const getCellCursorStyle = (isCellClickable, shouldIgnoreRowClick) => {
  if (isCellClickable) return 'pointer';
  if (shouldIgnoreRowClick) return 'auto';
  return 'unset';
};

const getCellPadding = (isCondensed, noPadding) => {
  if (noPadding) return 0;
  if (isCondensed) return `${vars.spacingXs} ${vars.spacingXs}`;
  return `${vars.spacingS} ${vars.spacingM}`;
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
  overflow: ${props.isTruncated ? 'hidden' : 'unset'};

  border-right: 1px solid ${vars.colorNeutral90};
  border-bottom: 1px solid ${vars.colorNeutral90};

  padding: ${getCellPadding(props.isCondensed, props.noPadding)};

  cursor: ${getCellCursorStyle(props.isClickable, props.shouldIgnoreRowClick)};
`;

// Header Cell Types

const BaseHeaderCell = styled.th`
  ${getCellStyles}
  ${getCellAlignment}
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};
  font-weight: normal;
`;

const SortableHeaderCell = props => {
  const isActive = props.sortBy === props.columnKey;
  // Always reset the sortDirection when clicking a different column
  const currentSortDirection = isActive ? props.sortDirection : 'asc';
  const Icon = currentSortDirection === 'desc' ? AngleDownIcon : AngleUpIcon;

  const IconComponent = styled(Icon)`
    visibility: ${isActive ? 'visible' : 'hidden'};
  `;
  const ButtonContainer = styled(AccessibleButton)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    padding: ${getCellPadding(props.isCondensed)};

    & ${IconComponent} {
      margin-left: ${vars.spacingS};
    }

    &:hover,
    &:focus {
      cursor: pointer;

      ${IconComponent} {
        visibility: visible;
        transform: rotate(180deg);

        * {
          fill: ${vars.colorNeutral};
        }
      }
    }
  `;

  return (
    <BaseHeaderCell
      onClick={() => props.onSortChange(props.columnKey, props.sortDirection)}
      {...omit(props, ['onSortChange'])}
      // Remove padding here to make whole Cell clickable
      noPadding
    >
      <ButtonContainer label={currentSortDirection}>
        {props.children}
        <IconComponent size="medium" color="surface" />
      </ButtonContainer>
    </BaseHeaderCell>
  );
};
SortableHeaderCell.displayName = 'SortableHeaderCell';
SortableHeaderCell.propTypes = {
  sortBy: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  isCondensed: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
};

const HeaderCell = props => {
  if (!props.isSortable) {
    return <BaseHeaderCell {...omit(props, ['onSortChange'])} />;
  }
  return <SortableHeaderCell {...props} />;
};
HeaderCell.displayName = 'HeaderCell';
HeaderCell.propTypes = {
  isSortable: PropTypes.bool,
};

// Row Cell Types

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
  children: PropTypes.node.isRequired,
  isTruncated: PropTypes.bool,
  shouldIgnoreRowClick: PropTypes.bool,
};
DataCell.defaultProps = {
  isTruncated: false,
  shouldIgnoreRowClick: false,
};

export { HeaderCell, DataCell };
