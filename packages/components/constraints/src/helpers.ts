import { customProperties } from '@commercetools-uikit/design-system';

// `null` is derived from `getMaxPropEquivalent`
const getMaxPropTokenValue = (max: number | string | null) => {
  if (!max) return null;
  // @ts-expect-error
  return customProperties[`constraint${max}`];
};

export { getMaxPropTokenValue };
