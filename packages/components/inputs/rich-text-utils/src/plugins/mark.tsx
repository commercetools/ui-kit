import { isKeyHotkey } from 'is-hotkey';
import { warning } from '@commercetools-uikit/utils';
import memoize from 'lodash/memoize';
import { ReactNode } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

type TOptions = {
  hotkey: string;
  typeName: string;
  RenderMark: ReactNode;
  command: string;
  query: string;
  [option: string]: string | ReactNode;
};

type TMark = {
  type: string;
};

type TValue = {
  activeMarks: {
    some: (ascertMarkType: (mark: TMark) => boolean) => void;
  };
};

type TEditor = {
  toggleMark: (s: unknown) => void;
  value: TValue;
};

type TProps = {
  children: ReactNode;
  mark: TMark;
  attributes: unknown;
};

type TEvent = { preventDefault: () => void };

const memoizedIsHotkey = memoize(isKeyHotkey);

const requiredOptions = [
  'typeName',
  'hotkey',
  'command',
  'query',
  'RenderMark',
];

const validate = (options: TOptions) => {
  // eslint-disable-next-line consistent-return
  const missingRequiredOptions = requiredOptions.filter(
    (option) => !options[option]
  );
  return missingRequiredOptions;
};

const MarkPlugin = (options = {} as TOptions) => {
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
      onKeyDown(
        event: TEvent,
        editor: { toggleMark: (arg0: unknown) => void },
        next: () => void
      ): void {
        if (!isHotKey(event as KeyboardEvent)) {
          return next();
        }

        event.preventDefault();
        editor.toggleMark(options.typeName);
      },
      //@ts-ignore
      renderMark(props: TProps, editor: TEditor, next: () => ReactJSXElement) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
          case options.typeName:
            return (
              //@ts-ignore
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
          editor.toggleMark(options.typeName),
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
