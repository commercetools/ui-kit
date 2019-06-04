import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Types from 'slate-prop-types';
import { Editor } from 'slate-react';
import Spacings from '../../spacings';
import {
  MarkHotkeyPlugin,
  RenderBlockPlugin,
  RenderMarkPlugin,
} from './plugins';
import Button from './button';
import { Toolbar, EditorContainer, Container } from './rich-text-input.styles';

const DEFAULT_NODE = 'paragraph';

const plugins = [
  MarkHotkeyPlugin({ key: 'b', type: 'bold' }),
  MarkHotkeyPlugin({ key: 'i', type: 'italic' }),
  MarkHotkeyPlugin({ key: 'u', type: 'underline' }),
  RenderMarkPlugin(),
  RenderBlockPlugin(),
];

class RichTextInput extends React.Component {
  static displayName = 'RichTextInput';

  static propTypes = {
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    value: Types.value.isRequired,
  };
  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    // this.setState({ value });
    this.props.onChange(value);
  };

  hasBlock = type => {
    const { value } = this.props;
    return value.blocks.some(node => node.type === type);
  };

  hasMark = type => {
    const { value } = this.props;
    return value.activeMarks.some(mark => mark.type === type);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icon}
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks },
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onClick={event => this.onClickBlock(event, type)}
      >
        {icon}
      </Button>
    );
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  ref = editor => {
    this.editor = editor;
  };

  renderEditor = (props, editor, next) => {
    const children = next();

    const passedProps = {
      isDisabled: props.disabled,
      hasError: props.hasError,
      hasWarning: props.hasWarning,
      isReadOnly: props.readOnly,
    };

    return (
      <Container {...passedProps} tabIndex={-1}>
        <Toolbar {...passedProps}>
          <Spacings.Inline scale="m">
            {this.renderMarkButton('bold', 'B')}
            {this.renderMarkButton('italic', 'I')}
            {this.renderMarkButton('underlined', 'U')}
            {this.renderBlockButton('heading-one', 'H1')}
            {this.renderBlockButton('heading-two', 'H2')}
            {this.renderBlockButton('heading-three', 'H3')}
          </Spacings.Inline>
        </Toolbar>
        <EditorContainer {...passedProps}>{children}</EditorContainer>
      </Container>
    );
  };

  render() {
    return (
      <Editor
        id={this.props.id}
        name={this.props.name}
        ref={this.ref}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly}
        hasError={this.props.hasError}
        hasWarning={this.props.hasWarning}
        value={this.props.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        plugins={plugins}
        renderEditor={this.renderEditor}
      />
    );
  }
}

export default RichTextInput;
