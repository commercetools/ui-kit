import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import { warning } from '@commercetools-uikit/utils';
import memoize from 'lodash/memoize';

const memoizedIsHotkey = memoize(isKeyHotkey);

const requiredOptions = [
  'typeName',
  'hotkey',
  'command',
  'query',
  'RenderMark',
];

const validate = (options) => {
  // eslint-disable-next-line consistent-return
  const missingRequiredOptions = requiredOptions.filter(
    (option) => !options[option]
  );
  return missingRequiredOptions;
};

const MarkPlugin = (options = {}) => {
  const missingRequiredOptions = validate(options);

  warning(
    missingRequiredOptions.length >= 0,
    `ui-kit/rich-text-input/Mark: missing required options: ${missingRequiredOptions.join(
      ','
    )}`
  );

  const isHotKey = memoizedIsHotkey(options.hotkey);

  return [
    {
      // eslint-disable-next-line consistent-return
      onKeyDown(event, editor, next) {
        if (!isHotKey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(options.typeName);
      },
      renderMark(props, editor, next) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case options.typeName:
            return (
              <options.RenderMark {...attributes}>
                {children}
              </options.RenderMark>
            );
          default:
            return next();
        }
      },
      commands: {
        [options.command]: (editor) => editor.toggleMark(options.typeName),
      },
      queries: {
        [options.query]: (editor) =>
          editor.value.activeMarks.some(
            (mark) => mark.type === options.typeName
          ),
      },
    },
  ];
};

export default MarkPlugin;
