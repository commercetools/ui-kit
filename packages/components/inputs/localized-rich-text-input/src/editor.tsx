import {
  useRef,
  useState,
  useCallback,
  useEffect,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type LegacyRef,
  type RefObject,
  type Ref,
} from 'react';
import pick from 'lodash/pick';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import { customProperties } from '@commercetools-uikit/design-system';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import { usePrevious } from '@commercetools-uikit/hooks';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import Stack from '@commercetools-uikit/spacings-stack';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import FlatButton from '@commercetools-uikit/flat-button';
import { messagesMultilineInput } from '@commercetools-uikit/input-utils';
import {
  RichTextBody,
  HiddenInput,
  TEditor,
} from '@commercetools-uikit/rich-text-utils';
import {
  EditorWrapper,
  EditorLanguageLabel,
  ToggleButtonWrapper,
} from './editor.styles';

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
  children: ReactNode;
  id?: string;
  isOpen: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasWarning?: boolean;
  hasError?: boolean;
  editor?: TEditor;
  error?: ReactNode;
  warning?: ReactNode;
  defaultExpandMultilineText: boolean;
  toggleLanguage: (language: string) => void;
  language: string;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  hasLanguagesControl?: boolean;
};

type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

type TRichTextEditorBodyRef = {
  registerContentNode: TNodeRefObject;
  containerRef: RefObject<HTMLDivElement>;
};

const Editor = (props: TEditorProps) => {
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>();
  const prevIsFocused = usePrevious(props.editor?.value.selection.isFocused);

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
  }, [props.editor?.value.document, updateRenderToggleButton]);

  // opens the input if it regains focus and it's closed
  if (
    prevIsFocused !== props.editor?.value.selection.isFocused &&
    props.editor?.value.selection.isFocused &&
    !props.isOpen
  ) {
    onToggle();
  }

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
    props.warning;

  const theme = useTheme();

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
              <EditorLanguageLabel htmlFor={props.id} theme={theme}>
                {/* FIXME: add proper tone for disabled when tones are refactored */}
                <Text.Detail tone="secondary">
                  {props.language.toUpperCase()}
                </Text.Detail>
              </EditorLanguageLabel>

              <RichTextBody
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
                editor={props.editor as TEditor}
                containerStyles={containerStyles}
                showExpandIcon={props.showExpandIcon}
                onClickExpand={props.onClickExpand}
              >
                {props.children}
              </RichTextBody>
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
                      <div>{props.error}</div>
                    </LeftColumn>
                  );
                if (props.warning)
                  return (
                    <LeftColumn>
                      <div>{props.warning}</div>
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
                          margin-top: ${customProperties.spacingXs};
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
          </Stack>
        );
      }}
    </CollapsibleMotion>
  );
};

type TOptions = {
  language: string;
  error?: ReactNode;
  warning?: ReactNode;
  hasWarning?: boolean;
  hasError?: boolean;
  defaultExpandMultilineText: boolean;
  toggleLanguage: (language: string) => void;
  isOpen: boolean;
  showExpandIcon: boolean;
  onClickExpand?: () => boolean;
  hasLanguagesControl?: boolean;
};

type TRenderEditorProps = {
  id?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  editor?: TEditor;
  options: TOptions;
};

const renderEditor = (
  props: TRenderEditorProps,
  editor: TEditor,
  next: () => ReactElement
) => {
  if (props.options.showExpandIcon) {
    warning(
      typeof props.options.onClickExpand === 'function',
      'renderEditor: "onClickExpand" is required when showExpandIcon is true'
    );
  }

  const internalId = `${props.id}__internal__id`;

  const children = cloneElement(next(), {
    id: internalId,
  });

  const passedProps = {
    id: props.id,
    isDisabled: props.disabled,
    isReadOnly: props.readOnly,
    ...pick(props.options, [
      'defaultExpandMultilineText',
      'language',
      'warning',
      'error',
      'hasWarning',
      'hasError',
      'toggleLanguage',
      'isOpen',
      'showExpandIcon',
      'onClickExpand',
      'hasLanguagesControl',
    ]),
    ...filterDataAttributes(props),
  };

  const isFocused = props.editor?.value.selection.isFocused;

  return (
    <Editor editor={editor} {...passedProps}>
      {children}
      <HiddenInput
        isFocused={Boolean(isFocused)}
        handleFocus={editor.focus}
        disabled={props.disabled}
        readOnly={props.readOnly}
        id={props.id}
      />
    </Editor>
  );
};

Editor.displayName = 'Editor';

export default renderEditor;
