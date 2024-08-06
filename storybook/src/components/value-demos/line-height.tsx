export const LineHeightDemo = ({ value }: { value: string }) => {
  return (
    <div>
      <div style={{ lineHeight: value, maxWidth: '40ch' }}>
        The quick brown fox jumps over the lazy dog. Franz jagt im komplett
        verwahrlosten Taxi quer durch Bayern. Extraño pan de col y kiwi se quemó
        bajo fugaz vaho.
      </div>
    </div>
  );
};
