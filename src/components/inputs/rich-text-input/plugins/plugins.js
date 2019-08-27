import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const RenderBlockPlugin = () => {
  return {
    renderBlock(props, editor, next) {
      const { attributes, children, node } = props;
      switch (node.type) {
        case 'code':
          return (
            <pre>
              <code {...attributes}>{children}</code>
            </pre>
          );
        case 'paragraph':
          return <p {...attributes}>{children}</p>;
        case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
          return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
          return <h2 {...attributes}>{children}</h2>;
        case 'heading-three':
          return <h3 {...attributes}>{children}</h3>;
        case 'heading-four':
          return <h4 {...attributes}>{children}</h4>;
        case 'heading-five':
          return <h5 {...attributes}>{children}</h5>;
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
        case 'superscript':
          return <sup {...attributes}>{children}</sup>;
        case 'subscript':
          return <sub {...attributes}>{children}</sub>;
        case 'strikethrough':
          return <del {...attributes}>{children}</del>;
        default:
          return next();
      }
    },
  };
};
