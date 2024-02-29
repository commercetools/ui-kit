import Constraints, { type TMaxProp } from '@commercetools-uikit/constraints';

type ExtractNumericValues<T> = T extends infer U
  ? U extends number
    ? U
    : never
  : never;

type TMinMax = ExtractNumericValues<TMaxProp>;

type THorizontalConstraintArgType = {
  min?: TMinMax;
  max?: TMinMax;
};

const horizontalConstraintArgType = (args?: THorizontalConstraintArgType) => ({
  control: 'select',
  options: Constraints.getAcceptedMaxPropValues(args?.min, args?.max),
});

export default horizontalConstraintArgType;
