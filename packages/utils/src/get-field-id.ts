type ObjectWithId = {
  id?: string;
};
type CreateIdFn = () => string;

const getFieldId = (
  props: ObjectWithId,
  state: ObjectWithId,
  createId: CreateIdFn
): string => props.id || state.id || createId();

export default getFieldId;
