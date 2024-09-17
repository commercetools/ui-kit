import { type ReactElement } from 'react';
export type TFilterMenuChipProps = {
  label: string | ReactElement | undefined;
};
function Chip(props: TFilterMenuChipProps) {
  if (!props.label) return null;
  return (
    <div
      style={{
        backgroundColor: 'chartreuse',
        color: 'deeppink',
        padding: '4px',
        margin: '0 2px',
      }}
    >
      {props.label}
    </div>
  );
}

export default Chip;
