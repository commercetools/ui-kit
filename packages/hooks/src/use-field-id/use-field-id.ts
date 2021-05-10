import React from 'react';
import { getFieldId } from '@commercetools-uikit/utils';

type CreateIdFn = () => string;

const useFieldId = (id: string | undefined, createIdFn: CreateIdFn): string => {
  const [internalId, setId] = React.useState(id);

  React.useEffect(() => {
    const props = { id };
    const state = { id: internalId };

    setId(getFieldId(props, state, createIdFn));
  }, [id, internalId, setId, createIdFn]);

  return internalId as string;
};

export default useFieldId;
