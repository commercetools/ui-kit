declare module 'remark-mdx' {
  import type { Node } from 'unist';
  import type { VFile } from 'vfile';

  export type TransformerFn = (tree: Node, file: VFile) => void;
  export default function (): TransformerFn;
}
