import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Filters, { type TFiltersProps } from './filters';
import {
  SearchInputComponent,
  FruitsRadioInput,
  ColorNameTextInput,
  SecondaryColorsInput,
  PrimaryColorsInput,
  PrimaryColorsRadioInput,
  PrimaryColorsTextInput,
  OperatorsInput,
  DateRangeFilterInput,
  DateFilterWithOperator,
  DateTimeFilterWithOperator,
  DateOperatorsInput,
} from './fixtures/inputs';
import {
  FILTER_GROUP_KEYS,
  FILTER_GROUPS,
  FRUIT_OPTIONS,
  OPERATOR_OPTIONS,
} from './fixtures/constants';
import Spacings from '@commercetools-uikit/spacings';

type TFiltersPropsWithCustomArgs = TFiltersProps & {
  label?: string;
  renderMenuBody?: string;
  renderOperatorsInput?: boolean;
  renderApplyButton?: boolean;
  isDisabled?: boolean;
  isPersistent?: boolean;
};

const CustomSearchExample = () => <div>im an example</div>;

const meta: Meta<TFiltersPropsWithCustomArgs> = {
  title: 'components/Filters',
  component: Filters,
  args: {
    renderSearchComponent: <SearchInputComponent />,
    label: 'Primary Colors',
    renderOperatorsInput: true,
    renderMenuBody: 'select',
    renderApplyButton: false,
    isDisabled: false,
    isPersistent: true,
    defaultOpen: true,
  },
  argTypes: {
    appliedFilters: {
      control: false,
    },
    onClearAllRequest: {
      control: false,
    },
    onAddFilterRequest: {
      control: false,
    },
    filters: {
      control: false,
      table: {
        type: {
          detail: 'see "PRIMARY COLORS FILTER" section below for controls',
        },
      },
    },
    filterGroups: {
      control: 'boolean',
    },
    renderSearchComponent: {
      control: { type: 'inline-radio' },
      options: ['search input', 'custom'],
      mapping: {
        'search input': <SearchInputComponent />,
        custom: <CustomSearchExample />,
      },
    },
    renderMenuBody: {
      control: { type: 'radio' },
      options: ['select', 'text', 'radio'],
      table: {
        category: 'primary colors filter',
        type: {
          summary:
            "a component passed to 'filters.renderMenuBody' that sets the selected filter value into the parent application's state",
        },
      },
    },
    renderOperatorsInput: {
      type: 'boolean',
      table: {
        category: 'primary colors filter',
        type: {
          summary:
            "a select component passed to 'filters.renderOperatorsInput' that sets the selected operator value in the parent application's state.  a selected operator value can optionally be combined with the selected value labels, as shown in the demo",
        },
      },
    },
    isDisabled: {
      type: 'boolean',
      table: {
        category: 'primary colors filter',
        type: {
          summary:
            "controls whether or not the 'Primary Colors' filter is in a disabled state",
        },
      },
    },
    isPersistent: {
      type: 'boolean',
      table: {
        category: 'primary colors filter',
        type: {
          summary:
            "controls whether or not the 'Primary Colors' filter is persistently displayed when the filters list is open",
        },
      },
    },
    renderApplyButton: {
      type: 'boolean',
      table: {
        category: 'primary colors filter',
        type: {
          summary:
            "controls whether or not the 'Primary Colors' filter is persistently displayed when the filters list is open",
        },
      },
    },
    label: {
      table: {
        category: 'primary colors filter',
        type: {
          summary: "controls the 'Primary Colors' filter label",
        },
      },
      control: 'text',
    },
  },
  // https://github.com/storybookjs/storybook/issues/17025#issuecomment-1703974689
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;

type Story = StoryFn<typeof Filters>;

export const BasicExample: Story = (props: TFiltersPropsWithCustomArgs) => {
  // simulate state from parent application for each menuBody input
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>([]);
  const [colorNameValue, setColorName] = useState<string>('');
  const [fruitsValue, setFruitsValue] = useState<string>('');
  const [primaryColorOperator, setPrimaryColorOperatorValue] = useState<string>(
    OPERATOR_OPTIONS[0].value
  );
  //simulate separate 'applied' state to use when primary color filter renderApplyButton is true
  const [appliedPrimaryColorValue, setAppliedPrimaryColorValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);

  // create a 'clear' function for each filter
  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearPrimaryColorAppliedValue = () => setAppliedPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);
  const clearColorNameFilter = () => setColorName('');
  const clearFruitsFilter = () => setFruitsValue('');

  // add clear function for each input to 'clearAllFilters' function
  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearPrimaryColorAppliedValue();
    clearSecondaryColorFilter();
    clearColorNameFilter();
    clearFruitsFilter();
  };

  // generate 'appliedFilters' state based on simulated parent application state
  const appliedFilters: TFiltersProps['appliedFilters'] = [
    ...appliedPrimaryColorValue,
  ];

  const getPrimaryColorValue = (): TFiltersProps['appliedFilters'] => {
    const appliedPrimaryColorFilters = [];
    if (primaryColorValue.length > 0) {
      appliedPrimaryColorFilters.push({
        filterKey: 'primaryColors',
        values: primaryColorValue.map((value) => ({
          value: value,

          label: value,
        })),
      });
    }
    return appliedPrimaryColorFilters;
  };

  if (!props.renderApplyButton) {
    if (appliedPrimaryColorValue.length > 0) {
      setAppliedPrimaryColorValue([]);
    }
    appliedFilters.push(...getPrimaryColorValue());
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
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: FILTER_GROUP_KEYS.secondaryColors,
      hasWideMenu: true,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <Spacings.Inline>
            <SecondaryColorsInput
              value={secondaryColorValue}
              onChange={setSecondaryColorValue}
            />
            <SecondaryColorsInput
              value={secondaryColorValue}
              onChange={setSecondaryColorValue}
            />
          </Spacings.Inline>
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
    // allow user to control this filter using controls in the 'PRIMARY COLORS FILTER' section of the controls table
    {
      key: 'primaryColors',
      label: props.label,
      // display selected operator if an operators input is rendered
      operatorLabel: props.renderOperatorsInput
        ? primaryColorOperator
        : undefined,
      groupKey: FILTER_GROUP_KEYS.primaryColors,
      isDisabled: props.isDisabled,
      isPersistent: props.isPersistent,
      filterMenuConfiguration: {
        renderMenuBody: () => {
          switch (props.renderMenuBody) {
            case 'radio':
              return (
                <PrimaryColorsRadioInput
                  value={primaryColorValue[0]}
                  onChange={setPrimaryColorValue}
                />
              );
            case 'text':
              return (
                <PrimaryColorsTextInput
                  value={primaryColorValue[0]}
                  onChange={setPrimaryColorValue}
                />
              );
            case 'select':
            default:
              return (
                <PrimaryColorsInput
                  value={primaryColorValue}
                  onChange={setPrimaryColorValue}
                />
              );
          }
        },
        renderOperatorsInput: () =>
          props.renderOperatorsInput ? (
            <OperatorsInput
              value={primaryColorOperator}
              onChange={setPrimaryColorOperatorValue}
            />
          ) : undefined,
        renderApplyButton: () =>
          props.renderApplyButton ? (
            <PrimaryButton
              onClick={() => {
                setAppliedPrimaryColorValue(getPrimaryColorValue());
              }}
              isDisabled={primaryColorValue.length === 0}
              label="Apply"
              size="10"
            />
          ) : undefined,
        onClearRequest: () => {
          clearPrimaryColorFilter();
          clearPrimaryColorAppliedValue();
        },
      },
    },
  ];

  return (
    <Filters
      renderSearchComponent={props.renderSearchComponent}
      filters={filters}
      filterGroups={props.filterGroups ? FILTER_GROUPS : undefined}
      appliedFilters={appliedFilters}
      onClearAllRequest={clearAllFilters}
      defaultOpen={props.defaultOpen}
    />
  );
};

export const DateFiltersExample: Story = () => {
  // simulate state from parent application for each date filter
  // Pending values (before apply)
  const [pendingDateValue, setPendingDateValue] = useState<string | string[]>(
    ''
  );
  const [pendingDateTimeValue, setPendingDateTimeValue] = useState<
    string | string[]
  >('');
  const [pendingDateRangeValue, setPendingDateRangeValue] = useState<string[]>(
    []
  );

  // Applied values (after clicking apply)
  const [appliedDateValue, setAppliedDateValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);
  const [appliedDateTimeValue, setAppliedDateTimeValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);
  const [appliedDateRangeValue, setAppliedDateRangeValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);

  // Operators for each date filter
  const [dateOperator, setDateOperator] = useState<string>('is');
  const [dateTimeOperator, setDateTimeOperator] = useState<string>('is');
  const [dateRangeOperator, setDateRangeOperator] =
    useState<string>('is between');

  // Helper function to get applied values for a filter
  const getDateAppliedValue = (): TFiltersProps['appliedFilters'] => {
    if (
      dateOperator === 'is between' &&
      Array.isArray(pendingDateValue) &&
      pendingDateValue.length === 2
    ) {
      return [
        {
          filterKey: 'date',
          values: [
            {
              value: pendingDateValue.join(' - '),
              label: `${pendingDateValue[0]} - ${pendingDateValue[1]}`,
            },
          ],
        },
      ];
    } else if (pendingDateValue && !Array.isArray(pendingDateValue)) {
      return [
        {
          filterKey: 'date',
          values: [
            {
              value: pendingDateValue,
              label: pendingDateValue,
            },
          ],
        },
      ];
    }
    return [];
  };

  const getDateTimeAppliedValue = (): TFiltersProps['appliedFilters'] => {
    if (
      dateTimeOperator === 'is between' &&
      Array.isArray(pendingDateTimeValue) &&
      pendingDateTimeValue.length === 2
    ) {
      return [
        {
          filterKey: 'dateTime',
          values: [
            {
              value: pendingDateTimeValue.join(' - '),
              label: `${pendingDateTimeValue[0]} - ${pendingDateTimeValue[1]}`,
            },
          ],
        },
      ];
    } else if (pendingDateTimeValue && !Array.isArray(pendingDateTimeValue)) {
      return [
        {
          filterKey: 'dateTime',
          values: [
            {
              value: pendingDateTimeValue,
              label: new Date(pendingDateTimeValue).toLocaleString(),
            },
          ],
        },
      ];
    }
    return [];
  };

  const getDateRangeAppliedValue = (): TFiltersProps['appliedFilters'] => {
    if (pendingDateRangeValue.length === 2) {
      return [
        {
          filterKey: 'dateRange',
          values: [
            {
              value: pendingDateRangeValue.join(' - '),
              label: `${pendingDateRangeValue[0]} - ${pendingDateRangeValue[1]}`,
            },
          ],
        },
      ];
    }
    return [];
  };

  // Clear functions for pending values
  const clearDateFilter = () => {
    setPendingDateValue(dateOperator === 'is between' ? [] : '');
    setAppliedDateValue([]);
  };

  const clearDateTimeFilter = () => {
    setPendingDateTimeValue(dateTimeOperator === 'is between' ? [] : '');
    setAppliedDateTimeValue([]);
  };

  const clearDateRangeFilter = () => {
    setPendingDateRangeValue([]);
    setAppliedDateRangeValue([]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    clearDateFilter();
    clearDateTimeFilter();
    clearDateRangeFilter();
  };

  // Handle operator changes and reset values
  const handleDateOperatorChange = (newOperator: string) => {
    setDateOperator(newOperator);
    setPendingDateValue(newOperator === 'is between' ? [] : '');
    setAppliedDateValue([]);
  };

  const handleDateTimeOperatorChange = (newOperator: string) => {
    setDateTimeOperator(newOperator);
    setPendingDateTimeValue(newOperator === 'is between' ? [] : '');
    setAppliedDateTimeValue([]);
  };

  // Check if apply button should be enabled
  const isDateApplyEnabled = () => {
    if (dateOperator === 'is between') {
      return Array.isArray(pendingDateValue) && pendingDateValue.length === 2;
    }
    return pendingDateValue && !Array.isArray(pendingDateValue);
  };

  const isDateTimeApplyEnabled = () => {
    if (dateTimeOperator === 'is between') {
      return (
        Array.isArray(pendingDateTimeValue) && pendingDateTimeValue.length === 2
      );
    }
    return pendingDateTimeValue && !Array.isArray(pendingDateTimeValue);
  };

  const isDateRangeApplyEnabled = () => {
    return pendingDateRangeValue.length === 2;
  };

  // generate 'appliedFilters' state based on applied values
  const appliedFilters: TFiltersProps['appliedFilters'] = [
    ...appliedDateValue,
    ...appliedDateTimeValue,
    ...appliedDateRangeValue,
  ];

  const filters = [
    {
      key: 'date',
      label: 'Date',
      operatorLabel: dateOperator,
      groupKey: FILTER_GROUP_KEYS.dateFilters,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <DateFilterWithOperator
            value={pendingDateValue}
            onChange={setPendingDateValue}
            operator={dateOperator}
          />
        ),
        renderOperatorsInput: () => (
          <DateOperatorsInput
            value={dateOperator}
            onChange={handleDateOperatorChange}
          />
        ),
        renderApplyButton: () => (
          <PrimaryButton
            onClick={() => {
              setAppliedDateValue(getDateAppliedValue());
            }}
            isDisabled={!isDateApplyEnabled()}
            label="Apply"
            size="10"
          />
        ),
        onClearRequest: clearDateFilter,
      },
    },
    {
      key: 'dateTime',
      label: 'Date & Time',
      operatorLabel: dateTimeOperator,
      groupKey: FILTER_GROUP_KEYS.dateFilters,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <DateTimeFilterWithOperator
            value={pendingDateTimeValue}
            onChange={setPendingDateTimeValue}
            operator={dateTimeOperator}
          />
        ),
        renderOperatorsInput: () => (
          <DateOperatorsInput
            value={dateTimeOperator}
            onChange={handleDateTimeOperatorChange}
          />
        ),
        renderApplyButton: () => (
          <PrimaryButton
            onClick={() => {
              setAppliedDateTimeValue(getDateTimeAppliedValue());
            }}
            isDisabled={!isDateTimeApplyEnabled()}
            label="Apply"
            size="10"
          />
        ),
        onClearRequest: clearDateTimeFilter,
      },
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      operatorLabel: dateRangeOperator,
      groupKey: FILTER_GROUP_KEYS.dateFilters,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <DateRangeFilterInput
            value={pendingDateRangeValue}
            onChange={setPendingDateRangeValue}
          />
        ),
        renderOperatorsInput: () => (
          <DateOperatorsInput
            value={dateRangeOperator}
            onChange={setDateRangeOperator}
          />
        ),
        renderApplyButton: () => (
          <PrimaryButton
            onClick={() => {
              setAppliedDateRangeValue(getDateRangeAppliedValue());
            }}
            isDisabled={!isDateRangeApplyEnabled()}
            label="Apply"
            size="10"
          />
        ),
        onClearRequest: clearDateRangeFilter,
      },
    },
  ];

  return (
    <div style={{ minHeight: 400 }}>
      <h3 style={{ marginBottom: '16px' }}>
        Advanced Date Filters with Operators
      </h3>
      <p
        style={{
          marginBottom: '32px',
          color: '#808080',
          lineHeight: '1.5',
        }}
      >
        This example demonstrates date filter functionality including:
        <br />
        • Configurable operators (is, is not, is between, is before, is after)
        <br />
        • Dynamic component switching (DateInput ↔ DateRangeInput based on
        operator)
        <br />
      </p>
      <Filters
        renderSearchComponent={<SearchInputComponent />}
        filters={filters}
        filterGroups={FILTER_GROUPS}
        appliedFilters={appliedFilters}
        onClearAllRequest={clearAllFilters}
        defaultOpen={true}
      />
    </div>
  );
};

export const WithMultipleMenuInputs: Story = () => {
  const [pendingDateValue, setPendingDateValue] = useState<string | string[]>(
    ''
  );
  // Applied values (after clicking apply)
  const [appliedDateValue, setAppliedDateValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);

  const getDateAppliedValue = (): TFiltersProps['appliedFilters'] => {
    if (pendingDateValue && !Array.isArray(pendingDateValue)) {
      return [
        {
          filterKey: 'date',
          values: [
            {
              value: pendingDateValue,
              label: pendingDateValue,
            },
          ],
        },
      ];
    }
    return [];
  };

  // Clear functions for pending values
  const clearDateFilter = () => {
    setAppliedDateValue([]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    clearDateFilter();
  };

  // Check if apply button should be enabled
  const isDateApplyEnabled = () => {
    return pendingDateValue && !Array.isArray(pendingDateValue);
  };

  // generate 'appliedFilters' state based on applied values
  const appliedFilters: TFiltersProps['appliedFilters'] = [...appliedDateValue];

  const filters = [
    {
      key: 'date',
      label: 'Date',
      hasWideMenu: true,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <Spacings.Inline>
            <DateFilterWithOperator
              value={pendingDateValue}
              onChange={setPendingDateValue}
              operator="is"
            />
            <DateFilterWithOperator
              value={pendingDateValue}
              onChange={setPendingDateValue}
              operator="is not"
            />
          </Spacings.Inline>
        ),
        renderApplyButton: () => (
          <PrimaryButton
            onClick={() => {
              setAppliedDateValue(getDateAppliedValue());
            }}
            isDisabled={!isDateApplyEnabled()}
            label="Apply"
            size="10"
          />
        ),
        onClearRequest: clearDateFilter,
      },
    },
  ];

  return (
    <div style={{ minHeight: 400 }}>
      <h3 style={{ marginBottom: '16px' }}>
        Filters with multiple menu inputs
      </h3>
      <p
        style={{
          marginBottom: '32px',
          color: '#808080',
          lineHeight: '1.5',
        }}
      >
        This example demonstrates the use of multiple menu inputs in a single
        filter to showcase a wider menu width when `hasWideMenu` is `true`.
      </p>
      <Filters
        renderSearchComponent={<SearchInputComponent />}
        filters={filters}
        filterGroups={FILTER_GROUPS}
        appliedFilters={appliedFilters}
        onClearAllRequest={clearAllFilters}
        defaultOpen={true}
      />
    </div>
  );
};
