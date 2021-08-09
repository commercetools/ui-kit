import type { Node } from 'unist';
import type { Text } from 'mdast';

export type CommandFlags = {
  dryRun: boolean;
  allWorkspacePackages: boolean;
};

export type GeneratorReadmeOptions = {
  dryRun: CommandFlags['dryRun'];
};

export type ReadmeConfig = {
  componentPaths?: string[];
};

export type PackgeJsonInfo = {
  name: string;
  description: string;
  version: string;
  peerDependencies: { [packageName: string]: string };
};

export type ReactComponentTypeName =
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
export type ReactComponentTSTypeElement = {
  name: string;
  value?: string;
};
export type ReactComponentPropType = {
  name: ReactComponentTypeName;
  value?: unknown;
  description?: string;
  required?: boolean;
};
export type ReactComponentTSTypePrimitive = {
  required?: boolean;
  name: 'string' | 'number' | 'boolean' | 'ReactNode';
};
export type ReactComponentTSTypePrimitiveLiteral = {
  required?: boolean;
  name: 'literal';
  value: string;
};
export type ReactComponentTSTypeUnion = {
  required?: boolean;
  name: 'union';
  raw: string;
  elements: ReactComponentTSDescriptor[];
};
export type ReactComponentTSTypeArray = {
  required?: boolean;
  name: 'Array';
  raw: string;
  elements: ReactComponentTSDescriptor[];
};
export type ReactComponentTSTypeSignatureFunction = {
  required?: boolean;
  name: 'signature';
  type: 'function';
  raw: string;
  signature: {
    arguments: {
      name: string;
      type?: ReactComponentTSDescriptor;
    }[];
    return: ReactComponentTSDescriptor;
  };
};
export type ReactComponentTSTypeSignatureObject = {
  required?: boolean;
  name: 'signature';
  type: 'object';
  raw: string;
  signature: {
    properties: {
      key: string | ReactComponentTSDescriptor;
      value: ReactComponentTSDescriptor;
    }[];
  };
};
export type ReactComponentTSDescriptor =
  | ReactComponentTSTypePrimitive
  | ReactComponentTSTypePrimitiveLiteral
  | ReactComponentTSTypeUnion
  | ReactComponentTSTypeArray
  | ReactComponentTSTypeSignatureFunction
  | ReactComponentTSTypeSignatureObject;
export type ReactComponentProps = {
  type?: ReactComponentPropType;
  tsType?: ReactComponentTSDescriptor;
  required: boolean;
  description: string;
  defaultValue?: { value: string; computed: boolean };
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
