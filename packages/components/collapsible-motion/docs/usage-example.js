import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';

const Example = () => (
  <CollapsibleMotion>
    {({ isOpen, toggle, containerStyles, registerContentNode }) => (
      <div>
        <button data-testid="button" onClick={toggle}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <div data-testid="container-node" style={containerStyles}>
          <div data-testid="content-node" ref={registerContentNode}>
            Content
          </div>
        </div>
      </div>
    )}
  </CollapsibleMotion>
);

export default Example;
