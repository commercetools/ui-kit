// @ts-nocheck
import { MoneyInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  MoneyInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=453%3A26481',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <MoneyInput>{props.children}</MoneyInput>,
  }
);
