import { designTokens } from '@commercetools-uikit/design-system';
import { Chip } from './filter-menu/chip';

export type TFiltersProps = {
  /**
   * This is a stub prop
   */
  label?: string;
};

function Filters(props: TFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: designTokens.spacing20 }}>
      <div>{props.label}</div>
      <ul style={{ display: 'flex', gap: designTokens.spacing20 }}>
        <Chip label="active" />
        <Chip label="disabled" isDisabled />
      </ul>
    </div>
  );
}
export default Filters;
