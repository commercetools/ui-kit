import { designTokens } from '@commercetools-uikit/design-system';

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

export { getMaxPropTokenValue };
