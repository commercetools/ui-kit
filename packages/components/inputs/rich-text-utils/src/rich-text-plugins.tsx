import UndoPlugin from './plugins/undo';
import RedoPlugin from './plugins/redo';
import ListPlugin from './plugins/list';
import MarkPlugin from './plugins/mark';
import { RenderMarkPlugin, RenderBlockPlugin } from './plugins';
import PlaceholderPlugin from './plugins/placeholder';
import { BLOCK_TAGS, MARK_TAGS } from './tags';
import type { TEditor } from './editor.types';

type Props = {};

const RenderMark_Strong = (props: Props) => <strong {...props} />;
const RenderMark_Em = (props: Props) => <em {...props} />;
const RenderMark_U = (props: Props) => <u {...props} />;

const plugins = [
  {
    queries: {
      // used for the placeholder plugin
      shouldUsePlaceholder: (editor: TEditor) => {
        const isEditorEmpty = editor.value.document.text === '';
        const hasOneNode =
          editor.value.document.nodes
            ?.map((node: { text: string }) => node.text)
            .toArray().length === 1;
        const blocks = editor.value.blocks
          .map((block: { type: unknown }) => block.type)
          .toArray();

        const hasOneBlock = blocks.length === 1;
        const isParagraph = blocks[0] && blocks[0] === BLOCK_TAGS.p;

        const shouldUsePlaceholder =
          !editor.hasPlaceholder &&
          isEditorEmpty &&
          hasOneNode &&
          hasOneBlock &&
          isParagraph;

        editor.hasPlaceholder = shouldUsePlaceholder as boolean;
        return shouldUsePlaceholder;
      },
    },
  },
  PlaceholderPlugin({
    when: 'shouldUsePlaceholder',
    style: {
      verticalAlign: 'inherit',
      fontSize: '1rem',
      fontWeight: 'normal',
    },
  }),
  MarkPlugin({
    typeName: MARK_TAGS.strong,
    hotkey: 'mod+b',
    command: 'toggleBoldMark',
    query: 'hasBoldMark',
    RenderMark: RenderMark_Strong,
  }),
  MarkPlugin({
    typeName: MARK_TAGS.em,
    hotkey: 'mod+i',
    command: 'toggleItalicMark',
    query: 'hasItalicMark',
    RenderMark: RenderMark_Em,
  }),
  MarkPlugin({
    typeName: MARK_TAGS.u,
    hotkey: 'mod+u',
    command: 'toggleUnderlinedMark',
    query: 'hasUnderlinedMark',
    RenderMark: RenderMark_U,
  }),
  RenderMarkPlugin(),
  RenderBlockPlugin(),
  UndoPlugin(),
  RedoPlugin(),
  ListPlugin(),
];

export default plugins;
