// @ts-nocheck
import { PrimaryActionDropdown } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  PrimaryActionDropdown,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=1040%3A35979',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => (
      <PrimaryActionDropdown>{props.children}</PrimaryActionDropdown>
    ),
  }
);
