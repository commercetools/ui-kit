import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import Button from './button';
import StyleDropdown from './style-dropdown';
import MarkButton from './buttons/mark-button';
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

const COLLAPSED_HEIGHT = 64;

const dropdownOptions = [
  { label: 'Strikethrough', value: 'strikethrough' },
  { label: 'Superscript', value: 'superscript' },
  { label: 'Subscript', value: 'subscript' },
];

const Editor = props => {
  const intl = useIntl();
  const { editor } = props;
  const ref = React.useRef();
  const [renderToggleButton, setRenderToggleButton] = React.useState(false);

  React.useEffect(() => {
    if (ref.current.clientHeight > COLLAPSED_HEIGHT && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (ref.current.clientHeight <= COLLAPSED_HEIGHT && renderToggleButton) {
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

  const onChangeMoreStyles = React.useCallback(
    val => {
      if (!editor.value.selection.isFocused) {
        editor.focus();
      }
      toggleMark(val.value);
    },
    [toggleMark, editor]
  );

  const hasUndos = editor.hasUndos();
  const hasRedos = editor.hasRedos();

  return (
    <CollapsibleMotion minHeight={32}>
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        return (
          <Constraints.Horizontal constraint={props.horizontalConstraint}>
            <Spacings.Stack scale="xs">
              <Container
                {...props}
                ref={ref}
                onFocus={() => {
                  if (!isOpen) {
                    toggle();
                    setTimeout(() => setRenderToggleButton(true), 0);
                  }
                }}
              >
                <Toolbar {...props} isOpen={isOpen}>
                  <ToolbarMainControls>
                    <StyleDropdown
                      value={activeBlock}
                      onChange={onClickBlock}
                    />
                    <Tooltip
                      title="Bold"
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <MarkButton
                        isActive={editor.hasBoldMark()}
                        type="bold"
                        onClickMark={editor.toggleBoldMark}
                        icon={<BoldIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title="Italic"
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <MarkButton
                        isActive={editor.hasItalicMark()}
                        type="italic"
                        onClickMark={editor.toggleItalicMark}
                        icon={<ItalicIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title="Underlined"
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <MarkButton
                        isActive={editor.hasUnderlinedMark()}
                        type="underlined"
                        onClickMark={editor.toggleUnderlinedMark}
                        icon={<UnderlineIcon size="medium" />}
                      />
                    </Tooltip>
                    <MultiDropdown
                      label="More styles"
                      dropdownOptions={dropdownOptions}
                      selectedItems={activeMoreStyleMarks}
                      onSelect={onChangeMoreStyles}
                    />
                    <Divider />
                    <Tooltip
                      title="Numbered list"
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasNumberedListBlock()}
                        label={'numbered-list'}
                        onMouseDown={editor.toggleNumberedListBlock}
                        icon={<OrderedListIcon size="medium" />}
                      />
                    </Tooltip>
                    <Tooltip
                      title="Bulleted list"
                      placement="bottom"
                      styles={tooltipStyles}
                    >
                      <Button
                        isActive={editor.hasBulletedListBlock()}
                        label={'ordered-list'}
                        onMouseDown={editor.toggleBulletedListBlock}
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
                    <Tooltip title="Undo" placement="bottom" off={!hasUndos}>
                      <Button
                        active={false}
                        label={'undo'}
                        isDisabled={!hasUndos}
                        onMouseDown={editor.toggleUndo}
                        icon={
                          <UndoIcon
                            color={!hasUndos ? 'neutral60' : 'solid'}
                            size="medium"
                          />
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Redo" placement="bottom" off={!hasRedos}>
                      <Button
                        active={false}
                        label={'redo'}
                        isDisabled={!hasRedos}
                        onMouseDown={editor.toggleRedo}
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
                    <EditorContainer {...props}>
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

const renderEditor = (props, editor, next) => {
  const children = next();

  const passedProps = {
    name: props.name,
    id: props.id,
    isDisabled: props.disabled,
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

renderEditor.displayName = 'renderEditor';
renderEditor.propTypes = {
  ...sharedProps,
  options: PropTypes.shape({
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
  }),
};

export default renderEditor;
