import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Html from 'slate-html-serializer';
import Types from 'slate-prop-types';
import { Editor } from 'slate-react';
import PlaceholderPlugin from './plugins/placeholder';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { RenderMarkPlugin, RenderBlockPlugin } from './plugins';
import UndoPlugin from './plugins/undo';
import RedoPlugin from './plugins/redo';
import ListPlugin from './plugins/list';
import MarkPlugin from './plugins/mark';
import renderEditor from './editor';
import rules from './utils/rules';

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

const plugins = [
  {
    queries: {
      // used for the placeholder plugin
      shouldUsePlaceholder: editor => {
        const isEmpty = editor.value.document.text === '';
        const hasOneNode =
          editor.value.document.nodes.map(node => node.text).toArray()
            .length === 1;
        const blocks = editor.value.blocks.map(block => block.type).toArray();
        const hasOneBlock = blocks.length === 1;
        const isParagraph = blocks[0] && blocks[0] === 'paragraph';

        const shouldUsePlaceholder =
          isEmpty && hasOneNode && hasOneBlock && isParagraph;

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
    typeName: 'bold',
    hotkey: 'mod+b',
    command: 'toggleBoldMark',
    query: 'hasBoldMark',
    // eslint-disable-next-line react/display-name, react/prop-types
    RenderMark: ({ children, ...attributes }) => (
      <strong {...attributes}>{children}</strong>
    ),
  }),
  MarkPlugin({
    typeName: 'italic',
    hotkey: 'mod+i',
    command: 'toggleItalicMark',
    query: 'hasItalicMark',
    // eslint-disable-next-line react/display-name, react/prop-types
    RenderMark: props => <em {...props}>{props.children}</em>,
  }),
  MarkPlugin({
    typeName: 'underlined',
    hotkey: 'mod+u',
    command: 'toggleUnderlinedMark',
    query: 'hasUnderlinedMark',
    // eslint-disable-next-line react/display-name, react/prop-types
    RenderMark: props => <u {...props}>{props.children}</u>,
  }),
  RenderMarkPlugin(),
  RenderBlockPlugin(),
  UndoPlugin(),
  RedoPlugin(),
  ListPlugin(),
];

const RichTextInput = props => {
  const { onChange } = props;
  const onValueChange = ({ value }) => {
    const event = {
      target: { id: props.id, name: props.name, value },
    };
    onChange(event);
  };

  return (
    <Editor
      {...filterDataAttributes(props)}
      id={props.id}
      name={props.name}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
      value={props.value}
      // we can only pass props to the Editor that Slate understands without getting
      // warning in the console,
      // so instead we pass our extra props through this `options` prop.
      options={{
        horizontalConstraint: props.horizontalConstraint,
        defaultExpandMultilineText: props.defaultExpandMultilineText,
        hasWarning: props.hasWarning,
        hasError: props.hasError,
        placeholder: props.placeholder,
      }}
      onChange={onValueChange}
      plugins={plugins}
      renderEditor={renderEditor}
    />
  );
};

RichTextInput.defaultProps = {
  defaultExpandMultilineText: false,
  horizontalConstraint: 'scale',
  placeholder: '',
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.serialize = html.serialize;
RichTextInput.deserialize = html.deserialize;

RichTextInput.propTypes = {
  defaultExpandMultilineText: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  value: Types.value.isRequired,
};

export default RichTextInput;
