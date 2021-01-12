import React from 'react';
import PropTypes from 'prop-types';
import PageNavigator from './page-navigator';
import PageSizeSelector from './page-size-selector';
import Spacings from '@commercetools-uikit/spacings';
import styled from '@emotion/styled';

function Pagination(props) {
  const totalPages = Math.ceil(props.totalItems / props.pageSize);

  const currentPageItems =
    props.currentPage === totalPages
      ? props.totalItems - props.pageSize * (props.currentPage - 1)
      : props.pageSize;

  return (
    <Spacings.Inline justifyContent="space-between">
      <PageSizeSelector
        options={props.pageSizeOptions}
        pageSize={props.pageSize}
        currentPageItems={currentPageItems}
        onPageSizeChange={props.onPageSizeChange}
      />
      <PageNavigator
        totalPages={totalPages}
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
      />
    </Spacings.Inline>
  );
}
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  /**
   * Number of items per page
   */
  pageSize: PropTypes.number.isRequired,
  /**
   * Total number of items across all pages
   */
  totalItems: PropTypes.number.isRequired,
  /**
   * The currently selected page
   */
  currentPage: PropTypes.number.isRequired,
  /**
   * A callback function, called when the page is changed.
   * <br>
   * Signature: `(page: number) => void`
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * Options to display as pageSizes
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * A callback function, called when pageSize is changed.
   * <br>
   * Signature: `(pageSize: number) => void`
   */
  onPageSizeChange: PropTypes.func.isRequired,
};
Pagination.defaultProps = {
  pageSize: 20,
  pageSizeOptions: [20, 50],
};

export default Pagination;
