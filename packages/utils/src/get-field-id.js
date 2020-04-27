const getFieldId = (props, state, createId) =>
  props.id || state.id || createId();

export default getFieldId;
