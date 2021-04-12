import { useState, useCallback } from 'react';

const defaultValues = { key: 'createdAt', order: 'desc' };
const applyIf = (values, key) => (values[key] ? { [key]: values[key] } : {});

const useDataTableSortingState = (initialValues = {}) => {
  const mergedValues = {
    ...defaultValues,
    ...applyIf(initialValues, 'key'),
    ...applyIf(initialValues, 'order'),
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
