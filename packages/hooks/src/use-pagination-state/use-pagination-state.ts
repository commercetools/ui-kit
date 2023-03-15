import { useState, useCallback } from 'react';
import isNil from 'lodash/isNil';

export type TPaginationDefinition = {
  page: number;
  perPage: number;
};
export type TState = {
  value: number;
  onChange: (value: number) => void;
};
export type TPaginationState = {
  [P in keyof TPaginationDefinition]: TState;
};

const applyIf = (
  values: Partial<TPaginationDefinition>,
  key: 'page' | 'perPage'
): Partial<TPaginationDefinition> =>
  !isNil(values[key]) ? { [key]: values[key] } : {};

const defaultValues: TPaginationDefinition = {
  page: 1,
  perPage: 20,
};

const usePaginationState = (
  initialValues: Partial<TPaginationDefinition> = {}
): TPaginationState => {
  const mergedValues: TPaginationDefinition = {
    ...defaultValues,
    ...applyIf(initialValues, 'page'),
    ...applyIf(initialValues, 'perPage'),
  };

  const [page, setPage] = useState<TPaginationDefinition['page']>(
    mergedValues.page
  );
  const [perPage, setPerPage] = useState<TPaginationDefinition['perPage']>(
    mergedValues.perPage
  );

  const onPageChange = useCallback<TState['onChange']>(
    (nextPage) => {
      setPage(nextPage);
    },
    [setPage]
  );

  const onPerPageChange = useCallback<TState['onChange']>(
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
