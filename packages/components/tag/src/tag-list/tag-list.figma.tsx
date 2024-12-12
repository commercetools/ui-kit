// @ts-nocheck
import { TagList } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  TagList,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=5318%3A8820',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <TagList>{props.children}</TagList>,
  }
);
