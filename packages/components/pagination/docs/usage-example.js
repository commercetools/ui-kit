import React from 'react';
import { Pagination } from '@commercetools-uikit/pagination';

const Example = () => {
  const items = [{ id: '1' }, { id: '2' }];
  return (
    <Pagination
      totalItems={items.length}
      page={1}
      onPageChange={() => {}}
      onPerPageChange={() => {}}
    />
  );
};

export default Example;
