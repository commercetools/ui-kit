import type { KeyboardEvent } from 'react';
import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';
import type { TEditor, THotKeyOptions } from '../editor.types';

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+y';

const hasRedos = (editor: TEditor) => {
  const { value } = editor;
  const { data } = value;
  const redos = data.get('redos');
  return redos && redos.size > 0;
};

const RedoPlugin = (options: Partial<THotKeyOptions> = {}) => {
  const hotkey = options.hotkey || HOT_KEY;
  const isRedoHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      onKeyDown(
        event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
        editor: TEditor,
        next: () => void
      ) {
        if (!isRedoHotkey(event) || !hasRedos(editor)) {
          return next();
        }

        event.preventDefault();
        editor.toggleRedo?.();
      },
      queries: {
        hasRedos: (editor: TEditor) => hasRedos(editor),
      },
      commands: {
        toggleRedo: (editor: TEditor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          if (hasRedos(editor)) {
            editor.redo?.();
          }
        },
      },
    },
  ];
};

export default RedoPlugin;
