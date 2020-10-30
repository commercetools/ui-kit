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
  if (constraint === 'scale') return 'scale';
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

// Generates an array of accepted values for the max prop, given a min and max
const getAcceptedMaxPropValues = (min = 1, max = 16) => {
  return [
    ...Array.from({ length: max - min + 1 }).map((_, index) => index + min),
    'scale',
    'auto',
  ];
};

export {
  getMaxPropTokenValue,
  getMaxPropEquivalent,
  parseHorizontalConstraintProp,
  getAcceptedMaxPropValues,
};
