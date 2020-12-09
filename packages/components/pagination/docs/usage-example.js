import React from 'react';
import Pagination from '@commercetools-uikit/pagination';

const Example = ({ items }) => (
  <Pagination
    totalItems={items.length}
    currentPage={1}
    onPageChange={() => {}}
    onPageSizeChange={() => {}}
  />
);

export default Example;
