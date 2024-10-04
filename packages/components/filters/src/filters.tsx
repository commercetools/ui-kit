import { Badge } from './badge';

export type TFiltersProps = {
  /**
   * This is a stub prop
   */
  label?: string;
};

function Filters(props: TFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      active:
      <Badge label="+2" id={`${props.label}-total-applied-filters`} />
      disabled:
      <Badge label="+2" id={`${props.label}-applied-filter-count`} isDisabled />
    </div>
  );
}
export default Filters;
