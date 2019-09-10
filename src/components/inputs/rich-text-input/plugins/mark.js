import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import invariant from 'tiny-invariant';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const requiredOptions = [
  'typeName',
  'hotkey',
  'command',
  'query',
  'RenderMark',
];

const validate = options => {
  // eslint-disable-next-line consistent-return
  const missingRequiredOptions = requiredOptions.filter(
    option => !options[option]
  );
  return missingRequiredOptions;
};

const MarkPlugin = (options = {}) => {
  const missingRequiredOptions = validate(options);

  if (missingRequiredOptions.length > 0) {
    invariant(
      false,
      `ui-kit/rich-text-input/Mark: missing required options: ${missingRequiredOptions.join(
        ','
      )}`
    );
  }

  const { typeName, hotkey, command, query, RenderMark } = options;

  const isHotKey = memoizedIsHotkey(hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isHotKey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(typeName);
      },
      renderMark(props, editor, next) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case typeName:
            return <RenderMark {...attributes}>{children}</RenderMark>;
          default:
            return next();
        }
      },
      commands: {
        [command]: editor => {
          if (!editor.value.selection.isFocused) {
            editor.focus();
          }
          return editor.toggleMark(typeName);
        },
      },
      queries: {
        [query]: editor =>
          editor.value.activeMarks.some(mark => mark.type === typeName),
      },
    },
  ];
};

export default MarkPlugin;
