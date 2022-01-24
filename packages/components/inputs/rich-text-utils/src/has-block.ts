type TEditor = {
  value?: {
    blocks: {
      some: (block: unknown) => boolean | void;
    };
  };
};

const hasBlock = (type: string, editor: TEditor) =>
  editor.value?.blocks.some((node: { type: string }) => node.type === type);

export default hasBlock;
