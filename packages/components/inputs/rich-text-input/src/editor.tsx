import {
  useRef,
  useState,
  useCallback,
  useEffect,
  cloneElement,
  type ReactNode,
  type LegacyRef,
  type RefObject,
  type Ref,
  type ReactElement,
} from 'react';
import { useIntl } from 'react-intl';
import pick from 'lodash/pick';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import { usePrevious } from '@commercetools-uikit/hooks';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import { messagesMultilineInput } from '@commercetools-uikit/input-utils';
import type { TEditor as TSlateReactEditor } from 'slate-react';
import {
  RichTextBody,
  HiddenInput,
} from '@commercetools-uikit/rich-text-utils';
import { EditorWrapper } from './editor.styles';

const COLLAPSED_HEIGHT = 32;

export type TEditorProps = {
  editor: TSlateReactEditor;
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
};

type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

type TRichtTextEditorBodyRef = {
  registerContentNode: TNodeRefObject;
  containerRef: RefObject<HTMLDivElement>;
};

const Editor = (props: TEditorProps) => {
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>(null);

  const prevIsFocused = usePrevious(props.editor.value.selection.isFocused);

  const [renderToggleButton, setRenderToggleButton] = useState(false);

  const updateRenderToggleButton = useCallback(() => {
    const doesExceedCollapsedHeightLimit =
      ref.current?.clientHeight ?? 0 > COLLAPSED_HEIGHT;

    if (doesExceedCollapsedHeightLimit && !renderToggleButton) {
      setRenderToggleButton(true);
    }
    if (!doesExceedCollapsedHeightLimit && renderToggleButton) {
      setRenderToggleButton(false);
    }
  }, [setRenderToggleButton, renderToggleButton]);

  useEffect(() => {
    updateRenderToggleButton();
  }, [props.editor.value.document, updateRenderToggleButton]);

  return (
    <CollapsibleMotion
      minHeight={COLLAPSED_HEIGHT}
      isDefaultClosed={!props.defaultExpandMultilineText}
    >
      {({ isOpen, toggle, containerStyles, registerContentNode }) => {
        // opens the input if it regains focus and it's closed
        if (
          prevIsFocused !== props.editor.value.selection.isFocused &&
          props.editor.value.selection.isFocused &&
          !isOpen
        ) {
          toggle();
        }
        const refObj: TRichtTextEditorBodyRef = {
          containerRef: ref,
          registerContentNode,
        };
        return (
          <Constraints.Horizontal max={props.horizontalConstraint}>
            <Stack scale="xs" alignItems="flex-end">
              <EditorWrapper isDisabled={props.isDisabled}>
                <RichTextBody
                  ref={refObj as unknown as Ref<TRichtTextEditorBodyRef>}
                  hasError={props.hasError}
                  isDisabled={props.isDisabled}
                  hasWarning={props.hasWarning}
                  isReadOnly={Boolean(props.isReadOnly)}
                  showExpandIcon={Boolean(props.showExpandIcon)}
                  onClickExpand={props.onClickExpand}
                  editor={props.editor}
                  containerStyles={containerStyles}
                >
                  {props.children}
                </RichTextBody>
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
};

type TEditorOptionsProps = {
  options: {
    hasWarning?: TEditorProps['hasWarning'];
    hasError?: TEditorProps['hasError'];
    showExpandIcon: TEditorProps['showExpandIcon'];
    horizontalConstraint?: TEditorProps['horizontalConstraint'];
    defaultExpandMultilineText?: TEditorProps['defaultExpandMultilineText'];
    onClickExpand?: TEditorProps['onClickExpand'];
  };
};

type TRenderEditorProps = (
  props: TEditorProps & TEditorOptionsProps,
  editor: TSlateReactEditor,
  next: () => ReactElement
) => ReturnType<typeof Editor>;

const renderEditor: TRenderEditorProps = (props, editor, next) => {
  const internalId = `${props.id}__internal__id`;

  const children = cloneElement(next(), {
    id: internalId,
  });

  const isFocused = props.editor.value.selection.isFocused;

  const passedProps: Omit<TEditorProps, 'editor'> = {
    name: props.name,
    id: props.id,
    isReadOnly: Boolean(props.readOnly),
    isDisabled: Boolean(props.disabled),
    ...pick(props.options, [
      'horizontalConstraint',
      'defaultExpandMultilineText',
      'showExpandIcon',
      'onClickExpand',
      'hasError',
      'hasWarning',
    ]),
    ...filterDataAttributes(props),
  };

  return (
    <Editor editor={editor} {...passedProps}>
      {children}
      <HiddenInput
        isFocused={isFocused}
        handleFocus={editor.focus}
        id={props.id}
        disabled={props.disabled}
        readOnly={Boolean(props.readOnly)}
      />
    </Editor>
  );
};

Editor.displayName = 'Editor';

export default renderEditor;
