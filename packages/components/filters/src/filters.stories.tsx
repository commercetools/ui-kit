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
} from './fixtures/inputs';
import {
  FILTER_GROUP_KEYS,
  FILTER_GROUPS,
  FRUIT_OPTIONS,
  OPERATOR_OPTIONS,
} from './fixtures/constants';

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
    isPersistent: false,
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
          detail: 'see "PRIMARY COLORS SECTION" for controls',
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
            "a component passed to 'filters.renderMenyBody' that sets the selected filter value into the parent application's state",
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
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const [appliedPrimaryColorValue, setAppliedPrimaryColorValue] = useState<
    TFiltersProps['appliedFilters']
  >([]);
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>([]);
  const [colorNameValue, setColorName] = useState<string>('');
  const [fruitsValue, setFruitsValue] = useState<string>('');
  const [primaryColorOperator, setPrimaryColorOperatorValue] = useState<string>(
    OPERATOR_OPTIONS[0].value
  );

  // simulate state from parent application for each menuBody input
  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);
  const clearColorNameFilter = () => setColorName('');
  const clearFruitsFilter = () => setFruitsValue('');

  // add clear function for each input to 'clearAllFilters' function
  const clearAllFilters = () => {
    clearPrimaryColorFilter();
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
          // display selected operator in selected value if an operators input is rendered
          label: props.renderOperatorsInput ? (
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
          ) : (
            value
          ),
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
    // allow user to control this filter using controls in the 'PRIMARY COLORS FILTER' section of the controls table
    {
      key: 'primaryColors',
      label: props.label,
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
        onClearRequest: clearPrimaryColorFilter,
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
    />
  );
};
