// @ts-expect-error
import definition from './../../../design-system/materials/internals/definition.yaml';
import DataTable from '@commercetools-uikit/data-table';

function get(obj: object, path: string, defaultValue = undefined) {
  const keys = path.split('.');
  let result = obj;

  for (let key of keys) {
    if (result && result.hasOwnProperty(key)) {
      // @ts-expect-error
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result;
}

type TToken = Record<string, string>;

interface TTokenGroupProps {
  path: string;
  group:
    | string
    | {
        label: string;
        prefix: string;
        choices: TToken[];
      };
}
export const TokenKeyVal = ({ path }: TTokenGroupProps) => {
  const obj = get(definition, path) || {};
  const keys: string[] = Object.keys(obj);

  if (!keys || !keys.length) {
    return <pre>{JSON.stringify(definition, null, 2)}</pre>;
  }

  const rows = keys.map((key) => {
    // @ts-expect-error
    const value = obj[key];

    return {
      id: key,
      value: value.description,
    };
  });

  const columns = [
    { key: 'id', label: 'Name' },
    { key: 'value', label: 'Value' },
  ];

  return <DataTable rows={rows} columns={columns} footer={null} />;
};
