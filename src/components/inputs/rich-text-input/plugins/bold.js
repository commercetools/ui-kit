import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+b';
const TYPE_NAME = 'bold';

const BoldPlugin = (options = {}) => {
  const typeName = options.typeName || TYPE_NAME;
  const hotkey = options.hotkey || HOT_KEY;
  const isBoldHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isBoldHotkey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(typeName);
      },
      renderMark(props, editor, next) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case typeName:
            return <strong {...attributes}>{children}</strong>;
          default:
            return next();
        }
      },
      commands: {
        toggleBoldMark: editor => editor.toggleMark(typeName),
      },
      queries: {
        hasBoldMark: editor =>
          editor.value.activeMarks.some(mark => mark.type === typeName),
      },
    },
  ];
};

export default BoldPlugin;
