// @ts-nocheck
import { DataTable } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect/react';

figma.connect(
  DataTable,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=3530%3A10064',
  {
    props: {
      // TODO: Map props here - this file links to the UI Kit 'Sample DataTable' in Figma
      children: figma.children('*'),
    },
    example: (props) => <DataTable>{props.children}</DataTable>,
  }
);
