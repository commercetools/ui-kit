import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { css } from '@emotion/core';
import Tooltip from '../../tooltip';
import {
  Toolbar,
  ToolbarMainControls,
  ToolbarRightControls,
  EditorContainer,
  Container,
} from './rich-text-body.styles';
import {
  BoldIcon,
  ItalicIcon,
  UnorderedListIcon,
  OrderedListIcon,
  UnderlineIcon,
  RedoIcon,
  UndoIcon,
} from './icons';
import Button from './rich-text-body-button';
import Divider from '../../inputs/rich-text-input/divider';
import MultiDropdown from './multi-dropdown';
import Dropdown from './dropdown';
import messages from '../../inputs/rich-text-input/messages';

const DEFAULT_NODE = 'paragraph';

const NUMBERED_LIST = 'numbered-list';
const BULLETED_LIST = 'bulleted-list';
const LIST_ITEM = 'list-item';

const tooltipStyles = {
  body: {
    zIndex: 9999,
  },
};

const createStyleDropdownOptions = intl => {
  return [
    {
      label: intl.formatMessage(messages.styleDropdownOptionParagraph),
      value: 'paragraph',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH1),
      value: 'heading-one',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH2),
      value: 'heading-two',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH3),
      value: 'heading-three',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH4),
      value: 'heading-four',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH5),
      value: 'heading-five',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionQuote),
      value: 'block-quote',
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionPreformatted),
      value: 'code',
    },
  ];
};

const createMoreStylesDropdownOptions = intl => {
  return [
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionStrikethrough),
      value: 'strikethrough',
    },
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionSuperscript),
      value: 'superscript',
    },
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionSubscript),
      value: 'subscript',
    },
  ];
};

const RichTextEditorBody = React.forwardRef((props, ref) => {
  const { registerContentNode, containerRef } = ref;
  const intl = useIntl();

  const dropdownOptions = createMoreStylesDropdownOptions(intl);
  const styleDropdownOptions = createStyleDropdownOptions(intl);

  const hasUndos = props.editor.hasUndos();
  const hasRedos = props.editor.hasRedos();

  const hasBlock = type =>
    props.editor.value.blocks.some(node => node.type === type);

  const onClickBlock = ({ value: type }) => {
    // Handle everything but list buttons.
    if (type !== BULLETED_LIST && type !== NUMBERED_LIST) {
      const isActive = hasBlock(type);
      const isList = hasBlock(LIST_ITEM);

      if (isList) {
        props.editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock(BULLETED_LIST)
          .unwrapBlock(NUMBERED_LIST);
      } else {
        props.editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock(LIST_ITEM);
      const isType = props.editor.value.blocks.some(block => {
        return !!props.editor.value.document.getClosest(
          block.key,
          parent => parent.type === type
        );
      });

      if (isList && isType) {
        props.editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock(BULLETED_LIST)
          .unwrapBlock(NUMBERED_LIST);
      } else if (isList) {
        props.editor
          .unwrapBlock(type === BULLETED_LIST ? NUMBERED_LIST : BULLETED_LIST)
          .wrapBlock(type);
      } else {
        props.editor.setBlocks(LIST_ITEM).wrapBlock(type);
      }
    }
  };

  const onChangeMoreStyles = val => {
    if (!props.editor.value.selection.isFocused) {
      props.editor.focus();
    }
    props.editor.toggleMark(val.value);
  };

  const activeBlock =
    (props.editor.value.blocks.first() &&
      props.editor.value.blocks.first().type) ||
    '';

  const activeMarks = Array.from(props.editor.value.activeMarks).map(
    mark => mark.type
  );

  const activeMoreStyleMarks = activeMarks.filter(activeMark =>
    dropdownOptions.some(dropdownOption => activeMark === dropdownOption.value)
  );

  return (
    <Container
      hasError={props.hasError}
      hasWarning={props.hasWarning}
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
      onFocus={props.onFocus}
    >
      <Toolbar
        isOpen={props.isOpen}
        tabIndex={-1}
        onMouseDown={event => {
          event.preventDefault();
          if (!props.editor.value.selection.isFocused) {
            props.editor.focus();
          }
        }}
      >
        <ToolbarMainControls>
          <Dropdown
            label={intl.formatMessage(messages.styleDropdownLabel)}
            value={activeBlock}
            onChange={onClickBlock}
            options={styleDropdownOptions}
          />
          <Tooltip
            title={intl.formatMessage(messages.boldTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={props.editor.hasBoldMark()}
              label={intl.formatMessage(messages.boldButtonLabel)}
              onMouseDown={props.editor.toggleBoldMark}
              icon={<BoldIcon size="medium" />}
            />
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.italicTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={props.editor.hasItalicMark()}
              label={intl.formatMessage(messages.italicButtonLabel)}
              onMouseDown={props.editor.toggleItalicMark}
              icon={<ItalicIcon size="medium" />}
            />
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.underlinedTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={props.editor.hasUnderlinedMark()}
              label={intl.formatMessage(messages.underlinedButtonLabel)}
              onMouseDown={props.editor.toggleUnderlinedMark}
              icon={<UnderlineIcon size="medium" />}
            />
          </Tooltip>
          <MultiDropdown
            label={intl.formatMessage(messages.moreStylesDropdownLabel)}
            dropdownOptions={dropdownOptions}
            selectedItems={activeMoreStyleMarks}
            onSelect={onChangeMoreStyles}
          />
          <Divider />
          <Tooltip
            title={intl.formatMessage(messages.orderedListTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={props.editor.hasNumberedListBlock()}
              label={intl.formatMessage(messages.orderedListButtonLabel)}
              onMouseDown={props.editor.toggleNumberedListBlock}
              icon={<OrderedListIcon size="medium" />}
            />
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.unorderedListTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={props.editor.hasBulletedListBlock()}
              label={intl.formatMessage(messages.unorderedListButtonLabel)}
              onMouseDown={props.editor.toggleBulletedListBlock}
              icon={<UnorderedListIcon size="medium" />}
            />
          </Tooltip>
        </ToolbarMainControls>
        <ToolbarRightControls
          css={css`
            display: flex;
            flex-wrap: wrap;

            > * {
              margin-left: 1px;
            }
          `}
        >
          <Tooltip
            title={intl.formatMessage(messages.undoTooltipTitle)}
            placement="bottom"
            off={!hasUndos}
          >
            <Button
              isActive={false}
              label={intl.formatMessage(messages.undoButtonLabel)}
              isDisabled={!hasUndos}
              onMouseDown={props.editor.toggleUndo}
              icon={
                <UndoIcon
                  color={!hasUndos ? 'neutral60' : 'solid'}
                  size="medium"
                />
              }
            />
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.redoTooltipTitle)}
            placement="bottom"
            off={!hasRedos}
          >
            <Button
              isActive={false}
              label={intl.formatMessage(messages.redoButtonLabel)}
              isDisabled={!hasRedos}
              onMouseDown={props.editor.toggleRedo}
              icon={
                <RedoIcon
                  color={!hasRedos ? 'neutral60' : 'solid'}
                  size="medium"
                />
              }
            />
          </Tooltip>
        </ToolbarRightControls>
      </Toolbar>
      <div style={props.containerStyles}>
        <div ref={registerContentNode}>
          <EditorContainer
            hasError={props.hasError}
            hasWarning={props.hasWarning}
            isReadOnly={props.isReadOnly}
            isDisabled={props.isDisabled}
            ref={containerRef}
          >
            {props.children}
          </EditorContainer>
        </div>
      </div>
    </Container>
  );
});

RichTextEditorBody.displayName = 'RichTextEditorBody';
RichTextEditorBody.propTypes = {
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onFocus: PropTypes.func,
  isOpen: PropTypes.bool,
  editor: PropTypes.any,
  children: PropTypes.node,
  containerStyles: PropTypes.any,
};

export default RichTextEditorBody;
