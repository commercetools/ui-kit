declare module 'slate-react' {
  import type { TEditor } from '@commercetools-uikit/rich-text-utils/src/editor.types';
  import { Component } from 'react';

  type TValue = TEditor['value'];
  type TWrapBlock = ReturnType<TEditor['unwrapBlock']>;
  type TNode = Parameters<NonNullable<TEditor['query']>>[1];
  type TEditorProps = {
    autoFocus: unknown;
    id: unknown;
    name: unknown;
    onFocus: unknown;
    onBlur: unknown;
    disabled: unknown;
    readOnly: unknown;
    value: unknown;
    options: unknown;
    onChange: unknown;
    plugins: unknown;
    renderEditor: unknown;
  };

  export class Editor extends Component<TEditorProps> implements TEditor {
    focus: () => void;
    value: TValue;
    setBlocks: (blockTag: string) => {
      unwrapBlock: (blockTag: string) => {
        unwrapBlock: (blockTag: string) => void;
      };
      wrapBlock: (blockTag: string) => void;
    };
    unwrapBlock: (blockTag: string) => TWrapBlock;
    hasPlaceholder?: boolean;
    query?: (
      when: string | (() => void),
      node: TNode
    ) => {
      next: () => void;
    };
    props: {
      options: {
        placeholder: string;
      };
    } & TEditorProps;
    undo?: () => void;
    redo?: () => void;
    toggleRedo?: () => void;
    selection: {
      isFocused: boolean;
    };
    hasUndos: () => boolean;
    hasRedos: () => boolean;
    toggleMark?: (value: unknown) => void;
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
  }

  export type { TEditor };
}
