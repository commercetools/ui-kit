import type { ReactNode } from 'react';

type TSize = {
  size: number;
};

type TData = {
  get: (key: string) => TSize;
};

type TValue = {
  blocks: TBlocks;
  document: TDocument;
  selection: {
    isFocused: boolean;
  };
  activeMarks:
    | {
        some: (ascertMarkType: (mark: TMark) => boolean) => void;
      }
    | TMark[];
  data: TData;
};

type TWrapBlock = {
  wrapBlock: (blockTag: string) => void;
};
type TBlocks = {
  size?: number;
  some: (block: unknown) => boolean | void;
  first: () => {
    key: string;
    type: string;
  };
  map: (node: ReactNode) => {
    toArray: () => string[];
  };
};

type TNodes = {
  map: (node: ReactNode) => {
    toArray: () => string[];
  };
};

type TDocument = {
  getClosest: (
    block: { key: unknown },
    closest: (parent: { type: string }) => boolean
  ) => boolean;
  getParent?: (parentParam: string) => {
    type: string;
  };
  text?: string;
  nodes?: TNodes;
};

type TNodeTextsResult = [{ key: string; text: string }, string];

export type TMark = {
  type: string;
};

export type TNode = {
  texts: (nodeParam?: Record<string, string>) => TNodeTextsResult[];
};

export type THotKeyptions = {
  hotkey: string;
};

export type TEditor = {
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
  };
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
};
