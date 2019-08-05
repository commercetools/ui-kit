import React from 'react';

const BlockButton = props => {
  let isActive = this.hasBlock(props.type);

  if (['numbered-list', 'bulleted-list'].includes(props.type)) {
    const {
      value: { document, blocks },
    } = props;

    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key);
      isActive =
        this.hasBlock('list-item') && parent && parent.type === props.type;
    }
  }

  return (
    <Button
      active={isActive}
      label={type}
      onClick={() => this.onClickBlock(type)}
      icon={icon}
    ></Button>
  );
};

BlockButton.displayName = 'BlockButton';

export default BlockButton;
