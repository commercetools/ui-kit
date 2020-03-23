const hasBlock = (type, editor) =>
  editor.value.blocks.some((node) => node.type === type);

export default hasBlock;
