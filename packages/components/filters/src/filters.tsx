import { designTokens } from '@commercetools-uikit/design-system';
import FilterMenu from './filter-menu';

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

      <FilterMenu
        filterKey="test"
        label="Testing"
        renderMenuBody={() => <div>im the body</div>}
        appliedFilterValues={[
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          {
            value: 'long-label',
            label: 'just a realllllly reallllllllllllllyyyyyyy long label',
          },
          {
            value: 'another-one',
            label: 'another reallllyu reerealllllay longggg label',
          },
          { value: 'yet-another', label: 'hi' },
          { value: 'one1', label: 'one' },
          { value: 'two1', label: 'two' },
          {
            value: 'long-label1',
            label: 'just a realllllly reallllllllllllllyyyyyyy long label',
          },
        ]}
        onRemoveRequest={() => {}}
      />
    </div>
  );
}
export default Filters;
