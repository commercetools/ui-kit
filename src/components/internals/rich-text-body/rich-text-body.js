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
import Divider from './divider';
import MultiDropdown from './multi-dropdown';
import Dropdown from './dropdown';
import { MARK_TAGS, BLOCK_TAGS } from '../rich-text-utils/tags';
import messages from './messages';

const DEFAULT_NODE = BLOCK_TAGS.p;

const tooltipStyles = {
  body: {
    zIndex: 9999,
  },
};

const createStyleDropdownOptions = intl => {
  return [
    {
      label: intl.formatMessage(messages.styleDropdownOptionParagraph),
      value: BLOCK_TAGS.p,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH1),
      value: BLOCK_TAGS.h1,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH2),
      value: BLOCK_TAGS.h2,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH3),
      value: BLOCK_TAGS.h3,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH4),
      value: BLOCK_TAGS.h4,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionH5),
      value: BLOCK_TAGS.h5,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionQuote),
      value: BLOCK_TAGS.blockquote,
    },
    {
      label: intl.formatMessage(messages.styleDropdownOptionPreformatted),
      value: BLOCK_TAGS.pre,
    },
  ];
};

const createMoreStylesDropdownOptions = intl => {
  return [
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionStrikethrough),
      value: MARK_TAGS.del,
    },
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionSuperscript),
      value: MARK_TAGS.sup,
    },
    {
      label: intl.formatMessage(messages.moreStylesDropdownOptionSubscript),
      value: MARK_TAGS.sub,
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
    if (type !== BLOCK_TAGS.ul && type !== BLOCK_TAGS.ol) {
      const isActive = hasBlock(type);
      const isList = hasBlock(BLOCK_TAGS.li);

      if (isList) {
        props.editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock(BLOCK_TAGS.ul)
          .unwrapBlock(BLOCK_TAGS.ol);
      } else {
        props.editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock(BLOCK_TAGS.li);
      const isType = props.editor.value.blocks.some(block => {
        return !!props.editor.value.document.getClosest(
          block.key,
          parent => parent.type === type
        );
      });

      if (isList && isType) {
        props.editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock(BLOCK_TAGS.ul)
          .unwrapBlock(BLOCK_TAGS.ol);
      } else if (isList) {
        props.editor
          .unwrapBlock(type === BLOCK_TAGS.ul ? BLOCK_TAGS.ol : BLOCK_TAGS.ul)
          .wrapBlock(type);
      } else {
        props.editor.setBlocks(BLOCK_TAGS.li).wrapBlock(type);
      }
    }
  };

  const onChangeMoreStyles = val => {
    // if (!props.editor.value.selection.isFocused) {
    //   props.editor.focus();
    // }
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
      onBlur={props.onBlur}
    >
      <Toolbar
        isOpen={props.isOpen}
        tabIndex={-1}
        onMouseDown={event => {
          event.preventDefault();
          // if (!props.editor.value.selection.isFocused) {
          //   props.editor.focus();
          // }
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
  onBlur: PropTypes.func,
  isOpen: PropTypes.bool,
  editor: PropTypes.any,
  children: PropTypes.node,
  containerStyles: PropTypes.any,
};

export default RichTextEditorBody;
