import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Types from 'slate-prop-types';
import { css } from '@emotion/core';
import { Editor } from 'slate-react';
import { RenderBlockPlugin, RenderMarkPlugin } from './plugins';
import Spacings from '../../spacings';
import Button from './button';
import StyleDropdown from './dropdown';
import {
  BoldIcon,
  ItalicIcon,
  UnorderedListIcon,
  OrderedListIcon,
  MoreStylesIcon,
  UnderlineIcon,
  SuperscriptIcon,
  SubscriptIcon,
  StrikethroughIcon,
  RedoIcon,
} from './icons';
import { RevertIcon, CaretDownIcon } from '../../icons';
import { Toolbar, EditorContainer, Container } from './rich-text-input.styles';
import Divider from './divider';

const DEFAULT_NODE = 'paragraph';

const plugins = [RenderMarkPlugin(), RenderBlockPlugin()];

const getDropdownItemStyles = value => {
  switch (value) {
    case 'heading-one':
      return css`
        font-size: 1.75rem;
      `;
    case 'heading-two':
      return css`
        font-size: 1.5rem;
      `;
    case 'heading-three':
      return css`
        font-size: 1.3rem;
      `;
    case 'heading-four':
      return css`
        font-size: 1.2rem;
      `;
    case 'heading-five':
      return css`
        font-size: 1.1rem;
      `;

    default:
      return css``;
  }
};

// eslint-disable-next-line
const StyleDropdownItem = props => {
  return (
    <StyleDropdown.DropdownItem
      {...props}
      // eslint-disable-next-line react/prop-types
      css={getDropdownItemStyles(props.value)}
    />
  );
};

// eslint-disable-next-line
const StyleDropdownLabel = () => {
  return (
    <Spacings.Inline scale="xs" alignItems="center">
      <span>Style</span>
      <CaretDownIcon size="small" />
    </Spacings.Inline>
  );
};

// eslint-disable-next-line
const MoreStylesLabel = () => {
  return <MoreStylesIcon size="medium" />;
};

// eslint-disable-next-line
const MoreStylesDropdownItem = props => {
  // eslint-disable-next-line
  const { children } = props;
  let Icon;
  // eslint-disable-next-line
  switch (props.value) {
    case 'subscript':
      Icon = SubscriptIcon;
      break;
    case 'strikethrough':
      Icon = StrikethroughIcon;
      break;
    default:
      Icon = SuperscriptIcon;
  }

  return (
    <StyleDropdown.DropdownItem {...props}>
      <Spacings.Inline
        scale="xs"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon size="medium" />
        <div>{children}</div>
      </Spacings.Inline>
    </StyleDropdown.DropdownItem>
  );
};

const markDropdownOptions = [
  { label: 'Strikethrough', value: 'strikethrough' },
  { label: 'Superscript', value: 'superscript' },
  { label: 'Subscript', value: 'subscript' },
];

const dropdownOptions = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Headline H1', value: 'heading-one' },
  { label: 'Headline H2', value: 'heading-two' },
  { label: 'Headline H3', value: 'heading-three' },
  { label: 'Headline H4', value: 'heading-four' },
  { label: 'Headline H5', value: 'heading-five' },
  { label: 'Quote', value: 'block-quote' },
  { label: 'Preformatted', value: 'code' },
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

  onChange = ({ value }) => {
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
        label={type}
        onClick={() => this.onClickMark(type)}
        isActive={isActive}
        icon={icon}
      />
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks },
      } = this.props;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        label={type}
        onClick={() => this.onClickBlock(type)}
        icon={icon}
      ></Button>
    );
  };

  onClickUndo = () => {
    this.editor.undo();
  };

  onClickRedo = () => {
    this.editor.redo();
  };

  onClickMark = type => {
    this.editor.toggleMark(type);
  };

  renderUndoButton = () => {
    const { value } = this.props;
    const { data } = value;
    const undos = data.get('undos');
    // we use 1, because the initial focus counts as an undo
    // and it would be weird to do an undo that just undos the focus
    // and hides the toolbar
    const isDisabled = !undos || undos.size <= 1;

    return (
      <Button
        active={false}
        label={'undo'}
        isDisabled={isDisabled}
        onClick={this.onClickUndo}
        icon={
          <RevertIcon color={isDisabled ? 'neutral60' : 'solid'} size="small" />
        }
      />
    );
  };

  renderRedoButton = () => {
    const { value } = this.props;
    const { data } = value;
    const redos = data.get('redos');
    const isDisabled = !redos || redos.size === 0;

    return (
      <Button
        active={false}
        label={'undo'}
        isDisabled={isDisabled}
        onClick={this.onClickRedo}
        icon={
          <RedoIcon color={isDisabled ? 'neutral60' : 'solid'} size="medium" />
        }
      />
    );
  };

  onClickBlock = type => {
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

  onChangeStyleDropdown = selectedValue => {
    const selectedType = selectedValue.value;
    const isActive = this.hasBlock(selectedType);

    const { editor } = this;
    editor.setBlocks(isActive ? DEFAULT_NODE : selectedType);
  };

  onChangeMarkDropdown = selectedValue => {
    const selectedType = selectedValue.value;

    if (selectedType === 'subscript') {
      if (!this.hasMark('subscript') && this.hasMark('superscript'))
        this.editor.toggleMark('superscript');
    }

    if (selectedType === 'superscript') {
      if (!this.hasMark('superscript') && this.hasMark('subscript')) {
        this.editor.toggleMark('subscript');
      }
    }

    this.editor.toggleMark(selectedType);
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
          <StyleDropdown
            label="Style"
            options={dropdownOptions}
            components={{
              DropdownLabel: StyleDropdownLabel,
              DropdownItem: StyleDropdownItem,
            }}
            value={(() => {
              if (this.hasBlock('heading-one')) return 'heading-one';
              if (this.hasBlock('heading-two')) return 'heading-two';
              if (this.hasBlock('heading-three')) return 'heading-three';
              if (this.hasBlock('heading-four')) return 'heading-four';
              if (this.hasBlock('heading-five')) return 'heading-five';
              if (this.hasBlock('block-quote')) return 'block-quote';
              if (this.hasBlock('code')) return 'code';
              if (this.hasBlock('paragraph')) return 'paragraph';
              return '';
            })()}
            onChange={this.onChangeStyleDropdown}
          />
          {this.renderMarkButton('bold', <BoldIcon size="medium" />)}
          {this.renderMarkButton('italic', <ItalicIcon size="medium" />)}
          {this.renderMarkButton('underlined', <UnderlineIcon size="medium" />)}

          <StyleDropdown
            label="More styles"
            options={markDropdownOptions}
            components={{
              DropdownItem: MoreStylesDropdownItem,
              DropdownLabel: MoreStylesLabel,
            }}
            value={(() => {
              if (this.hasMark('subscript')) return 'subscript';
              if (this.hasMark('superscript')) return 'superscript';
              if (this.hasMark('strikethrough')) return 'strikethrough';
              return '';
            })()}
            onChange={this.onChangeMarkDropdown}
          />

          <Divider />

          {this.renderBlockButton(
            'numbered-list',
            <OrderedListIcon size="medium" />
          )}
          {this.renderBlockButton(
            'bulleted-list',
            <UnorderedListIcon size="medium" />
          )}

          <div
            css={css`
              display: flex;
              flex: 1;
              justify-content: flex-end;
            `}
          >
            {this.renderUndoButton()}
            {this.renderRedoButton()}
          </div>
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
