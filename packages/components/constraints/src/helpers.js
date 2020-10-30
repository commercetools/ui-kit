import { customProperties as vars } from '@commercetools-uikit/design-system';

const getMaxPropTokenValue = (max) => {
  return vars[`constraint${max}`];
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

const parseHorizontalConstraintProp = (prop) => {
  if (typeof prop === 'number' || prop === 'auto' || prop === 'scale') {
    // prop is of type `max`
    return prop;
  }
  // prop is of type `constraint`
  return getMaxPropEquivalent(prop);
};

export {
  getMaxPropTokenValue,
  getMaxPropEquivalent,
  parseHorizontalConstraintProp,
};
