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
} from 'mdast';
import type { Options as PrettierOptions } from 'prettier';
import type {
  CommandFlags,
  GeneratorReadmeOptions,
  PackgeJsonInfo,
  ReactAPI,
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
import capitalize from 'lodash/capitalize';
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
const tableCell = (value: string | StaticPhrasingContent): TableCell => ({
  type: 'tableCell',
  children: [typeof value === 'string' ? text(value) : value],
});
const parseMarkdownFragmentToAST = (filePath: string) => {
  const fragmentFile = toVfile.readSync(filePath);
  const fragmentAST = unified()
    .use(markdown)
    .use(stringify, stringfyOptions)
    .use(mdx)
    .parse(fragmentFile) as Root;

  return fragmentAST.children;
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
    tableCell('Values'),
    tableCell('Default'),
    tableCell('Description'),
  ]);

  const tableBody = Object.entries(reactAPI.props).map(
    ([propName, propInfo]) => {
      let propType: string;
      let propDefaultValue: string = '';
      switch (propInfo.type.name) {
        case 'arrayOf':
          const arrayValue = propInfo.type.value as {
            name: string;
            value?: unknown;
          };
          switch (arrayValue.name) {
            case 'shape':
              const arrayShapeValue = arrayValue.value as {
                [name: string]: { name: string };
              };
              propType = Object.entries(arrayShapeValue)
                .map(
                  ([arrayShapePropName, arrayShapePropValue]) =>
                    `{ ${arrayShapePropName}: ${arrayShapePropValue.name} }[]`
                )
                .join('\n');
              break;
            default:
              propType = `${arrayValue.name}[]`;
              break;
          }
          break;
        case 'enum':
          propType = propInfo.type.name;
          propDefaultValue = (propInfo.type.value as { value: string }[])
            .map((enumValue) => enumValue.value)
            .join(', ');
          break;
        default:
          propType = propInfo.type.value
            ? String(propInfo.type.value)
            : propInfo.type.name;
      }

      return tableRow([
        tableCell(inlineCode(propName)),
        tableCell(inlineCode(propType)),
        tableCell(propInfo.required ? '✅' : ''),
        tableCell(propDefaultValue ? inlineCode(propDefaultValue) : ''),
        tableCell(
          propInfo.defaultValue ? inlineCode(propInfo.defaultValue.value) : ''
        ),
        tableCell(propInfo.description),
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
    readme: parsedPackageJson.readme,
    peerDependencies: parsedPackageJson.peerDependencies,
  };

  const paths = {
    componentPath: path.join(
      options.packagePath,
      packageJsonInfo.readme.componentPath
    ),
    description: path.join(options.packagePath, 'docs/description.md'),
    usageExample: path.join(options.packagePath, 'docs/usage-example.js'),
    properties: path.join(options.packagePath, 'docs/properties.md'),
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
      heading(1, capitalize(camelcase(path.basename(options.packagePath)))),
      // The description is what's defined in the package.json
      heading(2, 'Description'),
      ...(fs.existsSync(paths.description)
        ? parseMarkdownFragmentToAST(paths.description)
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
        ? parseMarkdownFragmentToAST(paths.additionalInfo)
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

export async function generate(packagePath: string, flags: CommandFlags) {
  const options: GeneratorReadmeOptions = {
    packagePath,
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
