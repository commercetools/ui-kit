import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const HOT_KEY = 'mod+u';
const TYPE_NAME = 'underlined';

const ItalicPlugin = (options = {}) => {
  const typeName = options.typeName || TYPE_NAME;
  const hotkey = options.hotkey || HOT_KEY;

  const isUnderlinedHotkey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isUnderlinedHotkey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(typeName);
      },
      renderMark(props, editor, next) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case typeName:
            return <u {...attributes}>{children}</u>;
          default:
            return next();
        }
      },
      commands: {
        toggleUnderlinedMark: editor => editor.toggleMark(typeName),
      },
      queries: {
        hasUnderlinedMark: editor =>
          editor.value.activeMarks.some(mark => mark.type === typeName),
      },
    },
  ];
};

export default ItalicPlugin;
