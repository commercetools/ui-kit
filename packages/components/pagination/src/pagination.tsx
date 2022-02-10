import { css } from '@emotion/react';
import Spacings from '@commercetools-uikit/spacings';
import PageNavigator from './page-navigator';
import PageSizeSelector, { PAGE_RANGE } from './page-size-selector';

type TPaginationProps = {
  /**
   * Total number of items across all pages
   */
  totalItems: number;

  /**
   * The current page
   */
  page: number;

  /**
   * A callback function, called when the page is changed.
   */
  onPageChange: (newPage: number) => void;

  /**
   * Number of items per page, according to the pre-defined range values.
   */
  perPage: number;

  /**
   * Range of items per page.
   * <br/>
   * `SMALL: 20,50`
   * <br/>
   * `MEDIUM: 20,50,100`
   * <br/>
   * `LARGE: 200,500`
   */
  perPageRange: PAGE_RANGE;

  /**
   * A callback function, called when `perPage` is changed.
   */
  onPerPageChange: (newPerPage: number) => void;
};

const Pagination = (props: TPaginationProps) => {
  const totalPages = Math.ceil(props.totalItems / props.perPage);

  const pageItems =
    props.page === totalPages
      ? props.totalItems - props.perPage * (props.page - 1)
      : props.perPage;

  console.log(
    'Pagination props:',
    JSON.stringify({ ...props, totalPages, pageItems }, null, 2)
  );

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

const defaultProps = {
  perPage: 20,
  perPageRange: PAGE_RANGE.SMALL,
};
Pagination.defaultProps = defaultProps;

export { PAGE_RANGE };

export default Pagination;
