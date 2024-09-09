import type { VFile, VFileCompatible } from 'vfile';
import type { Node } from 'unist';
import type {
  Parent,
  Heading,
  Text,
  Paragraph,
  Link,
  Code,
  Root,
  HTML,
  Table,
  TableRow,
  TableCell,
  AlignType,
  InlineCode,
  BlockContent,
  PhrasingContent,
} from 'mdast';
import type { Options as PrettierOptions } from 'prettier';
import type {
  CommandFlags,
  GeneratorReadmeOptions,
  ReadmeConfig,
  PackgeJsonInfo,
  ReactAPI,
  ReactComponentProps,
  ReactComponentPropType,
  ReactComponentTSDescriptor,
} from './types';

import fs from 'fs';
import path from 'path';
// import shelljs from 'shelljs';
import Listr from 'listr';
// @ts-ignore
import ListrVerboseRenderer from 'listr-verbose-renderer';
import { getPackagesSync } from '@manypkg/get-packages';
import toVfile from 'to-vfile';
import vfile from 'vfile';
import unified from 'unified';
import parse from 'remark-parse';
import mdx from 'remark-mdx';
import gfm from 'remark-gfm-v1';
import stringify from 'remark-stringify';
// @ts-ignore
import * as reactDocgen from 'react-docgen';
// @ts-ignore
import setParamsTypeDefinitionFromFunctionType from 'typescript-react-function-component-props-handler';
import rcfile from 'rcfile';
import prettier from 'prettier';
import camelcase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import stringifyOptions from './utils/stringify-options';
import gfmOptions from './utils/gfm-options';

const prettierConfig = rcfile<PrettierOptions>('prettier');

async function existPath(filePath: string) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

const html = (value: string): HTML => ({
  type: 'html',
  value,
});
const text = (value: string): Text => ({
  type: 'text',
  value,
});
const paragraph = (value: string): Paragraph => ({
  type: 'paragraph',
  children: [text(value)],
});
const heading = (depth: Heading['depth'], value: string): Heading => ({
  type: 'heading',
  depth,
  children: [text(value)],
});
const headingSignature = (
  depth: Heading['depth'],
  value: string,
  propName: string
): Heading => ({
  type: 'heading',
  depth,
  children: [text(value), text(' '), inlineCode(propName)],
});
const link = (url: Link['url'], value: string): Link => ({
  type: 'link',
  url,
  children: [text(value)],
});
const code = (lang: string, value: string): Code => ({
  type: 'code',
  lang,
  value,
});
const inlineCode = (value: string): InlineCode => ({
  type: 'inlineCode',
  value,
});
const table = (
  tableHeader: TableRow,
  tableBody: TableRow[],
  align: AlignType[]
): Table => ({
  type: 'table',
  align,
  children: [tableHeader, ...tableBody],
});
const tableRow = (tableCells: TableCell[]): TableRow => ({
  type: 'tableRow',
  children: tableCells,
});
const tableCell = (value: string | PhrasingContent): TableCell => ({
  type: 'tableCell',
  children: [typeof value === 'string' ? text(value) : value],
});
const tableCellMultiline = (children: PhrasingContent[]): TableCell => ({
  type: 'tableCell',
  children,
});
const parseMarkdownFragmentToAST = (fragmentContent: VFileCompatible) => {
  const fragmentAST = unified()
    .use(parse)
    .use(gfm, gfmOptions)
    .use(stringify, stringifyOptions)
    .use(mdx)
    .parse(fragmentContent) as Root;
  return fragmentAST.children;
};
const embeddedDefaultValueRegex = /@@defaultValue@@:\s(.*)$/;
const parseEmbeddedDefaultValue = (
  originalDescription: string,
  nextPropInfo: ReactComponentProps
): ReactComponentProps => {
  const hasEmbeddedDefaultValue = originalDescription.match(
    embeddedDefaultValueRegex
  );
  if (hasEmbeddedDefaultValue) {
    const [, value] = hasEmbeddedDefaultValue;
    nextPropInfo.description = originalDescription.replace(
      embeddedDefaultValueRegex,
      ''
    );
    nextPropInfo.defaultValue = {
      value,
      computed: false,
    };
  }
  return nextPropInfo;
};
// Recursive function to normalize the nested prop types in a flat object shape.
// This is important to then render in the table each nested array/object element
// in a separate row.
const normalizeReactProps = (
  normalizedPropName: string,
  componentPropsInfo: ReactComponentProps,
  options: { isTsx: boolean }
): ReactAPI['props'] => {
  if (options.isTsx) {
    // NOTE: we can't really normalize the nested TS types, as the AST structure is a bit weird.
    // Instead, we print the signature below the table and simply link to that.
    return { [normalizedPropName]: componentPropsInfo };
  }
  const propInfoType = componentPropsInfo.type as ReactComponentPropType;
  switch (propInfoType.name) {
    case 'arrayOf': {
      const arrayValue = propInfoType.value as ReactComponentPropType;
      switch (arrayValue.name) {
        case 'shape': {
          const arrayShapeValue = arrayValue.value as {
            [name: string]: ReactComponentPropType;
          };
          const normalizedArrayShapeProps = Object.entries(
            arrayShapeValue
          ).reduce((normalizedShapeValues, [shapePropName, shapePropInfo]) => {
            const originalDescription = shapePropInfo.description ?? '';
            const nextPropInfo: ReactComponentProps = parseEmbeddedDefaultValue(
              originalDescription,
              {
                // Here use the nested prop type definition.
                type: shapePropInfo,
                required: shapePropInfo.required ?? false,
                description: originalDescription,
              }
            );
            return {
              ...normalizedShapeValues,
              ...normalizeReactProps(
                // The name of the prop has the "array + dot" notation (`[].`),
                // meaning that it's the property of an object of the array.
                `${normalizedPropName}[].${shapePropName}`,
                nextPropInfo,
                options
              ),
            };
          }, {});
          return {
            // Include the main prop as well.
            [normalizedPropName]: {
              ...componentPropsInfo,
              type: {
                name: 'array',
              },
            },
            ...normalizedArrayShapeProps,
          };
        }
        case 'union': {
          const arrayUnionValues = arrayValue.value as ReactComponentPropType[];
          const normalizedArrayShapeProps = arrayUnionValues.reduce(
            (normalizedShapeValues, shapePropInfo) => ({
              ...normalizedShapeValues,
              ...normalizeReactProps(
                // The name of the prop has the "array + union" notation (`[]<>`),
                // meaning that it's one of the supported shapes of the array.
                `${normalizedPropName}[]<${shapePropInfo.name}>`,
                {
                  // Here use the nested prop type definition.
                  type: shapePropInfo,
                  required: shapePropInfo.required ?? false,
                  description: shapePropInfo.description ?? '',
                },
                options
              ),
            }),
            {}
          );
          return {
            // Include the main prop as well.
            [normalizedPropName]: {
              ...componentPropsInfo,
              type: {
                name: 'array',
              },
            },
            ...normalizedArrayShapeProps,
          };
        }
        default:
          return { [normalizedPropName]: componentPropsInfo };
      }
    }
    case 'shape': {
      const shapeValue = propInfoType.value as {
        [name: string]: ReactComponentPropType;
      };
      const normalizedShapeProps = Object.entries(shapeValue).reduce(
        (normalizedShapeValues, [shapePropName, shapePropInfo]) => {
          const originalDescription = shapePropInfo.description ?? '';
          const nextPropInfo: ReactComponentProps = parseEmbeddedDefaultValue(
            originalDescription,
            {
              // Here use the nested prop type definition.
              type: shapePropInfo,
              required: shapePropInfo.required ?? false,
              description: originalDescription,
              defaultValue: componentPropsInfo.defaultValue,
            }
          );
          return {
            ...normalizedShapeValues,
            ...normalizeReactProps(
              // The name of the prop has the "dot" notation (`.`),
              // meaning that it's the property of an object.
              `${normalizedPropName}.${shapePropName}`,
              nextPropInfo,
              options
            ),
          };
        },
        {}
      );
      return {
        // Include the main prop as well.
        [normalizedPropName]: {
          ...componentPropsInfo,
          type: {
            name: 'object',
          },
        },
        ...normalizedShapeProps,
      };
    }
    case 'union': {
      const unionValues = propInfoType.value as ReactComponentPropType[];
      const normalizedUnionProps = unionValues.reduce(
        (normalizedUnionValues, shapePropInfo) => {
          switch (shapePropInfo.name) {
            case 'arrayOf':
            case 'shape':
              return {
                ...normalizedUnionValues,
                ...normalizeReactProps(
                  // The name of the prop has the "union" notation (`<>`),
                  // meaning that it's one of the supported shapes.
                  `${normalizedPropName}<${shapePropInfo.name}>`,
                  {
                    // Here use the nested prop type definition.
                    type: shapePropInfo,
                    required: shapePropInfo.required ?? false,
                    description: shapePropInfo.description ?? '',
                  },
                  options
                ),
              };
          }
          return normalizedUnionValues;
        },
        {}
      );
      return {
        // Include the main prop as well.
        [normalizedPropName]: componentPropsInfo,
        ...normalizedUnionProps,
      };
    }
  }
  return { [normalizedPropName]: componentPropsInfo };
};
const parsePropTypesToMarkdown = (
  componentPath: string,
  options: { isTsx: boolean; hasManyComponents: boolean }
): (PhrasingContent | BlockContent)[] => {
  const result = reactDocgen.parse(
    fs.readFileSync(componentPath, { encoding: 'utf8' }),
    reactDocgen.resolver.findExportedComponentDefinition,
    [setParamsTypeDefinitionFromFunctionType, ...reactDocgen.defaultHandlers],
    {
      filename: componentPath,
    }
  );
  const reactAPI: ReactAPI = result;

  const tableHeaders = tableRow([
    tableCell('Props'),
    tableCell('Type'),
    tableCell('Required'),
    tableCell('Default'),
    tableCell('Description'),
  ]);

  const normalizedReactProps = Object.entries(reactAPI.props).reduce(
    (normalizedProps, [propName, propInfo]) => ({
      ...normalizedProps,
      ...normalizeReactProps(propName, propInfo, options),
    }),
    {} as ReactAPI['props']
  );

  const signatures: (PhrasingContent | BlockContent)[] = [];

  const tableBody = Object.entries(normalizedReactProps).map(
    ([propName, propInfo]) => {
      let propTypeNode: PhrasingContent[];
      if (options.isTsx) {
        const propInfoType = propInfo.tsType as ReactComponentTSDescriptor;
        switch (propInfoType.name) {
          case 'signature': {
            switch (propInfoType.type) {
              case 'object': {
                propTypeNode = [
                  inlineCode('Object'),
                  html('<br/>'),
                  link(`#signature-${propName}`, 'See signature.'),
                ];
                signatures.push(
                  ...[
                    headingSignature(
                      options.hasManyComponents ? 4 : 3,
                      'Signature',
                      propName
                    ),
                    code('ts', propInfoType.raw),
                  ]
                );
                break;
              }
              case 'function': {
                propTypeNode = [
                  inlineCode('Function'),
                  html('<br/>'),
                  link(`#signature-${propName}`, 'See signature.'),
                ];
                signatures.push(
                  ...[
                    headingSignature(
                      options.hasManyComponents ? 4 : 3,
                      'Signature',
                      propName
                    ),
                    code('ts', propInfoType.raw),
                  ]
                );
                break;
              }
              default:
                propTypeNode = [];
                break;
            }
            break;
          }
          case 'Array': {
            const hasSignatureType = propInfoType.elements.some(
              (elemNode) => elemNode.name === 'signature'
            );

            if (hasSignatureType) {
              propTypeNode = [
                inlineCode(`Array: ${propInfoType.raw.replace('\n', '')}`),
                html('<br/>'),
                link(`#signature-${propName}`, 'See signature.'),
              ];
              signatures.push(
                ...[
                  headingSignature(
                    options.hasManyComponents ? 4 : 3,
                    'Signature',
                    propName
                  ),
                  ...propInfoType.elements
                    .map((elemNode) => {
                      switch (elemNode.name) {
                        case 'signature':
                          return elemNode.raw;
                        // TODO: add support for more cases?
                        default:
                          return undefined;
                      }
                    })
                    .filter(Boolean)
                    .map((value) => code('ts', value!)),
                ]
              );
            } else {
              propTypeNode = [
                inlineCode(`Array: ${propInfoType.raw.replace('\n', '')}`),
              ];
            }
            break;
          }
          case 'union': {
            const possibleSignatures = propInfoType.elements
              .map((elemNode) => {
                switch (elemNode.name) {
                  case 'signature':
                    return elemNode.raw;
                  // TODO: add support for more cases?
                  default:
                    return undefined;
                }
              })
              .filter(Boolean)
              .map((value) => code('ts', value!));
            propTypeNode = [
              inlineCode(propInfoType.name),
              html('<br/>'),
              html('Possible values:'),
              html('<br/>'),
              inlineCode(
                (propInfoType.raw || '').replace(/\n/g, '').replace(/\|/g, ',')
              ),
              ...(possibleSignatures.length > 0
                ? [
                    html('<br/>'),
                    link(`#signature-${propName}`, 'See signature.'),
                  ]
                : []),
            ];
            if (possibleSignatures.length > 0) {
              signatures.push(
                ...[
                  headingSignature(
                    options.hasManyComponents ? 4 : 3,
                    'Signature',
                    propName
                  ),
                  ...possibleSignatures,
                ]
              );
            }
            break;
          }
          default:
            propTypeNode = [inlineCode(propInfoType.name)];
        }
      } else {
        const propInfoType = propInfo.type as ReactComponentPropType;
        switch (propInfoType.name) {
          // This case is only for arrays of scalar values, so we can render it as `Array of <scalar>`.
          case 'arrayOf': {
            const arrayValue = propInfoType.value as ReactComponentPropType;
            propTypeNode = [text('Array of '), inlineCode(arrayValue.name)];
            break;
          }
          // This case is for unions of scalar values, so we can render it as `Array of <scalar>`.
          case 'union': {
            let unionValues = (
              propInfoType.value as ReactComponentPropType[]
            ).map((union) => union.name);
            const combinedUnionValues = unionValues
              // FIXME: it seems that there is a regression about escaping mulitple pipes.
              // https://github.com/syntax-tree/mdast-util-gfm-table
              // .join('\\|');
              .join(', ');
            propTypeNode = [inlineCode(`<${combinedUnionValues}>`)];
            break;
          }
          case 'enum': {
            propTypeNode = [
              inlineCode(propInfoType.name),
              html('<br/>'),
              html('Possible values:'),
              html('<br/>'),
              inlineCode(
                (propInfoType.value as { value: string }[])
                  .map((enumValue) => enumValue.value)
                  // FIXME: it seems that there is a regression about escaping mulitple pipes.
                  // https://github.com/syntax-tree/mdast-util-gfm-table
                  // .join(' \\| ');
                  .join(', ')
              ),
            ];
            break;
          }
          case 'objectOf': {
            propTypeNode = [
              inlineCode(
                `${propInfoType.name}(${
                  (propInfoType.value as ReactComponentPropType).name
                })`
              ),
            ];
            break;
          }
          default: {
            propTypeNode = [
              inlineCode(
                propInfoType.value
                  ? String(propInfoType.value)
                  : propInfoType.name
              ),
            ];
          }
        }
      }

      return tableRow([
        tableCell(inlineCode(propName)),
        tableCellMultiline(propTypeNode),
        tableCell(propInfo.required ? '✅' : ''),
        tableCell(
          propInfo.defaultValue ? inlineCode(propInfo.defaultValue.value) : ''
        ),
        tableCellMultiline(
          parseMarkdownFragmentToAST(propInfo.description) as PhrasingContent[]
        ),
      ]);
    }
  );

  return [
    table(tableHeaders, tableBody, [null, null, 'center', null, null]),
    ...(signatures.length > 0
      ? [
          heading(options.hasManyComponents ? 3 : 2, 'Signatures'),
          ...signatures,
        ]
      : []),
  ];
};

function readmeTransformer(packageFolderPath: string) {
  const packageJsonRaw = fs.readFileSync(
    path.join(packageFolderPath, 'package.json'),
    { encoding: 'utf8' }
  );
  const parsedPackageJson = JSON.parse(packageJsonRaw);
  const readmeConfig: ReadmeConfig = parsedPackageJson.readme ?? {};

  const packageJsonInfo: PackgeJsonInfo = {
    name: parsedPackageJson.name,
    description: parsedPackageJson.description,
    version: parsedPackageJson.version,
    peerDependencies: parsedPackageJson.peerDependencies,
  };

  const isTsx = fs.existsSync(path.join(packageFolderPath, 'src/index.ts'));

  const hasCustomComponentsPath = readmeConfig.componentPaths
    ? readmeConfig.componentPaths.length > 0
    : false;
  const defaultComponentPath = path.join(
    packageFolderPath,
    `src/${path.basename(packageFolderPath)}.${isTsx ? 'tsx' : 'js'}`
  );

  const paths = {
    componentPaths:
      readmeConfig.componentPaths?.map((componentPath) =>
        path.join(packageFolderPath, componentPath)
      ) ?? [],
    description: path.join(packageFolderPath, 'docs/description.md'),
    usageExample: path.join(packageFolderPath, 'docs/usage-example.js'),
    additionalInfo: path.join(packageFolderPath, 'docs/additional-info.md'),
  };

  return transformer;

  async function transformer(tree: Node, _file: VFile) {
    (tree as Parent).children = [
      html(
        [
          '<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->',
          '<!-- This file is created by the `yarn generate-readme` script. -->',
        ].join('\n')
      ),
      // The main heading is derived by the name of the folder
      heading(1, upperFirst(camelcase(path.basename(packageFolderPath)))),
      // The description is what's defined in the package.json
      heading(2, 'Description'),
      ...((await existPath(paths.description))
        ? parseMarkdownFragmentToAST(await toVfile.read(paths.description))
        : // Fall back to the package.json description field.
          [paragraph(packageJsonInfo.description)]),

      // Describe the installation steps
      heading(2, 'Installation'),
      code('', `yarn add ${packageJsonInfo.name}`),
      code('', `npm --save install ${packageJsonInfo.name}`),
      packageJsonInfo.peerDependencies &&
        paragraph(
          'Additionally install the peer dependencies (if not present)'
        ),
      packageJsonInfo.peerDependencies &&
        code(
          '',
          `yarn add ${Object.keys(packageJsonInfo.peerDependencies).join(' ')}`
        ),
      code(
        '',
        `npm --save install ${Object.keys(
          packageJsonInfo.peerDependencies
        ).join(' ')}`
      ),
      // Usage example
      heading(2, 'Usage'),
      code(
        'jsx',
        await fs.promises.readFile(paths.usageExample, { encoding: 'utf8' })
      ),

      ...(hasCustomComponentsPath
        ? // Render components in a group, otherwise omit the nested heading.
          paths.componentPaths.flatMap((componentPath) => {
            const [componentName] = path
              .basename(componentPath)
              .split(isTsx ? '.tsx' : '.js');
            return [
              heading(2, upperFirst(camelcase(componentName))),
              // Describe the component's properties
              heading(3, 'Properties'),
              ...parsePropTypesToMarkdown(componentPath, {
                isTsx,
                hasManyComponents: true,
              }),
            ];
          })
        : [
            // Describe the component's properties
            heading(2, 'Properties'),
            ...parsePropTypesToMarkdown(defaultComponentPath, {
              isTsx,
              hasManyComponents: false,
            }),
          ]),

      // Additional information (can be anything, there is no pre-defined structure here)
      ...((await existPath(paths.additionalInfo))
        ? parseMarkdownFragmentToAST(await toVfile.read(paths.additionalInfo))
        : []),
    ];
  }
}

export async function transformDocument(
  doc: VFileCompatible,
  packageFolderPath: string
) {
  return new Promise<VFile>((resolve, reject) => {
    unified()
      .use(parse)
      .use(gfm, gfmOptions)
      .use(stringify, stringifyOptions)
      .use(mdx)
      .use(readmeTransformer, packageFolderPath)
      .process(doc, (err, file) => {
        if (err) reject(err);
        else resolve(file);
      });
  });
}

function writeFile(
  filePath: string,
  file: VFile,
  options: GeneratorReadmeOptions
) {
  // Assign the path where to write the file to.
  file.path = filePath;
  // Format file using prettier.
  file.contents = prettier.format(file.contents.toString(), {
    ...prettierConfig,
    parser: 'markdown',
  });

  if (options.dryRun) {
    console.log(vfile(file).contents);
  } else {
    // Write the file to disk.
    toVfile.writeSync(file);
  }
}

export async function generate(
  relativePackagePath: string,
  flags: CommandFlags
) {
  const options: GeneratorReadmeOptions = {
    dryRun: flags.dryRun,
  };

  if (flags.allWorkspacePackages) {
    const workspacePackages = getPackagesSync(process.cwd());
    const taskList = new Listr(
      workspacePackages.packages.map((packageInfo) => ({
        title: `Processing ${packageInfo.packageJson.name}`,
        task: async () => {
          const readmePath = path.join(packageInfo.dir, 'README.md');
          // Create an empty VFile.
          const doc = vfile();
          const content = await transformDocument(doc, packageInfo.dir);
          await writeFile(readmePath, content, options);
        },
        skip: async () =>
          !(await existPath(path.join(packageInfo.dir, 'docs'))),
      })),
      {
        concurrent: 10,
        exitOnError: false,
        renderer:
          // @ts-ignore
          process.env.CI === true || process.env.CI === 'true'
            ? ListrVerboseRenderer
            : 'default',
        nonTTYRenderer: ListrVerboseRenderer,
      }
    );
    await taskList.run();
  } else {
    const packageFolderPath = path.resolve(process.cwd(), relativePackagePath);
    // Create an empty VFile.
    const doc = vfile();
    const content = await transformDocument(doc, packageFolderPath);
    await writeFile(
      path.join(packageFolderPath, 'README.md'),
      content,
      options
    );
  }
}
