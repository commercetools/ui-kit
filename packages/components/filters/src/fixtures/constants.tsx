export const FILTER_GROUP_KEYS = {
  primaryColors: 'primaryColors',
  secondaryColors: 'secondaryColors',
};

export const FILTER_GROUPS = [
  { key: FILTER_GROUP_KEYS.primaryColors, label: <div>Primary Colors</div> },
  {
    key: FILTER_GROUP_KEYS.secondaryColors,
    label: <div>Secondary Colors</div>,
  },
];

export const PRIMARY_COLOR_OPTIONS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
  {
    label: 'Test label that is very very long for testing',
    value: 'Test label that is very very long for testing',
  },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Violet', value: 'violet' },
];

export const SECONDARY_COLOR_OPTIONS = [
  { label: 'Purple', value: 'purple' },
  { label: 'Forest', value: 'forest' },
  { label: 'Slate', value: 'slate' },
  { label: 'Silver', value: 'silver' },
];

export const FRUIT_OPTIONS = [
  { label: '🍎 Apple', value: '1' },
  { label: '🍌 Banana', value: '2' },
  { label: '🍍 Pineapple', value: '3' },
];

export const OPERATOR_OPTIONS = [
  { value: 'is', label: 'is' },
  { value: 'is not', label: 'is NOT' },
];
