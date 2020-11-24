declare module 'remark-mdx' {
  // eslint-disable-next-line import/no-unresolved
  import type { Node } from 'unist';
  import type { VFile } from 'vfile';

  export type TransformerFn = (tree: Node, file: VFile) => void;
  export default function (): TransformerFn;
}
