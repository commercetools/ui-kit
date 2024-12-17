// @ts-nocheck
import { TimeInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  TimeInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=307%3A23474',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <TimeInput>{props.children}</TimeInput>,
  }
);
