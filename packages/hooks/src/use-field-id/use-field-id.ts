import React from 'react';
import { getFieldId } from '@commercetools-uikit/utils';

type CreateIdFn = () => string;

const useFieldId = (id: string, createIdFn: CreateIdFn): string => {
  const [internalId, setId] = React.useState<string>(id);

  React.useEffect(() => {
    const props = { id };
    const state = { id: internalId };

    setId(getFieldId(props, state, createIdFn));
  }, [id, internalId, setId, createIdFn]);

  return internalId;
};

export default useFieldId;
