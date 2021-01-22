import React from 'react';
import { Pagination } from '@commercetools-uikit/pagination';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/pagination';

export const component = () => (
  <Suite>
    <Spec label="Pagination on first page (with 60 items)">
      <Pagination
        totalItems={60}
        currentPage={1}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
    <Spec label="Pagination on page in the middle (with 60 items)">
      <Pagination
        totalItems={60}
        currentPage={2}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
    <Spec label="Pagination on last page (with 60 items)">
      <Pagination
        totalItems={60}
        currentPage={3}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
  </Suite>
);
