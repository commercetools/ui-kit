import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Spacings from '@commercetools-uikit/spacings';
import PageNavigator from './page-navigator';
import PageSizeSelector from './page-size-selector';

const Pagination = (props) => {
  const totalPages = Math.ceil(props.totalItems / props.pageSize);

  const currentPageItems =
    props.currentPage === totalPages
      ? props.totalItems - props.pageSize * (props.currentPage - 1)
      : props.pageSize;

  return (
    <Spacings.Inline justifyContent="space-between">
      <div
        css={css`
          flex-grow: 2;
        `}
      >
        <PageSizeSelector
          pageSize={props.pageSize}
          pageSizeRange={props.pageSizeRange}
          currentPageItems={currentPageItems}
          onPageSizeChange={props.onPageSizeChange}
        />
      </div>
      <PageNavigator
        totalPages={totalPages}
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
      />
    </Spacings.Inline>
  );
};
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
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
   * <br/>
   * Signature: `(page: number) => void`
   * <br/>
   * Signature: `(page: number) => void`
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * Number of items per page, according to the pre-defined range values.
   */
  pageSize: PropTypes.number,
  /**
   * Range of items per page.
   * <br/>
   * `s: 20,50`
   * <br/>
   * `m: 20,50,100`
   * <br/>
   * `l: 200,500`
   */
  pageSizeRange: PropTypes.oneOf(['s', 'm', 'l']),
  /**
   * A callback function, called when pageSize is changed.
   * <br/>
   * Signature: `(pageSize: number) => void`
   */
  onPageSizeChange: PropTypes.func.isRequired,
};
Pagination.defaultProps = {
  pageSize: 20,
  pageSizeRange: 's',
};

export default Pagination;
