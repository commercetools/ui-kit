export const FontWeightDemo = ({ value }: { value: string }) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'no-wrap',
        textOverflow: 'ellipsis',
      }}
    >
      <div style={{ fontWeight: value }}>
        The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  );
};
