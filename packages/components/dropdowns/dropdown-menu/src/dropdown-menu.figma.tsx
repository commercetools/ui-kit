// @ts-nocheck
import { DropdownMenu } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

// REQUIRED: supply node id for the figma component
figma.connect(
  DropdownMenu,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=5322%3A3674',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <DropdownMenu>{props.children}</DropdownMenu>,
  }
);
