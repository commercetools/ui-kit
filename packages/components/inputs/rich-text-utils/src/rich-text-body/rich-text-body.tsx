//TODO: @redesign cleanup
import {
  forwardRef,
  useCallback,
  type ReactNode,
  type LegacyRef,
  type CSSProperties,
  type ElementType,
} from 'react';
import { warning } from '@commercetools-uikit/utils';
import { useSlate } from 'slate-react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { useIntl } from 'react-intl';
import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import { CaretDownIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import {
  BoldIcon,
  ExpandFullIcon,
  ExpandIcon,
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
import messages from './messages';
import { MarkButton, BlockButton } from './slate-buttons';
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  isBlockActive,
} from '../slate-helpers';
import type { TDropdownLabel } from './dropdown';

type TMoreStylesDropdownItem = {
  value?: string;
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

export type TRichtTextEditorBodyRef = {
  registerContentNode: TNodeRefObject;
  containerRef?: LegacyRef<HTMLDivElement>;
};

export type TRichTextEditorBody = {
  styles?: {
    container?: SerializedStyles;
  };
  hasError?: boolean;
  isReadOnly: boolean;
  hasWarning?: boolean;
  isDisabled?: boolean;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  containerStyles: CSSProperties;
  children: ReactNode;
  isNewTheme?: boolean;
};

const MoreStylesDropdownLabel = () => <MoreStylesIcon size="medium" />;
MoreStylesDropdownLabel.displayName = 'MoreStylesDropdownLabel';

const MoreStylesDropdownItem = (props: TMoreStylesDropdownItem) => {
  let Icon;
  switch (props.value) {
    case MARK_TAGS.sub:
      Icon = SubscriptIcon;
      break;
    case MARK_TAGS.del:
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

const DropdownLabel = (props: TDropdownLabel) => {
  return (
    <Inline scale="xs" alignItems="center" justifyContent="center">
      <span>{props.children}</span>
      <CaretDownIcon size="small" />
    </Inline>
  );
};

DropdownLabel.displayName = 'DropdownLabel';

const Item = styled.div`
  margin: 0;
  text-align: left;
`;

const StylesDropdownItem = (props: TStylesDropdownItem) => {
  const asProp = (Object.keys(BLOCK_TAGS).find(
    (key) => BLOCK_TAGS[key as keyof typeof BLOCK_TAGS] === props.value
  ) || 'div') as ElementType;

  return (
    <DropdownItem {...props}>
      <Item as={asProp}>{props.children}</Item>
    </DropdownItem>
  );
};

StylesDropdownItem.displayName = 'StylesDropdownItem';

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

const RichTextEditorBody = forwardRef<
  TRichtTextEditorBodyRef,
  TRichTextEditorBody
>((props, ref) => {
  // NOTE: the forwarded ref is an object of refs, thus making it a bit trickier to type.
  const { registerContentNode, containerRef } =
    ref as unknown as TRichtTextEditorBodyRef;
  const intl = useIntl();
  const editor = useSlate();
  const { isNewTheme } = useTheme();

  const dropdownOptions = createMoreStylesDropdownOptions(intl);
  const styleDropdownOptions = createStyleDropdownOptions(intl);

  const hasUndos = editor.history.undos.length > 0;
  const hasRedos = editor.history.redos.length > 0;

  const onClickBlock = useCallback(
    ({ value: format }) => {
      toggleBlock(editor, format);
    },
    [editor]
  );
  const onClickMoreStyleMark = useCallback(
    ({ value: format }) => {
      toggleMark(editor, format);
    },
    [editor]
  );
  const getIsMoreStyleMarkItemSelected = useCallback(
    ({ value: format }) => isMarkActive(editor, format),
    [editor]
  );
  const getIsBlockItemSelected = useCallback(
    ({ value: format }) => isBlockActive(editor, format),
    [editor]
  );

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
      css={props.styles?.container}
      hasError={props.hasError}
      hasWarning={props.hasWarning}
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
    >
      <Toolbar onMouseDown={onToolbarMouseDown}>
        <ToolbarMainControls>
          <Dropdown
            label={intl.formatMessage(messages.styleDropdownLabel)}
            onChange={onClickBlock}
            options={styleDropdownOptions}
            components={{
              Item: StylesDropdownItem,
              Label: DropdownLabel,
            }}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
            getIsItemSelected={getIsBlockItemSelected}
          />
          <Tooltip
            title={intl.formatMessage(messages.boldButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <MarkButton
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.boldButtonLabel)}
              format={MARK_TAGS.strong}
            >
              <BoldIcon size="medium" />
            </MarkButton>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.italicButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <MarkButton
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.italicButtonLabel)}
              format={MARK_TAGS.em}
            >
              <ItalicIcon size="medium" />
            </MarkButton>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.underlinedButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <MarkButton
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.underlinedButtonLabel)}
              format={MARK_TAGS.u}
            >
              <UnderlineIcon size="medium" />
            </MarkButton>
          </Tooltip>
          <Dropdown
            isMulti={true}
            label={intl.formatMessage(messages.moreStylesDropdownLabel)}
            options={dropdownOptions}
            onChange={onClickMoreStyleMark}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
            components={{
              Item: MoreStylesDropdownItem,
              Label: MoreStylesDropdownLabel,
            }}
            getIsItemSelected={getIsMoreStyleMarkItemSelected}
          />
          <Divider
            css={css`
              margin: ${designTokens.marginForRichTextDivider};
            `}
          />
          <Tooltip
            title={intl.formatMessage(messages.orderedListButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <BlockButton
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.orderedListButtonLabel)}
              format={BLOCK_TAGS.ol}
            >
              <OrderedListIcon size="medium" />
            </BlockButton>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage(messages.unorderedListButtonLabel)}
            placement="bottom"
            styles={tooltipStyles}
          >
            <BlockButton
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
              label={intl.formatMessage(messages.unorderedListButtonLabel)}
              format={BLOCK_TAGS.ul}
            >
              <UnorderedListIcon size="medium" />
            </BlockButton>
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
              onClick={editor.undo}
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
              onClick={editor.redo}
            >
              <RedoIcon size="medium" />
            </Button>
          </Tooltip>
          {props.showExpandIcon && (
            <>
              <Divider
                css={css`
                  margin: ${designTokens.marginForRichTextDivider};
                `}
              />
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
                  {isNewTheme ? (
                    <ExpandIcon size="medium" />
                  ) : (
                    <ExpandFullIcon size="medium" />
                  )}
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
            isNewTheme={isNewTheme}
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
