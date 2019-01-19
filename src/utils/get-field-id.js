import createSequentialId from './create-sequential-id';

const getFieldId = (props, state, prefix) =>
  props.id || state.id || createSequentialId(prefix)();

export default getFieldId;
