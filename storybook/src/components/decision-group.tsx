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
export const DecisionGroup = ({ path }: TTokenGroupProps) => {
  // @ts-expect-error
  const { decisions } = get(definition, path) || {};

  if (!decisions) {
    return <pre>{JSON.stringify(definition, null, 2)}</pre>;
  }

  const rows = Object.keys(decisions).map((choiceKey) => {
    const { choice } = decisions[choiceKey];

    return {
      id: choiceKey,
      value: choice,
    };
  });

  const columns = [
    { key: 'id', label: 'Name' },
    { key: 'value', label: 'Value' },
  ];

  return <DataTable rows={rows} columns={columns} footer={null} />;
};
