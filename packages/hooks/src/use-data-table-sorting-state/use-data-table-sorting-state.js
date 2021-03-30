import { useState, useCallback } from 'react';

const defaultValues = { key: 'createdAt', order: 'desc' };

const useDataTableSortingState = (initialValues = defaultValues) => {
  const mergedValues = {
    ...defaultValues,
    ...initialValues,
  };
  const [sortDefinition, setSortDefinition] = useState(mergedValues);
  const onTableSortingChange = useCallback(
    (key, order) => setSortDefinition({ key, order }),
    []
  );
  return {
    // { key: string, order: asc | desc }
    value: sortDefinition,
    onChange: onTableSortingChange,
  };
};

export default useDataTableSortingState;
