// @ts-nocheck
import { Pagination } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  Pagination,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=0%3A4542',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <Pagination>{props.children}</Pagination>,
  }
);
