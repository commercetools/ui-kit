import React from 'react';
import UndoPlugin from './plugins/undo';
import RedoPlugin from './plugins/redo';
import ListPlugin from './plugins/list';
import MarkPlugin from './plugins/mark';
import { RenderMarkPlugin, RenderBlockPlugin } from './plugins';
import PlaceholderPlugin from './plugins/placeholder';
import { BLOCK_TAGS, MARK_TAGS } from './tags';

// eslint-disable-next-line camelcase, react/display-name
const RenderMark_Strong = (props) => <strong {...props} />;
// eslint-disable-next-line camelcase, react/display-name
const RenderMark_Em = (props) => <em {...props} />;
// eslint-disable-next-line camelcase, react/display-name
const RenderMark_U = (props) => <u {...props} />;

const plugins = [
  {
    queries: {
      // used for the placeholder plugin
      shouldUsePlaceholder: (editor) => {
        const isEditorEmpty = editor.value.document.text === '';
        const hasOneNode =
          editor.value.document.nodes.map((node) => node.text).toArray()
            .length === 1;
        const blocks = editor.value.blocks.map((block) => block.type).toArray();

        const hasOneBlock = blocks.length === 1;
        const isParagraph = blocks[0] && blocks[0] === BLOCK_TAGS.p;

        const shouldUsePlaceholder =
          !editor.hasPlaceholder &&
          isEditorEmpty &&
          hasOneNode &&
          hasOneBlock &&
          isParagraph;

        // eslint-disable-next-line no-param-reassign
        editor.hasPlaceholder = shouldUsePlaceholder;
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
