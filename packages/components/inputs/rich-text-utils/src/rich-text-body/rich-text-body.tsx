import {
  forwardRef,
  type ReactNode,
  useCallback,
  LegacyRef,
  CSSProperties,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import { CaretDownIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import {
  BoldIcon,
  ExpandFullIcon,
  ItalicIcon,
  UnorderedListIcon,
  OrderedListIcon,
  UnderlineIcon,
  RedoIcon,
  UndoIcon,
  SubscriptIcon,
  StrikethroughIcon,
  SuperscriptIcon,
  MoreStylesIcon,
} from './icons';
import {
  Toolbar,
  ToolbarMainControls,
  ToolbarRightControls,
  EditorContainer,
  Container,
} from './rich-text-body.styles';
import Button from './rich-text-body-button';
import Divider from './divider';
import Dropdown from './dropdown';
import { DropdownItem } from './dropdown.styles';
import { MARK_TAGS, BLOCK_TAGS } from '../tags';
import hasBlock from '../has-block';
import messages from './messages';
import { warning } from '@commercetools-uikit/utils';

type TMoreStylesDropdownItem = {
  value?: string;
  children?: ReactNode;
};

type TDropdownLabel = {
  children?: ReactNode;
};

type TStylesDropdownItem = {
  value?: string;
  children?: ReactNode;
  displayName?: string;
};

type TStyleDropdownOptionParagraph = {
  id: string;
  description: string;
  defaultMessage: string;
};

type TStyleDropdownOptions = {
  formatMessage: (message: TStyleDropdownOptionParagraph) => string;
};

type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

type TRef = {
  registerContentNode: TNodeRefObject;
  containerRef?: LegacyRef<HTMLDivElement>;
};

type TType = {
  type: string;
};

type TEditor = {
  value?: {
    blocks: {
      some: (block: unknown) => boolean | void;
      first: () => {
        type: string[];
      };
    };
    document: {
      getClosest: (
        block: { key: unknown },
        s: (parent: { type: TType }) => boolean
      ) => void;
      getParent: (x: string) => {
        type: string;
      };
    };
    selection: {
      isFocused: boolean;
    };
    activeMarks: TMark[];
  };
  hasUndos: () => boolean;
  hasRedos: () => boolean;
  setBlocks: (s: string) => {
    wrapBlock: (type: unknown) => void;
    unwrapBlock: (s: string) => {
      unwrapBlock: (s: string) => void;
    };
  };
  unwrapBlock: (type: string) => {
    wrapBlock: (type: string) => void;
  };
  toggleMark: (value: unknown) => void;
  hasBoldMark: () => boolean;
  toggleBoldMark: () => void;
  hasItalicMark: () => boolean;
  toggleItalicMark: () => boolean;
  hasUnderlinedMark: () => boolean;
  toggleUnderlinedMark: () => void;
  hasNumberedListBlock: () => boolean;
  toggleNumberedListBlock: () => void;
  hasBulletedListBlock: () => boolean;
  toggleBulletedListBlock: () => void;
  toggleUndo: () => void;
  toggleRedo: () => void;
};

type TMark = {
  type: string;
};

type TRichTextEditorBody = {
  editor: TEditor;
  styles: {
    container?: string;
  };
  hasError?: boolean;
  isReadOnly: boolean;
  hasWarning?: boolean;
  isDisabled?: boolean;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  containerStyles: CSSProperties;
  children: ReactNode;
};

const MoreStylesDropdownLabel = () => <MoreStylesIcon size="medium" />;
MoreStylesDropdownLabel.displayName = 'MoreStylesDropdownLabel';

const MoreStylesDropdownItem = (props: TMoreStylesDropdownItem) => {
  let Icon;
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
    <DropdownItem {...props}>
      <Inline scale="xs" alignItems="center" justifyContent="flex-start">
        <Icon size="medium" />
        <div>{props.children}</div>
      </Inline>
    </DropdownItem>
  );
};

MoreStylesDropdownItem.displayName = 'MoreStylesDropdownItem';
MoreStylesDropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DropdownLabel = (props: TDropdownLabel) => {
  return (
    <Inline scale="xs" alignItems="center" justifyContent="center">
      <span>{props.children}</span>
      <CaretDownIcon size="small" />
    </Inline>
  );
};

DropdownLabel.displayName = 'DropdownLabel';
DropdownLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

const Item = styled.div`
  margin: 0;
  text-align: left;
`;

const StylesDropdownItem = (props: TStylesDropdownItem) => {
  const as =
    Object.keys(BLOCK_TAGS).find(
      (key) => BLOCK_TAGS[key as keyof typeof BLOCK_TAGS] === props.value
    ) || 'div';

  return (
    <DropdownItem {...props}>
      <Item as={as as React.ElementType}>{props.children}</Item>
    </DropdownItem>
  );
};

StylesDropdownItem.displayName = 'StylesDropdownItem';

const DEFAULT_NODE = BLOCK_TAGS.p;

const tooltipStyles = {
  body: {
    zIndex: 9999,
  },
};

const createStyleDropdownOptions = (intl: TStyleDropdownOptions) => {
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

const createMoreStylesDropdownOptions = (intl: TStyleDropdownOptions) => {
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

const RichTextEditorBody = forwardRef((props: TRichTextEditorBody, ref) => {
  const { registerContentNode, containerRef } = ref as unknown as TRef;
  const intl = useIntl();

  const dropdownOptions = createMoreStylesDropdownOptions(intl);
  const styleDropdownOptions = createStyleDropdownOptions(intl);

  const hasUndos = props.editor.hasUndos();
  const hasRedos = props.editor.hasRedos();

  const onClickBlock = useCallback(
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
        const isType = props.editor.value?.blocks.some(
          (block: { key: { key: unknown } }) => {
            return !!props.editor.value?.document.getClosest(
              block.key,
              (parent) => parent.type === type
            );
          }
        );

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

  const onChangeMoreStyles = useCallback(
    (val) => {
      props.editor.toggleMark(val.value);
    },
    [props.editor]
  );

  const activeBlock =
    (props.editor.value?.blocks.first() &&
      props.editor.value?.blocks.first().type) ||
    '';

  // so that we don't show our multi dropdown in an `indeterminate`
  // while the component is not in focus
  let activeMoreStyleMarks: Array<unknown> = [];

  if (props.editor.value?.selection.isFocused) {
    const activeMarks = Array.from(props.editor.value.activeMarks).map(
      (mark) => {
        return mark.type;
      }
    );

    activeMoreStyleMarks = activeMarks.filter((activeMark) =>
      dropdownOptions.some(
        (dropdownOption) => activeMark === dropdownOption.value
      )
    );
  }

  // https://codepen.io/mudassir0909/pen/eIHqB

  // we prevent all our defined onClicks inside of the CalendarHeader
  // from blurring our input.
  const onToolbarMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);

  if (props.showExpandIcon) {
    warning(
      typeof props.onClickExpand === 'function',
      'RichTextUtils: "onClickExpand" is required when showExpandIcon is true'
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
      <Toolbar onMouseDown={onToolbarMouseDown}>
        <ToolbarMainControls>
          <Dropdown
            label={intl.formatMessage(messages.styleDropdownLabel)}
            value={activeBlock as string[]}
            onChange={onClickBlock}
            options={styleDropdownOptions}
            components={{
              Item: StylesDropdownItem,
              Label: DropdownLabel,
            }}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
          />
          <Tooltip
            title={intl.formatMessage(messages.boldButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value?.selection.isFocused &&
                props.editor.hasBoldMark()
              }
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
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
                props.editor.value?.selection.isFocused &&
                props.editor.hasItalicMark()
              }
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
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
                props.editor.value?.selection.isFocused &&
                props.editor.hasUnderlinedMark()
              }
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.underlinedButtonLabel)}
              onClick={props.editor.toggleUnderlinedMark}
            >
              <UnderlineIcon size="medium" />
            </Button>
          </Tooltip>
          <Dropdown
            isMulti={true}
            label={intl.formatMessage(messages.moreStylesDropdownLabel)}
            options={dropdownOptions}
            value={activeMoreStyleMarks as string[]}
            onChange={onChangeMoreStyles}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
            components={{
              Item: MoreStylesDropdownItem,
              Label: MoreStylesDropdownLabel,
            }}
          />
          <Divider />
          <Tooltip
            title={intl.formatMessage(messages.orderedListButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <Button
              isActive={
                props.editor.value?.selection.isFocused &&
                props.editor.hasNumberedListBlock()
              }
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
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
                props.editor.value?.selection.isFocused &&
                props.editor.hasBulletedListBlock()
              }
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
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
              isReadOnly={props.isReadOnly}
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
              isReadOnly={props.isReadOnly}
              onClick={props.editor.toggleRedo}
            >
              <RedoIcon size="medium" />
            </Button>
          </Tooltip>
          {props.showExpandIcon && (
            <>
              <Divider />
              <Tooltip
                title={intl.formatMessage(messages.expandButtonLabel)}
                placement="bottom-end"
              >
                <Button
                  isActive={false}
                  isDisabled={props.isDisabled}
                  isReadOnly={props.isReadOnly}
                  label={intl.formatMessage(messages.expandButtonLabel)}
                  onClick={props.onClickExpand}
                >
                  <ExpandFullIcon size="medium" />
                </Button>
              </Tooltip>
            </>
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

const defaultProps: Pick<TRichTextEditorBody, 'styles'> = {
  styles: {},
};

RichTextEditorBody.displayName = 'RichTextEditorBody';

RichTextEditorBody.defaultProps = defaultProps;

export default RichTextEditorBody;
