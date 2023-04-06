import Card from '@commercetools-uikit/card';

const NeighbouringStackingContext = () => {
  return (
    <div
      style={{
        width: '300px',
        height: '50px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Card theme="dark">
        Stacking context with <code>z-index: 2</code>
      </Card>
    </div>
  );
};

export default NeighbouringStackingContext;
