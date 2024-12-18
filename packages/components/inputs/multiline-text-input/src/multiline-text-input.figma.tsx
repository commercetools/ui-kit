// @ts-nocheck
import { MultilineTextInput } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  MultilineTextInput,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=3771%3A12409',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => (
      <MultilineTextInput>{props.children}</MultilineTextInput>
    ),
  }
);
