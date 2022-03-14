import { isKeyHotkey } from 'is-hotkey';
import { warning } from '@commercetools-uikit/utils';
import memoize from 'lodash/memoize';
import type { ComponentType, ReactNode } from 'react';
import type { TEditor, TMark } from '../editor.types';

type TMarkPluginOptions = {
  hotkey: string;
  typeName: string;
  RenderMark: ComponentType;
  command: string;
  query: string;
  [option: string]: string | ReactNode;
};

type TRenderMarkProps = {
  children: ReactNode;
  mark: TMark;
  attributes: unknown;
};

const memoizedIsHotkey = memoize(isKeyHotkey);

const requiredOptions = [
  'typeName',
  'hotkey',
  'command',
  'query',
  'RenderMark',
];

const validate = (options?: TMarkPluginOptions) => {
  const missingRequiredOptions = requiredOptions.filter(
    (option) => !options?.[option]
  );
  return missingRequiredOptions;
};

const MarkPlugin = (options: TMarkPluginOptions) => {
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
      onKeyDown(event: KeyboardEvent, editor: TEditor, next: () => void): void {
        if (!isHotKey(event)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark?.(options.typeName);
      },
      renderMark(
        props: TRenderMarkProps,
        _editor: TEditor,
        next: () => JSX.Element
      ) {
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
        [options.command]: (editor: TEditor) =>
          editor.toggleMark?.(options.typeName),
      },
      queries: {
        [options.query]: (editor: TEditor) =>
          editor.value.activeMarks.some(
            (mark: TMark) => mark.type === options.typeName
          ),
      },
    },
  ];
};

export default MarkPlugin;
