import React from 'react';
import { Pagination } from '@commercetools-uikit/pagination';

const Example = () => {
  const items = [{ id: '1' }, { id: '2' }];
  return (
    <Pagination
      totalItems={items.length}
      currentPage={1}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
    />
  );
};

export default Example;
