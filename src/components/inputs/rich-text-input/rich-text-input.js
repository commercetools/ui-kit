import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Types from 'slate-prop-types';
import { Editor as SlateEditor } from 'slate-react';
import { RenderMarkPlugin, RenderBlockPlugin } from './plugins';
import UndoPlugin from './plugins/undo';
import RedoPlugin from './plugins/redo';
import ListPlugin from './plugins/list';
import MarkPlugin from './plugins/mark';
import Editor from './editor';

const plugins = [
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
  ListPlugin({
    typeName: 'numbered-list',
    query: 'hasNumberedListBlock',
    command: 'toggleNumberedListBlock',
  }),
  ListPlugin({
    typeName: 'bulleted-list',
    query: 'hasBulletedListBlock',
    command: 'toggleBulletedListBlock',
  }),
];

const RichTextInput = props => {
  const { onChange } = props;
  const onValueChange = React.useCallback(
    ({ value }) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <SlateEditor
      {...props}
      id={props.id}
      name={props.name}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
      hasError={props.hasError}
      hasWarning={props.hasWarning}
      value={props.value}
      onChange={onValueChange}
      placeholder={props.placeholder}
      plugins={plugins}
      renderEditor={Editor}
    />
  );
};

RichTextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

RichTextInput.displayName = 'RichTextInput';

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
