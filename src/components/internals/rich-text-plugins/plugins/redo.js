import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+y';

const hasRedos = (editor) => {
  const { value } = editor;
  const { data } = value;
  const redos = data.get('redos');
  return redos && redos.size > 0;
};

const RedoPlugin = (options = {}) => {
  const hotkey = options.hotkey || HOT_KEY;
  const isRedoHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isRedoHotkey(event) || !hasRedos(editor)) {
          return next();
        }

        event.preventDefault();
        editor.toggleRedo();
      },
      queries: {
        hasRedos: (editor) => hasRedos(editor),
      },
      commands: {
        toggleRedo: (editor) => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          if (hasRedos(editor)) {
            editor.redo();
          }
        },
      },
    },
  ];
};

export default RedoPlugin;
