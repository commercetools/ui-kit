import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Html from 'slate-html-serializer';
import Types from 'slate-prop-types';
import { Editor } from 'slate-react';
import PlaceholderPlugin from 'slate-react-placeholder';
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

const createPlaceholderPlugin = placeholder =>
  PlaceholderPlugin({
    placeholder,
    when: 'isEmpty',
    style: {
      verticalAlign: 'inherit',
      fontSize: '1rem',
      fontWeight: 'normal',
    },
  });

const plugins = [
  {
    queries: {
      isEmpty: editor => editor.value.document.text === '',
    },
  },
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

  const pluginsToUse = plugins.concat(
    createPlaceholderPlugin(props.placeholder)
  );

  return (
    <Editor
      {...filterDataAttributes(props)}
      id={props.id}
      name={props.name}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
      value={props.value}
      options={{ hasWarning: props.hasWarning, hasError: props.hasError }}
      onChange={onValueChange}
      plugins={pluginsToUse}
      renderEditor={renderEditor}
    />
  );
};

RichTextInput.defaultProps = {
  horizontalConstraint: 'scale',
  placeholder: '',
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.serializeHtml = html.serialize;
RichTextInput.deserializeHtml = html.deserialize;

RichTextInput.propTypes = {
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  value: Types.value.isRequired,
};

export default RichTextInput;
