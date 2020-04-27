import React from 'react';
import { getFieldId } from '@commercetools-uikit/utils';

const useFieldId = (id, sequentialId) => {
  const [internalId, setId] = React.useState(id);

  React.useEffect(() => {
    setId(getFieldId({ id }, { id: internalId }, sequentialId));
  }, [id, internalId, setId, sequentialId]);

  return internalId;
};

export default useFieldId;
