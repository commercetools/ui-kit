import { type ReactElement } from 'react';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { CaretDownIcon } from '../../../icons';
import { Badge } from './badge';
import { Chip } from './chip';
import { Footer } from './footer';
import { Header } from './header';

export type TAppliedFilterValue = {
  key?: string;
  label: string;
};

export type TFilterMenuProps = {
  key: string;
  label: string;
  filter: ReactElement; // it's this or get into passing different input types - which is restrictive and much higher maintenance
  operatorsInput?: ReactElement; // could also pass array of values and handler function
  appliedFilterValues:
    | TAppliedFilterValue
    | TAppliedFilterValue[]
    | undefined
    | null;
  onRemoveFilter?: Function;
  onApplyFilter?: Function;
  onClearFilter?: Function;
  onFilterOptionsSortClick?: Function;
};
function FilterMenu(props: TFilterMenuProps) {
  return (
    // dropdown menu needs way to programatically clo
    <DropdownMenu
      triggerElement={
        /**should this be its own component like chip/badge/etc? */
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'solid 1px rebeccapurple',
            padding: '8px',
            color: 'rebeccapurple',
            backgroundColor: 'papayawhip',
          }}
        >
          {props.label}
          {props.appliedFilterValues &&
            (Array.isArray(props.appliedFilterValues) ? (
              props.appliedFilterValues.map((value) => (
                <Chip key={value.key} label={value.label} />
              ))
            ) : (
              <Chip label={props.appliedFilterValues.label} />
            ))}
          {props.appliedFilterValues &&
            Array.isArray(props.appliedFilterValues) && (
              <Badge label={`+${props.appliedFilterValues.length}`} />
            )}
          {props.onRemoveFilter && (
            <button
              style={{ margin: '0 4px' }}
              onClick={(e) => {
                e.stopPropagation();
                props.onRemoveFilter!();
              }}
            >
              x
            </button>
          )}
          <CaretDownIcon size="small" color="info" />
        </button>
      }
      menuHorizontalConstraint={7}
      menuMaxHeight={1000}
    >
      <Header label={props.label} operatorsInput={props.operatorsInput} />
      {props.filter}
      <Footer
        onApplyFilter={props.onApplyFilter}
        onClearFilter={props.onClearFilter}
      />
    </DropdownMenu>
  );
}

export default FilterMenu;
