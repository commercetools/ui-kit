import { Suite, Spec } from '../../../../test/percy';
import { FiltersWithState } from './fixtures/filters-with-state';

export const routePath = '/filters';

const selectedPrimaryColors = [
  'Test label that is very very long for testing',
  'green',
  'yellow',
  'orange',
  'red',
];

const selectedSecondaryColors = ['purple', 'forest'];

export const component = () => (
  <Suite>
    <Spec label="Filters - closed with 0 filters selected">
      <FiltersWithState />
    </Spec>
    <Spec label="opened with 0 filters selected">
      <FiltersWithState defaultOpen={true} />
    </Spec>
    <Spec label="closed with 1 filter selected">
      <FiltersWithState selectedSecondaryColors={selectedSecondaryColors} />
    </Spec>
    <Spec label="opened with 1 filters selected">
      <FiltersWithState
        defaultOpen={true}
        selectedPrimaryColors={selectedPrimaryColors}
      />
    </Spec>
    <Spec label="closed with 2 filters selected">
      <FiltersWithState
        selectedPrimaryColors={selectedPrimaryColors}
        selectedSecondaryColors={selectedSecondaryColors}
      />
    </Spec>
    <Spec label="opened with 2 filters selected">
      <FiltersWithState
        defaultOpen={true}
        selectedPrimaryColors={selectedPrimaryColors}
        selectedSecondaryColors={selectedSecondaryColors}
      />
    </Spec>
    <Spec label="opened with 1 persistent filter and 0 filters selected">
      <FiltersWithState defaultOpen={true} isPersistent={true} />
    </Spec>
    <Spec label="opened with 1 persistent filter and 1 filter selected">
      <FiltersWithState
        defaultOpen={true}
        isPersistent={true}
        selectedSecondaryColors={selectedSecondaryColors}
      />
    </Spec>
    <Spec label="opened with 1 disabled filter with selected values">
      <FiltersWithState
        defaultOpen={true}
        isDisabled={true}
        selectedPrimaryColors={selectedPrimaryColors}
      />
    </Spec>
  </Suite>
);
