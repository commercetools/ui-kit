import { designTokens } from '@commercetools-uikit/design-system';

export type TFiltersProps = {
  /**
   * This is a stub prop
   */
  label?: string;
};

function Filters(props: TFiltersProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: designTokens.spacing40,
      }}
    >
      {props.label && <span>{props.label}</span>}
    </div>
  );
}
export default Filters;
