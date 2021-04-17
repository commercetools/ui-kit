import { useState, useCallback } from 'react';
import isNil from 'lodash/isNil';

type TSortDefinition = {
  key: string;
  order: 'desc' | 'asc';
};

type TDataTableSortingState = {
  value: TSortDefinition;
  onChange: (
    key: TSortDefinition['key'],
    order: TSortDefinition['order']
  ) => void;
};

const defaultValues: TSortDefinition = { key: 'createdAt', order: 'desc' };
const applyIf = (
  values: Partial<TSortDefinition>,
  key: 'order' | 'key'
): Partial<TDataTableSortingState> =>
  !isNil(values[key]) ? { [key]: values[key] } : {};

const useDataTableSortingState = (
  initialValues: Partial<TSortDefinition> = {}
): TDataTableSortingState => {
  const mergedValues: TSortDefinition = {
    ...defaultValues,
    ...applyIf(initialValues, 'key'),
    ...applyIf(initialValues, 'order'),
  };
  const [sortDefinition, setSortDefinition] = useState<TSortDefinition>(
    mergedValues
  );
  const onTableSortingChange = useCallback<TDataTableSortingState['onChange']>(
    (key: TSortDefinition['key'], order: TSortDefinition['order']): void => {
      setSortDefinition({
        key,
        order,
      });
    },
    []
  );

  return {
    value: sortDefinition,
    onChange: onTableSortingChange,
  };
};

export default useDataTableSortingState;
