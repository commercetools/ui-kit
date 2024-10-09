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
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing20,
        }}
      >
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => <div>im the body</div>}
          appliedFilterValues={undefined}
          onRemoveRequest={() => {}}
          defaultOpen={true}
        />
        <ul>
          <li>no applied values</li>
          <li>open on mount</li>
        </ul>
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing20,
        }}
      >
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => <div>im the body</div>}
          appliedFilterValues={[{ label: 'hello', value: 'hello' }]}
          onRemoveRequest={() => {}}
        />
        <ul>
          <li>applied values</li>
        </ul>
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing20,
        }}
      >
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => <div>im the body</div>}
          appliedFilterValues={undefined}
          onRemoveRequest={() => {}}
          isPersistent
        />
        <ul>
          <li>no applied values</li>
          <li>persistent</li>
        </ul>
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing20,
        }}
      >
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => <div>im the body</div>}
          appliedFilterValues={[{ label: 'hello', value: 'hello' }]}
          onRemoveRequest={() => {}}
          isPersistent
        />
        <ul>
          <li>applied values</li>
          <li>persistent</li>
        </ul>
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: designTokens.spacing20,
        }}
      >
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => <div>im the body</div>}
          appliedFilterValues={[{ label: 'hello', value: 'hello' }]}
          onRemoveRequest={() => {}}
          isDisabled
        />
        <ul>
          <li>disabled</li>
        </ul>
      </span>
    </div>
  );
}
export default Filters;
