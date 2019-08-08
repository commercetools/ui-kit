import React from 'react';
import getFieldId from '../../utils/get-field-id';

const useFieldId = (id, sequentialId) => {
  const [internalId, setId] = React.useState(id);

  React.useEffect(() => {
    setId(getFieldId({ id }, { id: internalId }, sequentialId));
  }, [id, internalId, setId, sequentialId]);

  return internalId;
};

export default useFieldId;
