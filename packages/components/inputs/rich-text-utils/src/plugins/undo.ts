import type { KeyboardEvent } from 'react';
import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';
import type { TEditor, THotKeyOptions } from '../editor.types';

type TExtendedEditor = TEditor & {
  undo: () => void;
};

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+z';

const hasUndos = (editor: TExtendedEditor) => {
  const { value } = editor;
  const { data } = value;
  const undos = data.get('undos');
  return undos && undos.size > 1;
};

const UndoPlugin = (options: Partial<THotKeyOptions> = {}) => {
  const hotkey = options.hotkey || HOT_KEY;
  const isUndoHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      onKeyDown(
        event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
        editor: TExtendedEditor,
        next: () => void
      ) {
        if (!isUndoHotkey(event) || !hasUndos(editor)) {
          return next();
        }

        event.preventDefault();
        editor.undo();
      },
      queries: {
        hasUndos: (editor: TExtendedEditor) => hasUndos(editor),
      },
      commands: {
        toggleUndo: (editor: TExtendedEditor) => {
          if (hasUndos(editor)) {
            editor.undo();
          }
        },
      },
    },
  ];
};

export default UndoPlugin;
