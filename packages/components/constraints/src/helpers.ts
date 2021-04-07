import { customProperties } from '@commercetools-uikit/design-system';

// `null` is derived from `getMaxPropEquivalent`
const getMaxPropTokenValue = (max: number | string | null) => {
  if (!max) return null;
  // @ts-expect-error
  return customProperties[`constraint${max}`];
};

// Generates an array of accepted values for the max prop, given a min and max
const getAcceptedMaxPropValues = (min = 1, max = 16) => {
  return [
    ...Array.from({ length: max - min + 1 }).map((_, index) => index + min),
    'scale',
    'auto',
  ];
};

export { getMaxPropTokenValue, getAcceptedMaxPropValues };
