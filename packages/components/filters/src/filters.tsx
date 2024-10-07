import { designTokens } from '@commercetools-uikit/design-system';

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
      <div style={{ display: 'flex', gap: designTokens.spacing20 }}></div>
    </div>
  );
}
export default Filters;
