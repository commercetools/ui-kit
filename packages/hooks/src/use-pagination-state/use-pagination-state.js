import { useState, useCallback } from 'react';

const defaultValues = {
  page: 1,
  perPage: 20,
};

const usePaginationState = (initialValues) => {
  const mergedValues = {
    ...defaultValues,
    ...initialValues,
  };

  const [page, setPage] = useState(mergedValues.page);
  const [perPage, setPerPage] = useState(mergedValues.perPage);

  const onPageChange = useCallback(
    (nextPage) => {
      setPage(nextPage);
    },
    [setPage]
  );

  const onPerPageChange = useCallback(
    (nextPerPage) => {
      // side-effect:
      // GIVEN client updates `perPage`,
      // THEN we reset `page` (discards initialValues.page)
      setPage(1);
      setPerPage(nextPerPage);
    },
    [setPerPage, setPage]
  );

  return {
    page: {
      value: page,
      onChange: onPageChange,
    },
    perPage: {
      value: perPage,
      onChange: onPerPageChange,
    },
  };
};

export default usePaginationState;
