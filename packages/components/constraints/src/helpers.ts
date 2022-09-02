import { designTokens } from '@commercetools-uikit/design-system';

type TDesignTokenName = keyof typeof designTokens;

// `null` is derived from `getMaxPropEquivalent`
const getMaxPropTokenValue = (max: number | string | null) => {
  if (!max) return null;
  return designTokens[`constraint${max}` as TDesignTokenName];
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
