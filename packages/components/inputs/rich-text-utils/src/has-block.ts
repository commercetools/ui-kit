type TEditor = {
  value: {
    blocks: [node: { type: string }];
  };
};

const hasBlock = (type: string, editor: TEditor) =>
  editor.value.blocks.some((node) => node.type === type);

export default hasBlock;
