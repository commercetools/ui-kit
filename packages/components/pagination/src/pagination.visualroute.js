import React from 'react';
import { Pagination } from '@commercetools-uikit/pagination';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/pagination';

export const component = () => (
  <Suite>
    <Spec label="default (with 60 items)">
      <Pagination
        totalItems={60}
        currentPage={1}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
    <Spec label="on last page (with 60 items)">
      <Pagination
        totalItems={60}
        currentPage={3}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
    <Spec label="with different page size">
      <Pagination
        totalItems={60}
        currentPage={1}
        pageSize={42}
        onPageSizeChange={() => null}
        onPageChange={() => null}
      />
    </Spec>
  </Suite>
);
