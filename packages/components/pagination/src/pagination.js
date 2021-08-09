import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Spacings from '@commercetools-uikit/spacings';
import PageNavigator from './page-navigator';
import PageSizeSelector from './page-size-selector';

const Pagination = (props) => {
  const totalPages = Math.ceil(props.totalItems / props.perPage);

  const pageItems =
    props.page === totalPages
      ? props.totalItems - props.perPage * (props.page - 1)
      : props.perPage;

  return (
    <Spacings.Inline justifyContent="space-between">
      <div
        css={css`
          flex-grow: 2;
        `}
      >
        <PageSizeSelector
          pageItems={pageItems}
          perPage={props.perPage}
          perPageRange={props.perPageRange}
          onPerPageChange={props.onPerPageChange}
        />
      </div>
      <PageNavigator
        totalPages={totalPages}
        page={props.page}
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
   * The current page
   */
  page: PropTypes.number.isRequired,
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
  perPage: PropTypes.number,
  /**
   * Range of items per page.
   * <br/>
   * `s: 20,50`
   * <br/>
   * `m: 20,50,100`
   * <br/>
   * `l: 200,500`
   */
  perPageRange: PropTypes.oneOf(['s', 'm', 'l']),
  /**
   * A callback function, called when `perPage` is changed.
   * <br/>
   * Signature: `(nextPerPage: number) => void`
   */
  onPerPageChange: PropTypes.func.isRequired,
};
Pagination.defaultProps = {
  perPage: 20,
  perPageRange: 's',
};

export default Pagination;
