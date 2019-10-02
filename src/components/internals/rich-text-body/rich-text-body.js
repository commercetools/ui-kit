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
import hasBlock from '../rich-text-utils/has-block';
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

  const onClickBlock = React.useCallback(
    ({ value: type }) => {
      // Handle everything but list buttons.
      if (type !== BLOCK_TAGS.ul && type !== BLOCK_TAGS.ol) {
        const isActive = hasBlock(type, props.editor);
        const isList = hasBlock(BLOCK_TAGS.li, props.editor);

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
        const isList = hasBlock(BLOCK_TAGS.li, props.editor);
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
    },
    [props.editor]
  );

  const onChangeMoreStyles = React.useCallback(
    val => {
      props.editor.toggleMark(val.value);
    },
    [props.editor]
  );

  const activeBlock =
    (props.editor.value.blocks.first() &&
      props.editor.value.blocks.first().type) ||
    '';

  // so that we don't show our multi dropdown in an `indeterminate`
  // while the component is not in focus
  let activeMoreStyleMarks = [];

  if (props.editor.value.selection.isFocused) {
    const activeMarks = Array.from(props.editor.value.activeMarks).map(
      mark => mark.type
    );

    activeMoreStyleMarks = activeMarks.filter(activeMark =>
      dropdownOptions.some(
        dropdownOption => activeMark === dropdownOption.value
      )
    );
  }

  return (
    <Container
      hasError={props.hasError}
      hasWarning={props.hasWarning}
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
      onClick={() => {
        if (!props.editor.value.selection.isFocused) {
          props.editor.focus();
        }
      }}
    >
      <Toolbar>
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
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasBoldMark()
              }
              label={intl.formatMessage(messages.boldButtonLabel)}
              onClick={props.editor.toggleBoldMark}
            >
              <BoldIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.italicTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasItalicMark()
              }
              label={intl.formatMessage(messages.italicButtonLabel)}
              onClick={props.editor.toggleItalicMark}
            >
              <ItalicIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.underlinedTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasUnderlinedMark()
              }
              label={intl.formatMessage(messages.underlinedButtonLabel)}
              onClick={props.editor.toggleUnderlinedMark}
            >
              <UnderlineIcon size="medium" />
            </Button>
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
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasNumberedListBlock()
              }
              label={intl.formatMessage(messages.orderedListButtonLabel)}
              onClick={props.editor.toggleNumberedListBlock}
            >
              <OrderedListIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.unorderedListTooltipTitle)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasBulletedListBlock()
              }
              label={intl.formatMessage(messages.unorderedListButtonLabel)}
              onClick={props.editor.toggleBulletedListBlock}
            >
              <UnorderedListIcon size="medium" />
            </Button>
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
              onClick={props.editor.toggleUndo}
            >
              <UndoIcon
                color={!hasUndos ? 'neutral60' : 'solid'}
                size="medium"
              />
            </Button>
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
              onClick={props.editor.toggleRedo}
            >
              <RedoIcon
                color={!hasRedos ? 'neutral60' : 'solid'}
                size="medium"
              />
            </Button>
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
