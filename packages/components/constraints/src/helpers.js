import { customProperties as vars } from '@commercetools-uikit/design-system';

const getMaxPropTokenValue = (max) => {
  if (max === 1) return vars.constraint1;
  if (max === 2) return vars.constraint2;
  if (max === 3) return vars.constraint3;
  if (max === 4) return vars.constraint4;
  if (max === 5) return vars.constraint5;
  if (max === 6) return vars.constraint6;
  if (max === 7) return vars.constraint7;
  if (max === 8) return vars.constraint8;
  if (max === 9) return vars.constraint9;
  if (max === 10) return vars.constraint10;
  if (max === 11) return vars.constraint11;
  if (max === 12) return vars.constraint12;
  if (max === 13) return vars.constraint13;
  if (max === 14) return vars.constraint14;
  if (max === 15) return vars.constraint15;
  if (max === 16) return vars.constraint16;

  return null;
};

/* Useful for mapping a constraint prop to its equivalent max prop for ui-kit components
 which have a `horizontalConstraint` prop and while both props are still acceptable */
const getMaxPropEquivalent = (constraint) => {
  if (constraint === 'xs') return 1;
  if (constraint === 's') return 3;
  if (constraint === 'm') return 7;
  if (constraint === 'l') return 10;
  if (constraint === 'xl') return 16;
  return null;
};

export { getMaxPropTokenValue, getMaxPropEquivalent };
