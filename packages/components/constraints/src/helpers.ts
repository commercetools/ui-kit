import { designTokens } from '@commercetools-uikit/design-system';
import { TMaxProp } from './horizontal';

type TDesignTokenName = keyof typeof designTokens;

// `null` is derived from `getMaxPropEquivalent`
const getMaxPropTokenValue = (max: number | string | null) => {
  if (!max) return null;
  const tokenName = `constraint${max}`;
  if (tokenName in designTokens) {
    return designTokens[tokenName as TDesignTokenName];
  }
  return null;
};

// Generates an array of accepted values for the max prop, given a min and max
const getAcceptedMaxPropValues = (min = 1, max = 16) => {
  return [
    ...Array.from({ length: max - min + 1 }).map((_, index) => index + min),
    'scale',
    'auto',
  ] as TMaxProp[];
};

export { getMaxPropTokenValue, getAcceptedMaxPropValues };
