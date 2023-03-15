import { useState, useEffect } from 'react';
import { getFieldId } from '@commercetools-uikit/utils';

export type TCreateIdFn = () => string;

const useFieldId = (
  id: string | undefined,
  createIdFn: TCreateIdFn
): string => {
  const [internalId, setId] = useState(id || createIdFn());

  useEffect(() => {
    const props = { id };
    const state = { id: internalId };

    setId(getFieldId(props, state, createIdFn));
  }, [id, internalId, setId, createIdFn]);

  return internalId as string;
};

export default useFieldId;
