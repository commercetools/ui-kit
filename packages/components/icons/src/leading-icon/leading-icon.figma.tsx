// @ts-nocheck
import { LeadingIcon } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  LeadingIcon,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=4834%3A44841',
  {
    props: {
      // TODO: Map props here
      children: figma.children('*'),
    },
    example: (props) => <LeadingIcon>{props.children}</LeadingIcon>,
  }
);
