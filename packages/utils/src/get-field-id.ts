type TContainsId = {
  id: string;
};

type TSignatureCreatesId = () => string;

const getFieldId = (
  props: TContainsId,
  state: TContainsId,
  createId: TSignatureCreatesId
): string => props.id || state.id || createId();

export default getFieldId;
