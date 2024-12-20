// @ts-nocheck
import { LocalizedMoneyInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  LocalizedMoneyInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=463%3A27181',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => (
      <LocalizedMoneyInput>{props.children}</LocalizedMoneyInput>
    ),
  }
);
