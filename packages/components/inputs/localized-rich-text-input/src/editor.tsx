import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
  type LegacyRef,
  type RefObject,
  type Ref,
  type FocusEventHandler,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MessageDescriptor, useIntl } from 'react-intl';
import { designTokens } from '@commercetools-uikit/design-system';
import { warning, filterDataAttributes } from '@commercetools-uikit/utils';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import FlatButton from '@commercetools-uikit/flat-button';
import { messagesMultilineInput } from '@commercetools-uikit/input-utils';
import {
  AdditionalInfoMessage,
  ErrorMessage,
  WarningMessage,
} from '@commercetools-uikit/messages';
import {
  RichTextBody,
  HiddenInput,
  Element,
  Leaf,
  toggleMark,
  resetEditor,
  focusEditor,
} from '@commercetools-uikit/rich-text-utils';
import {
  Editable,
  withReact,
  Slate,
  ReactEditor,
  type RenderElementProps,
  type RenderLeafProps,
} from 'slate-react';
import { createEditor, type Descendant } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import pipe from 'lodash/fp/pipe';
import {
  EditorWrapper,
  EditorLanguageLabel,
  ToggleButtonWrapper,
} from './editor.styles';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const COLLAPSED_HEIGHT = 32;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

const RightColumn = styled.div`
  position: relative;
  flex: 0;
  display: flex;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export type TEditorProps = {
  children?: ReactNode;
  name?: string;
  id?: string;
  isOpen: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasWarning?: boolean;
  hasError?: boolean;
  error?: ReactNode;
  warning?: ReactNode;
  additionalInfo?:
    | string
    | ReactNode
    | (MessageDescriptor & {
        values: Record<string, ReactNode>;
      });
  defaultExpandMultilineText: boolean;
  toggleLanguage: (language: string) => void;
  language: string;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  hasLanguagesControl?: boolean;
  value: Descendant[];
  onChange: (state: Descendant[]) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  isAutofocused?: boolean;
  placeholder?: string;
  ref?: Ref<unknown>;
};

type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

type TRichTextEditorBodyRef = {
  registerContentNode: TNodeRefObject;
  containerRef: RefObject<HTMLDivElement>;
};

const renderElement = (props: RenderElementProps) => <Element {...props} />;
const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

const Editor = forwardRef((props: TEditorProps, forwardedRef) => {
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>();

  const createEditorWithPlugins = pipe(withReact, withHistory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

  if (props.showExpandIcon) {
    warning(
      typeof props.onClickExpand === 'function',
      'Editor: "onClickExpand" is required when showExpandIcon is true'
    );
  }

  const [renderToggleButton, setRenderToggleButton] = useState(false);

  const { toggleLanguage } = props;
  const onToggle = useCallback(() => {
    toggleLanguage(props.language);
  }, [toggleLanguage, props.language]);

  const updateRenderToggleButton = useCallback(() => {
    const doesExceedCollapsedHeightLimit =
      Number(ref.current?.clientHeight) > COLLAPSED_HEIGHT;

    if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
      setRenderToggleButton(false);
    }
  }, [setRenderToggleButton, renderToggleButton]);

  useEffect(() => {
    updateRenderToggleButton();
  }, [editor, updateRenderToggleButton]);

  // resetting
  const resetValue = useCallback(
    (newValue: string | Record<string, string>) => {
      const newStringValue =
        typeof newValue === 'string'
          ? newValue
          : newValue?.[props.language] ?? '';

      resetEditor(editor, newStringValue);
    },
    [editor, props.language]
  );
  /*
  Resetting the editor requires access to `editor` object returned from `useSlate` hook.
  Therefore, `reset` function is attached to the passed `ref` object via `useImperativeHandle`
  to be called from the parent component.
  e.g. <button onMouseDown={() => ref.current?.resetValue("<p><strong>Value after reset</strong></p>")}>Reset</button>
  */
  useImperativeHandle(forwardedRef, () => {
    return {
      resetValue,
    };
  });

  const shouldToggleButtonTakeSpace =
    /*
      - if hasLanguagesControl and there are no errors/warnings to display
      - then the toggleButton is absolutely positioned
      This is because the toggle button is placed next to the LocalizedInputToggle without being siblings in the DOM.
      If there is a error or warning showing,
      then it can be placed statically because it will then be a sibling to the error/warning message
      and LocalizedInputToggle is placed below the errors/warnings.
    */

    (renderToggleButton && !props.hasLanguagesControl) ||
    props.error ||
    props.warning ||
    props.additionalInfo;

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isClosed={!props.isOpen}
      onToggle={onToggle}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        const refObj = {
          containerRef: ref,
          registerContentNode,
        };

        return (
          <Stack scale="xs">
            <EditorWrapper
              key={props.language}
              isDisabled={props.isDisabled}
              isReadOnly={props.isReadOnly}
            >
              <Slate
                editor={editor}
                value={props.value}
                onChange={props.onChange}
              >
                <EditorLanguageLabel
                  htmlFor={props.id}
                  isDisabled={props.isDisabled}
                  isReadOnly={props.isReadOnly}
                >
                  {/* FIXME: add proper tone for disabled when tones are refactored */}
                  <Text.Detail tone="secondary">
                    {props.language.toUpperCase()}
                  </Text.Detail>
                </EditorLanguageLabel>
                <RichTextBody
                  // @ts-ignore
                  ref={refObj as unknown as Ref<TRichTextEditorBodyRef>}
                  styles={{
                    container: css`
                      flex: auto;
                      width: 0;
                      border-top-left-radius: 0;
                      border-bottom-left-radius: 0;
                    `,
                  }}
                  hasError={props.hasError}
                  isDisabled={props.isDisabled}
                  hasWarning={props.hasWarning}
                  isReadOnly={Boolean(props.isReadOnly)}
                  showExpandIcon={Boolean(props.showExpandIcon)}
                  onClickExpand={props.onClickExpand}
                  containerStyles={containerStyles}
                >
                  <Editable
                    {...filterDataAttributes(props)}
                    name={props.name}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={props.placeholder}
                    autoFocus={props.isAutofocused}
                    onBlur={props.onBlur}
                    onFocus={(event) => {
                      props.onFocus?.(event);
                      // opens the input if it regains focus and it's closed
                      if (!isOpen) {
                        toggle();
                        focusEditor(editor);
                      }
                    }}
                    readOnly={props.isReadOnly}
                    disabled={props.isDisabled}
                    onKeyDown={(event) => {
                      for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                          event.preventDefault();
                          const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                          toggleMark(editor, mark);
                          break;
                        }
                      }
                    }}
                  />
                  {props.children}
                  <HiddenInput
                    isFocused={ReactEditor.isFocused(editor)}
                    handleFocus={() => {
                      focusEditor(editor);
                    }}
                    id={props.id}
                    disabled={props.isDisabled}
                    readOnly={props.isReadOnly}
                  />
                </RichTextBody>
              </Slate>
            </EditorWrapper>
            <Row
              // NOTE: applying this style withing the `styled` component results in the production
              // bundle to apply the style in the wrong order.
              // For instance, we need to override the marging of the spacing component, which also
              // uses `!important`.
              // Anyway, apparently by passing the style as a `css` prop to the `styled` component
              // does the trick.
              // TODO: revisit the logic and the implementation to maybe avoid having to apply this style.
              css={css`
                margin-top: ${shouldToggleButtonTakeSpace
                  ? 'inherit'
                  : '0px !important'};
              `}
            >
              {(() => {
                if (props.error)
                  return (
                    <LeftColumn>
                      <ErrorMessage>{props.error}</ErrorMessage>
                    </LeftColumn>
                  );
                if (props.warning)
                  return (
                    <LeftColumn>
                      <WarningMessage>{props.warning}</WarningMessage>
                    </LeftColumn>
                  );
                return null;
              })()}
              {renderToggleButton && (
                <RightColumn>
                  <ToggleButtonWrapper
                    css={[
                      !shouldToggleButtonTakeSpace &&
                        css`
                          position: absolute;
                          top: 0;
                          right: 0;
                          margin-top: ${designTokens.spacing10};
                        `,
                    ]}
                  >
                    <FlatButton
                      onClick={toggle}
                      label={intl.formatMessage(
                        isOpen
                          ? messagesMultilineInput.collapse
                          : messagesMultilineInput.expand
                      )}
                      icon={
                        isOpen ? (
                          <AngleUpIcon size="small" />
                        ) : (
                          <AngleDownIcon size="small" />
                        )
                      }
                    />
                  </ToggleButtonWrapper>
                </RightColumn>
              )}
            </Row>
            {props.additionalInfo && (
              <LeftColumn>
                <AdditionalInfoMessage message={props.additionalInfo} />
              </LeftColumn>
            )}
          </Stack>
        );
      }}
    </CollapsibleMotion>
  );
});
Editor.displayName = 'Editor';

export default Editor;
