// @ts-nocheck
import { TextInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  TextInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=107%3A18819',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <TextInput>{props.children}</TextInput>,
  }
);
