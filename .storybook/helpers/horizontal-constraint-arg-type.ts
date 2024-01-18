import Constraints, { type TMaxProp } from '@commercetools-uikit/constraints';

type ExtractNumericValues<T> = T extends infer U
  ? U extends number
    ? U
    : never
  : never;

type TMinMax = ExtractNumericValues<TMaxProp>;

type THorizontalConstraintArgType = {
  defaultValue: TMaxProp;
  min?: TMinMax;
  max?: TMinMax;
};

const horizontalConstraintArgType = (
  { defaultValue, min, max }: THorizontalConstraintArgType = { defaultValue: 7 }
) => ({
  control: 'select',
  options: Constraints.getAcceptedMaxPropValues(min, max),
  defaultValue: defaultValue,
});

export default horizontalConstraintArgType;
