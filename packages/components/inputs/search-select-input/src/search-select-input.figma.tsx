// @ts-nocheck
import { SearchSelectInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  SearchSelectInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=463%3A27389',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <SearchSelectInput>{props.children}</SearchSelectInput>,
  }
);
