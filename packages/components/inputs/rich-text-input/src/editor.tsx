import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
  type LegacyRef,
  type RefObject,
  type Ref,
  type FocusEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import { messagesMultilineInput } from '@commercetools-uikit/input-utils';
import {
  RichTextBody,
  HiddenInput,
  Element,
  Leaf,
  Softbreaker,
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
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { EditorWrapper } from './editor.styles';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const COLLAPSED_HEIGHT = 32;

export type TEditorProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  horizontalConstraint?:
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  children?: ReactNode;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  hasWarning?: boolean;
  hasError?: boolean;
  defaultExpandMultilineText?: boolean;
  value: Descendant[];
  onChange: (state: Descendant[]) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  isAutofocused?: boolean;
  ref?: Ref<unknown>;
};

type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

type TRichtTextEditorBodyRef = {
  registerContentNode: TNodeRefObject;
  containerRef: RefObject<HTMLDivElement>;
};

const renderElement = (props: RenderElementProps) => <Element {...props} />;
const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

const Editor = forwardRef((props: TEditorProps, forwardedRef) => {
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>(null);

  const createEditorWithPlugins = pipe(withReact, withHistory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

  const [renderToggleButton, setRenderToggleButton] = useState(false);

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
    (newValue: string) => {
      resetEditor(editor, newValue);
    },
    [editor]
  );
  /*
  Resetting the editor requires access to `editor` object returned from `useSlate` hook.
  Therefore, `reset` function is attached to the passed `ref` object via `useImperativeHandle` hook
  to be called from the parent component.
  e.g. <button onMouseDown={() => ref.current?.resetValue("<p><strong>Value after reset</strong></p>")}>Reset</button>
  */
  useImperativeHandle(forwardedRef, () => {
    return {
      resetValue,
    };
  });

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        const refObj: TRichtTextEditorBodyRef = {
          containerRef: ref,
          registerContentNode,
        };
        return (
          <Constraints.Horizontal max={props.horizontalConstraint}>
            <Stack scale="xs" alignItems="flex-end">
              <EditorWrapper
                isDisabled={props.isDisabled}
                isReadOnly={props.isReadOnly}
              >
                <Slate
                  editor={editor}
                  value={props.value}
                  onChange={props.onChange}
                >
                  <RichTextBody
                    // @ts-ignore
                    ref={refObj as unknown as Ref<TRichtTextEditorBodyRef>}
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
                      readOnly={props.isReadOnly}
                      disabled={props.isDisabled}
                      onBlur={props.onBlur}
                      onFocus={(event) => {
                        props.onFocus?.(event);
                        // opens the input if it regains focus and it's closed
                        if (!isOpen) {
                          toggle();
                          focusEditor(editor);
                        }
                      }}
                      onKeyDown={(event) => {
                        for (const hotkey in HOTKEYS) {
                          if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark =
                              HOTKEYS[hotkey as keyof typeof HOTKEYS];
                            toggleMark(editor, mark);
                            break;
                          }
                        }

                        if (event.shiftKey && event.key === 'Enter') {
                          event.preventDefault();
                          editor.insertText(Softbreaker.placeholderCharacter);
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
              {renderToggleButton && (
                <FlatButton
                  onClick={toggle}
                  label={
                    isOpen
                      ? intl.formatMessage(messagesMultilineInput.collapse)
                      : intl.formatMessage(messagesMultilineInput.expand)
                  }
                  icon={
                    isOpen ? (
                      <AngleUpIcon size="small" />
                    ) : (
                      <AngleDownIcon size="small" />
                    )
                  }
                />
              )}
            </Stack>
          </Constraints.Horizontal>
        );
      }}
    </CollapsibleMotion>
  );
});
Editor.displayName = 'Editor';

export default Editor;
