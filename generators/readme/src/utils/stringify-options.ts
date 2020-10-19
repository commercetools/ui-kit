import type { RemarkStringifyOptions } from 'remark-stringify';

const stringifyOptions: Partial<RemarkStringifyOptions> = {
  // options approximating prettier output
  // https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#options
  gfm: true,
  commonmark: true,
  tablePipeAlign: false,
  listItemIndent: 'one',
  incrementListMarker: false,
  rule: '-',
  fences: true,
};

export default stringifyOptions;
