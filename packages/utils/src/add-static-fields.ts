import type { FC } from 'react';

type TStaticFields = Record<string, unknown>;

export default function addStaticFields<
  TProps extends {},
  TFields extends TStaticFields
>(Component: FC<TProps>, fields: TFields): FC<TProps> & TFields {
  Object.entries(fields).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    // @ts-expect-error
    Component[key] = value;
  });
  return Component as FC<TProps> & TFields;
}
