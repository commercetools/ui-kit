// @ts-expect-error
import definition from './../../../design-system/materials/internals/definition.yaml';
import DataTable from '@commercetools-uikit/data-table';
import {
  BorderRadiusDemo,
  ColorDemo,
  FontFamilyDemo,
  FontSizeDemo,
  FontWeightDemo,
  LineHeightDemo,
  ShadowDemo,
  SpacingDemo,
  BorderWidthDemo,
} from './value-demos';
import { TransitionDemo } from './value-demos/transition';

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
  visualizer: string;
  group:
    | string
    | {
        label: string;
        prefix: string;
        choices: TToken[];
      };
}

export const TokenGroup = ({ path, visualizer }: TTokenGroupProps) => {
  // @ts-expect-error
  const { choices } = get(definition, path) || {};

  if (!choices) {
    return <pre>{JSON.stringify(definition, null, 2)}</pre>;
  }

  const rows = Object.keys(choices).map((choiceKey) => {
    const choiceValue = choices[choiceKey];

    return {
      id: choiceKey,
      value: choiceValue,
    };
  });

  const columns = [
    { key: 'id', label: 'Name' },
    { key: 'value', label: 'Value' },
    {
      key: 'preview',
      label: 'Preview',
      renderItem: ({ value }: { value: string }) => {
        switch (true) {
          case visualizer === 'borderRadius':
            return <BorderRadiusDemo value={value} />;
          case visualizer === 'borderWidth':
            return <BorderWidthDemo value={value} />;
          case visualizer === 'color':
            return <ColorDemo value={value} />;
          case visualizer === 'shadow':
            return <ShadowDemo value={value} />;
          case visualizer === 'spacing':
            return <SpacingDemo value={value} />;
          case visualizer === 'transition':
            return <TransitionDemo value={value} />;
          case visualizer === 'fontFamily':
            return <FontFamilyDemo value={value} />;
          case visualizer === 'fontSize':
            return <FontSizeDemo value={value} />;
          case visualizer === 'fontWeight':
            return <FontWeightDemo value={value} />;
          case visualizer === 'lineHeight':
            return <LineHeightDemo value={value} />;
          default:
            return '-';
        }
      },
    },
  ];

  return (
    <div style={{ margin: '1.5rem 0 3rem' }}>
      <DataTable rows={rows} columns={columns} footer={null} />
    </div>
  );
};
