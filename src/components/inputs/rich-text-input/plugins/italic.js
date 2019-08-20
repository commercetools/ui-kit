import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';

const HOT_KEY = 'mod+i';
const TYPE_NAME = 'italic';

const memoizedIsHotkey = memoize(isKeyHotkey);

const ItalicPlugin = (options = {}) => {
  const typeName = options.typeName || TYPE_NAME;
  const hotkey = options.hotkey || HOT_KEY;
  const isItalicHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isItalicHotkey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(typeName);
      },
      renderMark(props, editor, next) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case typeName:
            return <em {...attributes}>{children}</em>;
          default:
            return next();
        }
      },
      commands: {
        toggleItalicMark: editor => editor.toggleMark(typeName),
      },
      queries: {
        hasItalicMark: editor =>
          editor.value.activeMarks.some(mark => mark.type === typeName),
      },
    },
  ];
};

export default ItalicPlugin;
