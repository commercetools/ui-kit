import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import Button from './rich-text-input-button';
import Dropdown from './dropdown';
import Tooltip from '../../tooltip';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import CollapsibleMotion from '../../collapsible-motion';
import Spacings from '../../spacings';
import {
  BoldIcon,
  ItalicIcon,
  UnorderedListIcon,
  OrderedListIcon,
  UnderlineIcon,
  RedoIcon,
  UndoIcon,
} from './icons';
import { AngleUpIcon, AngleDownIcon } from '../../icons';
import Constraints from '../../constraints';
import FlatButton from '../../buttons/flat-button';
import {
  Toolbar,
  ToolbarMainControls,
  ToolbarRightControls,
  EditorContainer,
  Container,
} from './rich-text-input.styles';
import Divider from './divider';
import MultiDropdown from './multi-dropdown';
import messages from './messages';

const tooltipStyles = {
  body: {
    zIndex: 9999,
  },
};
const DEFAULT_NODE = 'paragraph';

const NUMBERED_LIST = 'numbered-list';
const BULLETED_LIST = 'bulleted-list';
const LIST_ITEM = 'list-item';

const COLLAPSED_HEIGHT = 32;

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
const Editor = props => {
  const intl = useIntl();

  const dropdownOptions = createMoreStylesDropdownOptions(intl);
  const styleDropdownOptions = createStyleDropdownOptions(intl);

  const { editor } = props;
  const ref = React.useRef();

  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  React.useEffect(() => {
    const doesExceedCollapsedHeightLimit =
      ref.current.clientHeight > COLLAPSED_HEIGHT;

    if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
      setRenderToggleButton(false);
    }
  }, [editor.value, renderToggleButton]);

  const activeBlock =
    (editor.value.blocks.first() && editor.value.blocks.first().type) || '';

  const activeMarks = Array.from(editor.value.activeMarks).map(
    mark => mark.type
  );

  const activeMoreStyleMarks = activeMarks.filter(activeMark =>
    dropdownOptions.some(dropdownOption => activeMark === dropdownOption.value)
  );

  const hasBlock = type => editor.value.blocks.some(node => node.type === type);

  const onClickBlock = ({ value: type }) => {
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== BULLETED_LIST && type !== NUMBERED_LIST) {
      const isActive = hasBlock(type);
      const isList = hasBlock(LIST_ITEM);

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock(BULLETED_LIST)
          .unwrapBlock(NUMBERED_LIST);
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock(LIST_ITEM);
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock(BULLETED_LIST)
          .unwrapBlock(NUMBERED_LIST);
      } else if (isList) {
        editor
          .unwrapBlock(type === BULLETED_LIST ? NUMBERED_LIST : BULLETED_LIST)
          .wrapBlock(type);
      } else {
        editor.setBlocks(LIST_ITEM).wrapBlock(type);
      }
    }
  };

  const { toggleMark } = editor;

  const onChangeMoreStyles = val => {
    if (!editor.value.selection.isFocused) {
      editor.focus();
    }
    toggleMark(val.value);
  };

  const hasUndos = editor.hasUndos();
  const hasRedos = editor.hasRedos();

  return (
    <CollapsibleMotion
      minHeight={32}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        return (
          <Constraints.Horizontal constraint={props.horizontalConstraint}>
            <Spacings.Stack scale="xs">
              <Container
                hasError={props.hasError}
                hasWarning={props.hasWarning}
                isReadOnly={props.isReadOnly}
                isDisabled={props.isDisabled}
                onFocus={() => {
                  if (!isOpen) {
                    toggle();
                    setTimeout(() => setRenderToggleButton(true), 0);
                  }
                }}
              >
                <Toolbar isOpen={isOpen}>
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
                        isActive={editor.hasBoldMark()}
                        label={intl.formatMessage(messages.boldButtonLabel)}
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleBoldMark();
                        }}
                        icon={<BoldIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title={intl.formatMessage(messages.italicTooltipTitle)}
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasItalicMark()}
                        label={intl.formatMessage(messages.italicButtonLabel)}
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleItalicMark();
                        }}
                        icon={<ItalicIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title={intl.formatMessage(
                        messages.underlinedTooltipTitle
                      )}
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasUnderlinedMark()}
                        label={intl.formatMessage(
                          messages.underlinedButtonLabel
                        )}
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleUnderlinedMark();
                        }}
                        icon={<UnderlineIcon size="medium" />}
                      />
                    </Tooltip>
                    <MultiDropdown
                      label={intl.formatMessage(
                        messages.moreStylesDropdownLabel
                      )}
                      dropdownOptions={dropdownOptions}
                      selectedItems={activeMoreStyleMarks}
                      onSelect={onChangeMoreStyles}
                    />
                    <Divider />
                    <Tooltip
                      title={intl.formatMessage(
                        messages.orderedListTooltipTitle
                      )}
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasNumberedListBlock()}
                        label={intl.formatMessage(
                          messages.orderedListButtonLabel
                        )}
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleNumberedListBlock();
                        }}
                        icon={<OrderedListIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title={intl.formatMessage(
                        messages.unorderedListTooltipTitle
                      )}
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasBulletedListBlock()}
                        label={intl.formatMessage(
                          messages.unorderedListButtonLabel
                        )}
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleBulletedListBlock();
                        }}
                        icon={<UnorderedListIcon size="medium" />}
                      />
                    </Tooltip>
                  </ToolbarMainControls>
                  <ToolbarRightControls
                    css={css`
                      display: flex;
                      flex-wrap: wrap;

                      > * {
                        margin-left: 1px !important;
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
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleUndo();
                        }}
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
                        onMouseDown={event => {
                          event.preventDefault();
                          editor.toggleRedo();
                        }}
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
                <div style={containerStyles}>
                  <div ref={registerContentNode}>
                    <EditorContainer
                      hasError={props.hasError}
                      hasWarning={props.hasWarning}
                      isReadOnly={props.isReadOnly}
                      isDisabled={props.isDisabled}
                      ref={ref}
                    >
                      {props.children}
                    </EditorContainer>
                  </div>
                </div>
              </Container>
              {renderToggleButton && (
                <div
                  css={css`
                    display: flex;
                    justify-content: flex-end;
                  `}
                >
                  <FlatButton
                    onClick={toggle}
                    label={
                      isOpen
                        ? intl.formatMessage(messages.collapse)
                        : intl.formatMessage(messages.expand)
                    }
                    icon={
                      isOpen ? (
                        <AngleUpIcon size="small" />
                      ) : (
                        <AngleDownIcon size="small" />
                      )
                    }
                  />
                </div>
              )}
            </Spacings.Stack>
          </Constraints.Horizontal>
        );
      }}
    </CollapsibleMotion>
  );
};

// eslint-disable-next-line react/display-name
const renderEditor = (props, editor, next) => {
  const children = next();

  const passedProps = {
    name: props.name,
    id: props.id,
    isDisabled: props.disabled,
    horizontalConstraint: props.options.horizontalConstraint,
    defaultExpandMultilineText: props.options.defaultExpandMultilineText,
    hasError: props.options.hasError,
    hasWarning: props.options.hasWarning,
    isReadOnly: props.readOnly,
    ...filterDataAttributes(props),
  };

  return (
    <Editor editor={editor} {...passedProps}>
      {children}
    </Editor>
  );
};

const sharedProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
};

Editor.displayName = 'Editor';
Editor.propTypes = { ...sharedProps, editor: PropTypes.any };

renderEditor.propTypes = {
  ...sharedProps,
  options: PropTypes.shape({
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
  }),
};

export default renderEditor;
