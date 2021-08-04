import type { Options } from 'remark-stringify';

const stringifyOptions: Partial<Options> = {
  // options approximating prettier output
  // https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#options
  listItemIndent: 'one',
  incrementListMarker: false,
  rule: '-',
  fences: true,
};

export default stringifyOptions;
