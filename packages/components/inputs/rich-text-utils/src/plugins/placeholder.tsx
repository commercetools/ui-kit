// copied from https://github.com/ianstormtaylor/slate/tree/master/packages/slate-react-placeholder/src
// and modified to use editor's `options.placeholder` prop instead.
import { warning } from '@commercetools-uikit/utils';
import type { CSSProperties, ReactNode } from 'react';
import type { TEditor, TNode } from '../editor.types';

type TEditorQueryPredicate = string | (() => void);

type TDecorationNode = {
  key: string;
  offset: number;
  path: string;
};

type TDecoration = {
  type: string;
  data: {
    key: number;
    get?: (name: string) => number;
  };
  anchor: TDecorationNode;
  focus: TDecorationNode;
};

type TRenderDecorationProps = {
  children: ReactNode;
  decoration: TDecoration;
};

type TSlateReactPlaceholderOptions = {
  when: TEditorQueryPredicate;
  style: CSSProperties;
};

/*
 * Instance counter to enable unique marks for multiple Placeholder instances.
 */

let instanceCounter = 0;

/**
 * A plugin that renders a React placeholder for a given Slate node.
 *
 * @param {Object} options
 * @return {Object}
 */

function SlateReactPlaceholder(options: TSlateReactPlaceholderOptions) {
  const instanceId = instanceCounter++;

  warning(
    typeof options.when === 'string' || typeof options.when === 'function',
    'You must pass `SlateReactPlaceholder` an `options.when` query.'
  );

  /**
   * Decorate a match node with a placeholder mark when it fits the query.
   *
   * @param {Node} node
   * @param {Editor} editor
   * @param {Function} next
   * @return {Array}
   */

  function decorateNode(
    node: TNode,
    editor: TEditor,
    next: () => JSX.Element[]
  ) {
    if (!editor.query?.(options.when, node)) {
      return next();
    }

    const others = next();

    const [first] = node.texts();
    const [last] = node.texts({ direction: 'backward' });
    const [firstNode, firstPath] = first;
    const [lastNode, lastPath] = last;

    const decoration: TDecoration = {
      type: 'placeholder',
      data: { key: instanceId },
      anchor: { key: firstNode.key, offset: 0, path: firstPath },
      focus: {
        key: lastNode.key,
        offset: lastNode.text.length,
        path: lastPath,
      },
    };

    return [...others, decoration];
  }

  /**
   * Render an inline placeholder for the placeholder mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  function renderDecoration(
    props: TRenderDecorationProps,
    editor: Pick<TEditor, 'props'>,
    next: () => JSX.Element
  ) {
    const { children, decoration: deco } = props;

    if (deco.type === 'placeholder' && deco.data.get?.('key') === instanceId) {
      const placeHolderStyle = {
        pointerEvents: 'none',
        display: 'inline-block',
        position: 'absolute',
        width: '0',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        opacity: '0.333',
        verticalAlign: 'text-top',
        ...options.style,
      };

      return (
        <span>
          <span
            contentEditable={false}
            style={placeHolderStyle as CSSProperties}
          >
            {editor.props.options.placeholder}
          </span>
          {children}
        </span>
      );
    }

    return next();
  }

  /**
   * Return the plugin.
   *
   * @return {Object}
   */

  return { decorateNode, renderDecoration };
}

/**
 * Export.
 *
 * @type {Function}
 */

export default SlateReactPlaceholder;
