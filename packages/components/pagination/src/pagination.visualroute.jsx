import { Pagination } from '@commercetools-uikit/pagination';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/pagination';

export const component = () => (
  <Suite>
    <Spec label="Pagination on first page (with 60 items)">
      <Pagination
        totalItems={60}
        page={1}
        onPageChange={() => null}
        onPerPageChange={() => null}
      />
    </Spec>
    <Spec label="Pagination on page in the middle (with 60 items)">
      <Pagination
        totalItems={60}
        page={2}
        onPageChange={() => null}
        onPerPageChange={() => null}
      />
    </Spec>
    <Spec label="Pagination on last page (with 60 items)">
      <Pagination
        totalItems={60}
        page={3}
        onPageChange={() => null}
        onPerPageChange={() => null}
      />
    </Spec>
  </Suite>
);
