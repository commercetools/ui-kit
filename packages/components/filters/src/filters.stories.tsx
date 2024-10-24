import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Filters, { type TFiltersProps } from './filters';
import {
  SearchInputComponent,
  FruitsRadioInput,
  ColorNameTextInput,
  SecondaryColorsInput,
  PrimaryColorsInput,
  OperatorsInput,
} from './fixtures/inputs';
import {
  FILTER_GROUP_KEYS,
  FILTER_GROUPS,
  FRUIT_OPTIONS,
  OPERATOR_OPTIONS,
} from './fixtures/constants';

//TODO: what kind of controls make sense here??
const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  argTypes: {},
  // https://github.com/storybookjs/storybook/issues/17025#issuecomment-1703974689
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;

type Story = StoryFn<typeof Filters>;
//TODO: better docs on different states and how to accomplish them
//TODO: operators inputs, apply buttons, etc
export const BasicExample: Story = (_props: TFiltersProps) => {
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>([]);
  const [colorNameValue, setColorName] = useState<string>('');
  const [fruitsValue, setFruitsValue] = useState<string>('');
  const [primaryColorOperator, setPrimaryColorOperatorValue] = useState<string>(
    OPERATOR_OPTIONS[0].value
  );

  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);
  const clearColorNameFilter = () => setColorName('');
  const clearFruitsFilter = () => setFruitsValue('');

  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearSecondaryColorFilter();
    clearColorNameFilter();
    clearFruitsFilter();
  };

  const appliedFilters = [];

  if (primaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'primaryColors',
      values: primaryColorValue.map((value) => ({
        value: value,
        label: (
          <div>
            <span
              css={{
                fontStyle: 'italic',
                marginRight: '4px',
                fontWeight: '600',
              }}
            >
              {primaryColorOperator}
            </span>
            {value}
          </div>
        ),
      })),
    });
  }

  if (secondaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'secondaryColors',
      values: secondaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  if (colorNameValue) {
    appliedFilters.push({
      filterKey: 'colorName',
      values: [
        {
          value: colorNameValue,
          label: colorNameValue,
        },
      ],
    });
  }
  if (fruitsValue) {
    const option = FRUIT_OPTIONS.find((option) => option.value === fruitsValue);
    appliedFilters.push({
      filterKey: 'fruits',
      values: [
        {
          value: fruitsValue,
          label: option?.label,
        },
      ],
    });
  }

  const filters = [
    {
      key: 'primaryColors',
      label: 'Primary Colors',
      groupKey: FILTER_GROUP_KEYS.primaryColors,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <PrimaryColorsInput
            value={primaryColorValue}
            onChange={setPrimaryColorValue}
          />
        ),
        renderOperatorsInput: () => (
          <OperatorsInput
            value={primaryColorOperator}
            onChange={setPrimaryColorOperatorValue}
          />
        ),
        onClearRequest: clearPrimaryColorFilter,
      },
    },
    {
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: FILTER_GROUP_KEYS.secondaryColors,
      isPersistent: true,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <SecondaryColorsInput
            value={secondaryColorValue}
            onChange={setSecondaryColorValue}
          />
        ),
        onClearRequest: clearSecondaryColorFilter,
      },
    },
    {
      key: 'colorName',
      label: 'Color Name',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <ColorNameTextInput value={colorNameValue} onChange={setColorName} />
        ),
        onClearRequest: clearColorNameFilter,
      },
    },
    {
      key: 'fruits',
      label: 'Fruits',
      groupKey: FILTER_GROUP_KEYS.secondaryColors,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <FruitsRadioInput value={fruitsValue} onChange={setFruitsValue} />
        ),
        onClearRequest: clearFruitsFilter,
      },
    },
  ];

  return (
    <Filters
      renderSearchComponent={SearchInputComponent}
      filters={filters}
      filterGroups={FILTER_GROUPS}
      appliedFilters={appliedFilters}
      onClearAllRequest={clearAllFilters}
    />
  );
};
