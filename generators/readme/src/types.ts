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
  peerDependencies: { [packageName: string]: string };
};

function isNodeType<T extends Node>(node: Node, type: string): node is T {
  return node.type === type;
}
export const isTextNode = (node: Node): node is Text =>
  isNodeType<Text>(node, 'text');
