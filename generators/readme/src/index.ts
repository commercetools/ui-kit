import type { VFile, VFileCompatible } from 'vfile';
import type { Node } from 'unist';
import type {
  Parent,
  Heading,
  Text,
  Paragraph,
  Code,
  Root,
  HTML,
  Table,
  TableRow,
  TableCell,
  AlignType,
  InlineCode,
  StaticPhrasingContent,
  PhrasingContent,
} from 'mdast';
import type { Options as PrettierOptions } from 'prettier';
import type {
  CommandFlags,
  GeneratorReadmeOptions,
  PackgeJsonInfo,
  ReactAPI,
  ReactComponentProps,
  ReactComponentPropType,
} from './types';

import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import toVfile from 'to-vfile';
import vfile from 'vfile';
import unified from 'unified';
import markdown from 'remark-parse';
import mdx from 'remark-mdx';
import stringify from 'remark-stringify';
import rcfile from 'rcfile';
import prettier from 'prettier';
import camelcase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import stringfyOptions from './utils/stringify-options';

const prettierConfig = rcfile<PrettierOptions>('prettier');

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
    .use(markdown)
    .use(stringify, stringfyOptions)
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
  componentPropsInfo: ReactComponentProps
): ReactAPI['props'] => {
  switch (componentPropsInfo.type.name) {
    case 'arrayOf': {
      const arrayValue = componentPropsInfo.type
        .value as ReactComponentPropType;
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
                nextPropInfo
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
                }
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
      const shapeValue = componentPropsInfo.type.value as {
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
              nextPropInfo
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
      const unionValues = componentPropsInfo.type
        .value as ReactComponentPropType[];
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
                  }
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
  return {
    [normalizedPropName]: componentPropsInfo,
  };
};
const parsePropTypesToMarkdown = (componentPath: string) => {
  const result = shelljs.exec(`react-docgen ${componentPath}`, {
    silent: true,
  });
  const reactAPI: ReactAPI = JSON.parse(result.stdout);
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
      ...normalizeReactProps(propName, propInfo),
    }),
    {} as ReactAPI['props']
  );

  const tableBody = Object.entries(normalizedReactProps).map(
    ([propName, propInfo]) => {
      let propTypeNode: StaticPhrasingContent[];
      switch (propInfo.type.name) {
        // This case is only for arrays of scalar values, so we can render it as `Array of <scalar>`.
        case 'arrayOf': {
          const arrayValue = propInfo.type.value as ReactComponentPropType;
          propTypeNode = [text('Array of '), inlineCode(arrayValue.name)];
          break;
        }
        // This case is for unions of scalar values, so we can render it as `Array of <scalar>`.
        case 'union': {
          const unionValues = propInfo.type.value as ReactComponentPropType[];
          const combinedUnionValues = unionValues
            .map((union) => union.name)
            .join('\\|');
          propTypeNode = [inlineCode(`<${combinedUnionValues}>`)];
          break;
        }
        case 'enum': {
          propTypeNode = [
            inlineCode(propInfo.type.name),
            html('<br>'),
            html('Possible values:'),
            html('<br>'),
            inlineCode(
              (propInfo.type.value as { value: string }[])
                .map((enumValue) => enumValue.value)
                .join(' \\| ')
            ),
          ];
          break;
        }
        case 'objectOf': {
          propTypeNode = [
            inlineCode(
              `${propInfo.type.name}(${
                (propInfo.type.value as ReactComponentPropType).name
              })`
            ),
          ];
          break;
        }
        default: {
          propTypeNode = [
            inlineCode(
              propInfo.type.value
                ? String(propInfo.type.value)
                : propInfo.type.name
            ),
          ];
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

  return table(tableHeaders, tableBody, [null, null, 'center', null, null]);
};

function readmeTransformer(options: GeneratorReadmeOptions) {
  const packageJsonRaw = fs.readFileSync(
    path.join(options.packagePath, 'package.json'),
    {
      encoding: 'utf8',
    }
  );
  const parsedPackageJson = JSON.parse(packageJsonRaw);
  const packageJsonInfo: PackgeJsonInfo = {
    name: parsedPackageJson.name,
    description: parsedPackageJson.description,
    version: parsedPackageJson.version,
    readme: {
      componentPath: `src/${path.basename(options.packagePath)}.js`,
      ...(parsedPackageJson.readme ?? {}),
    },
    peerDependencies: parsedPackageJson.peerDependencies,
  };

  const paths = {
    componentPath: path.join(
      options.packagePath,
      packageJsonInfo.readme.componentPath
    ),
    description: path.join(options.packagePath, 'docs/description.md'),
    usageExample: path.join(options.packagePath, 'docs/usage-example.js'),
    additionalInfo: path.join(options.packagePath, 'docs/additional-info.md'),
  };

  return transformer;

  function transformer(tree: Node, _file: VFile) {
    (tree as Parent).children = [
      html(
        [
          '<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->',
          '<!-- This file is created by the `yarn generate-readme` script. -->',
        ].join('\n')
      ),
      // The main heading is derived by the name of the folder
      heading(1, upperFirst(camelcase(path.basename(options.packagePath)))),
      // The description is what's defined in the package.json
      heading(2, 'Description'),
      ...(fs.existsSync(paths.description)
        ? parseMarkdownFragmentToAST(toVfile.readSync(paths.description))
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
      code('jsx', fs.readFileSync(paths.usageExample, { encoding: 'utf8' })),
      // Describe the component's properties
      heading(2, 'Properties'),
      parsePropTypesToMarkdown(paths.componentPath),
      // Additional information (can be anything, there is no pre-defined structure here)
      ...(fs.existsSync(paths.additionalInfo)
        ? parseMarkdownFragmentToAST(toVfile.readSync(paths.additionalInfo))
        : []),
    ];
  }
}

export async function transformDocument(
  doc: VFileCompatible,
  options: GeneratorReadmeOptions
) {
  return new Promise<VFile>((resolve, reject) => {
    unified()
      .use(markdown)
      .use(stringify, stringfyOptions)
      .use(mdx)
      .use(readmeTransformer, options)
      .process(doc, (err, file) => {
        if (err) reject(err);
        else resolve(file);
      });
  });
}

export async function generate(
  relativePackagePath: string,
  flags: CommandFlags
) {
  const options: GeneratorReadmeOptions = {
    packagePath: path.resolve(process.cwd(), relativePackagePath),
    dryRun: flags.dryRun,
  };

  // Create an empty VFile.
  const doc = vfile();
  const file = await transformDocument(doc, options);
  // Assign the path where to write the file to.
  file.path = path.join(options.packagePath, 'README.md');
  // Format file using prettier.
  file.contents = prettier.format(file.contents.toString(), {
    ...prettierConfig,
    parser: 'markdown',
  });

  if (options.dryRun) {
    console.log(vfile(file).contents);
  } else {
    // Write the file to disk.
    await toVfile.write(file);
  }
}
