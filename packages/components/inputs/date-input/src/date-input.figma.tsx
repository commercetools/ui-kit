// @ts-nocheck
import { DateInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  DateInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=261%3A24083',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <DateInput>{props.children}</DateInput>,
  }
);
