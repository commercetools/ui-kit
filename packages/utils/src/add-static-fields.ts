import type { FC } from 'react';

type StaticFields = Record<string, unknown>;

export default function addStaticFields<
  Props extends {},
  Fields extends StaticFields
>(Component: FC<Props>, fields: Fields): FC<Props> & Fields {
  Object.entries(fields).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    // @ts-expect-error
    Component[key] = value;
  });
  return Component as FC<Props> & Fields;
}
