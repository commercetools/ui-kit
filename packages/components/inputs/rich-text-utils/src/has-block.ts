import type { TEditor } from './editor.types';

const hasBlock = (type: string, editor: TEditor) =>
  editor.value?.blocks.some((node: { type: string }) => node.type === type);

export default hasBlock;
