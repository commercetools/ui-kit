import React from 'react';

const RenderBlockPlugin = () => {
  return {
    renderBlock(props, editor, next) {
      const { attributes, children, node } = props;
      switch (node.type) {
        case 'align-center':
          return (
            <div {...attributes} style={{ textAlign: 'center' }}>
              {children}
            </div>
          );
        case 'align-left':
          return (
            <div {...attributes} style={{ textAlign: 'left' }}>
              {children}
            </div>
          );
        case 'align-right':
          return (
            <div {...attributes} style={{ textAlign: 'right' }}>
              {children}
            </div>
          );

        default:
          return next();
      }
    },
  };
};

export default RenderBlockPlugin;
