import type { Meta, StoryFn } from '@storybook/react';
import Filters from './filters';
import FilterMenu from './filter-menu';
import { ReactNode, useState } from 'react';
import SelectInput from '@commercetools-uikit/select-input';

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  // tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof Filters>;

export const BasicExample: Story = () => {
  const [headerSelectOptions, setHeaderSelectOptions] = useState<string>();
  const renderOperatorsInput = (): ReactNode => {
    const operatorOptions = [
      { value: 'is', label: 'is' },
      { value: 'is not', label: 'is NOT' },
      {
        value: 'is not quite a short option',
        label: 'is NOT quite a short option',
      },
    ];

    return (
      <SelectInput
        appearance="quiet"
        isCondensed={true}
        isSearchable={false}
        value={
          // Default to the first option if no value is passed
          headerSelectOptions ? headerSelectOptions : operatorOptions[0].value
        }
        options={operatorOptions}
        onChange={(event) => {
          setHeaderSelectOptions(event.target.value as string);
        }}
      />
    );
  };

  // return <Filters label={'test'} />;
  return (
    <FilterMenu
      label={'Size'}
      filterKey="filterKey"
      renderMenuBody={() => <>Hello!</>}
      appliedFilterValues={[{ label: 'hello', value: 'hello' }]}
      renderOperatorsInput={renderOperatorsInput}
      onSortRequest={() => {}}
    />
  );
};
