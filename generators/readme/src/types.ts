import type { Node } from 'unist';
import type { Text } from 'mdast';

export type CommandFlags = {
  dryRun: boolean;
};

export type GeneratorReadmeOptions = {
  packagePath: string;
  dryRun: CommandFlags['dryRun'];
};

export type PackgeJsonInfo = {
  name: string;
  description: string;
  version: string;
  readme: {
    componentPath: string;
  };
  peerDependencies: { [packageName: string]: string };
};

export type ReactComponentPropType = {
  name:
    | 'arrayOf'
    | 'custom'
    | 'enum'
    | 'array'
    | 'bool'
    | 'func'
    | 'number'
    | 'object'
    | 'string'
    | 'any'
    | 'element'
    | 'node'
    | 'symbol'
    | 'objectOf'
    | 'shape'
    | 'exact'
    | 'union'
    | 'elementType';
  value?: unknown;
  description?: string;
  required?: boolean;
};
export type ReactComponentProps = {
  type: ReactComponentPropType;
  required: boolean;
  description: string;
  defaultValue?: { value: string };
};
export type ReactAPI = {
  description: string;
  displayName: string;
  props: {
    [name: string]: ReactComponentProps;
  };
};

function isNodeType<T extends Node>(node: Node, type: string): node is T {
  return node.type === type;
}
export const isTextNode = (node: Node): node is Text =>
  isNodeType<Text>(node, 'text');
