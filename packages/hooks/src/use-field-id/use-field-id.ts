import React from 'react';
import { getFieldId } from '@commercetools-uikit/utils';

type TSignatureCreatesId = () => string;

const useFieldId = (id: string, createId: TSignatureCreatesId): string => {
  const [internalId, setId] = React.useState(id);
  React.useEffect((): void => {
    const props = { id };
    const state = { id: internalId };
    setId(getFieldId(props, state, createId));
  }, [id, internalId, setId, createId]);

  return internalId;
};

export default useFieldId;
