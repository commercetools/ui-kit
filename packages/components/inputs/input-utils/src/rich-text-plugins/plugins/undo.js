import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+z';

const hasUndos = (editor) => {
  const { value } = editor;
  const { data } = value;
  const undos = data.get('undos');
  return undos && undos.size > 1;
};

const UndoPlugin = (options = {}) => {
  const hotkey = options.hotkey || HOT_KEY;
  const isUndoHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isUndoHotkey(event) || !hasUndos(editor)) {
          return next();
        }

        event.preventDefault();
        editor.undo();
      },
      queries: {
        hasUndos: (editor) => hasUndos(editor),
      },
      commands: {
        toggleUndo: (editor) => {
          if (hasUndos(editor)) {
            editor.undo();
          }
        },
      },
    },
  ];
};

export default UndoPlugin;
