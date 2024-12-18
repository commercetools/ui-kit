// @ts-nocheck
import { ViewSwitcher } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  ViewSwitcher,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=158%3A18378',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <ViewSwitcher>{props.children}</ViewSwitcher>,
  }
);
