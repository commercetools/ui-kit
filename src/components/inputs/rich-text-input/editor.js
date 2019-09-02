import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Button from './button';
import StyleDropdown from './style-dropdown';
import MarkButton from './buttons/mark-button';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import useToggleState from '../../../hooks/use-toggle-state';
import {
  BoldIcon,
  ItalicIcon,
  UnorderedListIcon,
  OrderedListIcon,
  UnderlineIcon,
  RedoIcon,
} from './icons';
import { AngleUpIcon, AngleDownIcon, RevertIcon } from '../../icons';
import Constraints from '../../constraints';
import FlatButton from '../../buttons/flat-button';
import { Toolbar, EditorContainer, Container } from './rich-text-input.styles';
import Divider from './divider';
import MultiDropdown from './multi-dropdown';

const DEFAULT_NODE = 'paragraph';

const dropdownOptions = [
  { label: 'Strikethrough', value: 'strikethrough' },
  { label: 'Superscript', value: 'superscript' },
  { label: 'Subscript', value: 'subscript' },
];

const InnerEditor = props => {
  const { editor } = props;

  const activeBlock =
    (editor.value.blocks.first() && editor.value.blocks.first().type) || '';

  const activeMarks = Array.from(editor.value.activeMarks).map(
    mark => mark.type
  );

  const activeMoreStyleMarks = activeMarks.filter(x =>
    dropdownOptions.some(y => x === y.value)
  );

  const hasBlock = type => editor.value.blocks.some(node => node.type === type);

  const onClickBlock = ({ value: type }) => {
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item');

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
      const isList = hasBlock('list-item');
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

  const { toggleMark } = editor;

  const onChangeMoreStyles = React.useCallback(
    val => {
      toggleMark(val.value);
    },
    [toggleMark]
  );

  const [isOpen, toggle] = useToggleState();

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div>
        <Container
          {...props}
          tabIndex={-1}
          isOpen={isOpen}
          onFocus={() => {
            if (!isOpen) {
              toggle();
            }
          }}
        >
          <Toolbar {...props} isOpen={isOpen}>
            <StyleDropdown value={activeBlock} onChange={onClickBlock} />
            <MarkButton
              isActive={editor.hasBoldMark()}
              type="bold"
              onClickMark={editor.toggleBoldMark}
              icon={<BoldIcon size="medium" />}
            />
            <MarkButton
              isActive={editor.hasItalicMark()}
              type="italic"
              onClickMark={editor.toggleItalicMark}
              icon={<ItalicIcon size="medium" />}
            />
            <MarkButton
              isActive={editor.hasUnderlinedMark()}
              type="underlined"
              onClickMark={editor.toggleUnderlinedMark}
              icon={<UnderlineIcon size="medium" />}
            />
            <MultiDropdown
              label="More styles"
              dropdownOptions={dropdownOptions}
              selectedItems={activeMoreStyleMarks}
              onSelect={onChangeMoreStyles}
            />
            <Divider />
            <Button
              isActive={editor.hasNumberedListBlock()}
              label={'numbered-list'}
              onMouseDown={editor.toggleNumberedListBlock}
              icon={<OrderedListIcon size="medium" />}
            ></Button>
            <Button
              isActive={editor.hasBulletedListBlock()}
              label={'ordered-list'}
              onMouseDown={editor.toggleBulletedListBlock}
              icon={<UnorderedListIcon size="medium" />}
            ></Button>
            <div
              css={css`
                display: flex;
                flex: 1;
                justify-content: flex-end;
              `}
            >
              <Button
                active={false}
                label={'undo'}
                isDisabled={!editor.hasUndos()}
                onMouseDown={editor.toggleUndo}
                icon={
                  <RevertIcon
                    color={!editor.hasUndos() ? 'neutral60' : 'solid'}
                    size="small"
                  />
                }
              />
              <Button
                active={false}
                label={'redo'}
                isDisabled={!editor.hasRedos()}
                onMouseDown={editor.toggleRedo}
                icon={
                  <RedoIcon
                    color={!editor.hasRedos() ? 'neutral60' : 'solid'}
                    size="medium"
                  />
                }
              />
            </div>
          </Toolbar>
          <EditorContainer {...props} isOpen={isOpen}>
            {props.children}
          </EditorContainer>
        </Container>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <FlatButton
            onClick={toggle}
            label={isOpen ? 'Collapse' : 'Expand'}
            icon={
              isOpen ? (
                <AngleUpIcon size="small" />
              ) : (
                <AngleDownIcon size="small" />
              )
            }
          />
        </div>
      </div>
    </Constraints.Horizontal>
  );
};

const Editor = (props, editor, next) => {
  const children = next();

  const passedProps = {
    name: props.name,
    id: props.id,
    isDisabled: props.disabled,
    hasError: props.hasError,
    hasWarning: props.hasWarning,
    isReadOnly: props.readOnly,
    ...filterDataAttributes(props),
  };

  return (
    <InnerEditor editor={editor} {...passedProps}>
      {children}
    </InnerEditor>
  );
};

const sharedProps = {
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
};

InnerEditor.displayName = 'InnerEditor';
InnerEditor.propTypes = { ...sharedProps, editor: PropTypes.any };

Editor.displayName = 'Editor';
Editor.propTypes = sharedProps;

export default Editor;
