import { BLOCK_TAGS, MARK_TAGS } from '../tags';

// eslint-disable-next-line import/prefer-default-export
export const RenderBlockPlugin = () => {
  return {
    renderBlock(props, editor, next) {
      const { attributes, children, node } = props;
      switch (node.type) {
        case BLOCK_TAGS.pre:
          return (
            <pre>
              <code {...attributes}>{children}</code>
            </pre>
          );
        case BLOCK_TAGS.blockquote:
          return <blockquote {...attributes}>{children}</blockquote>;
        case BLOCK_TAGS.h1:
          return <h1 {...attributes}>{children}</h1>;
        case BLOCK_TAGS.h2:
          return <h2 {...attributes}>{children}</h2>;
        case BLOCK_TAGS.h3:
          return <h3 {...attributes}>{children}</h3>;
        case BLOCK_TAGS.h4:
          return <h4 {...attributes}>{children}</h4>;
        case BLOCK_TAGS.h5:
          return <h5 {...attributes}>{children}</h5>;
        case BLOCK_TAGS.li:
          return <li {...attributes}>{children}</li>;
        case BLOCK_TAGS.ol:
          return <ol {...attributes}>{children}</ol>;
        case BLOCK_TAGS.ul:
          return <ul {...attributes}>{children}</ul>;
        case BLOCK_TAGS.p:
          return <p {...attributes}>{children}</p>;
        default:
          return next();
      }
    },
  };
};

export const RenderMarkPlugin = () => {
  return {
    renderMark(props, editor, next) {
      const { children, mark, attributes } = props;

      switch (mark.type) {
        case MARK_TAGS.sup:
          return <sup {...attributes}>{children}</sup>;
        case MARK_TAGS.sub:
          return <sub {...attributes}>{children}</sub>;
        case MARK_TAGS.del:
          return <del {...attributes}>{children}</del>;
        default:
          return next();
      }
    },
  };
};
