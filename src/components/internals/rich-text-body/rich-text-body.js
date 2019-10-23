import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import requiredIf from 'react-required-if';
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
  ExpandIcon,
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
      css={props.styles.container}
      hasError={props.hasError}
      hasWarning={props.hasWarning}
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
    >
      <Toolbar
        onClick={() => {
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
            isDisabled={props.isDisabled}
          />
          <Tooltip
            title={intl.formatMessage(messages.boldButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasBoldMark()
              }
              isDisabled={props.isDisabled}
              label={intl.formatMessage(messages.boldButtonLabel)}
              onClick={props.editor.toggleBoldMark}
            >
              <BoldIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.italicButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasItalicMark()
              }
              isDisabled={props.isDisabled}
              label={intl.formatMessage(messages.italicButtonLabel)}
              onClick={props.editor.toggleItalicMark}
            >
              <ItalicIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.underlinedButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasUnderlinedMark()
              }
              isDisabled={props.isDisabled}
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
            isDisabled={props.isDisabled}
          />
          <Divider />
          <Tooltip
            title={intl.formatMessage(messages.orderedListButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasNumberedListBlock()
              }
              isDisabled={props.isDisabled}
              label={intl.formatMessage(messages.orderedListButtonLabel)}
              onClick={props.editor.toggleNumberedListBlock}
            >
              <OrderedListIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.unorderedListButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value.selection.isFocused &&
                props.editor.hasBulletedListBlock()
              }
              isDisabled={props.isDisabled}
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
            title={intl.formatMessage(messages.undoButtonLabel)}
            placement="bottom"
            off={!hasUndos}
          >
            <Button
              isActive={false}
              label={intl.formatMessage(messages.undoButtonLabel)}
              isDisabled={!hasUndos || props.isDisabled}
              onClick={props.editor.toggleUndo}
            >
              <UndoIcon size="medium" />
            </Button>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.redoButtonLabel)}
            placement="bottom"
            off={!hasRedos}
          >
            <Button
              isActive={false}
              label={intl.formatMessage(messages.redoButtonLabel)}
              isDisabled={!hasRedos || props.isDisabled}
              onClick={props.editor.toggleRedo}
            >
              <RedoIcon size="medium" />
            </Button>
          </Tooltip>
          {props.showExpandIcon && (
            <React.Fragment>
              <Divider />
              <Tooltip
                title={intl.formatMessage(messages.expandButtonLabel)}
                placement="bottom-end"
              >
                <Button
                  isActive={false}
                  isDisabled={props.isDisabled}
                  label={intl.formatMessage(messages.expandButtonLabel)}
                  onClick={props.onClickExpand}
                >
                  <ExpandIcon size="medium" />
                </Button>
              </Tooltip>
            </React.Fragment>
          )}
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
  editor: PropTypes.any,
  children: PropTypes.node,
  containerStyles: PropTypes.any,
  showExpandIcon: PropTypes.bool.isRequired,
  onClickExpand: requiredIf(PropTypes.func, props => props.showExpandIcon),
  styles: PropTypes.any,
};

RichTextEditorBody.defaultProps = {
  styles: {},
};

export default RichTextEditorBody;
