// @ts-nocheck
import { SelectableSearchInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  SelectableSearchInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=463%3A27888',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => (
      <SelectableSearchInput>{props.children}</SelectableSearchInput>
    ),
  }
);
