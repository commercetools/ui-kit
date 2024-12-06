// @ts-nocheck
import { LoadingSpinner } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  LoadingSpinner,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=3003%3A6577',
  {
    props: {
      scale: figma.enum('Size', {
        Large: 'l',
        Small: 's',
      }),
      children: figma.children('*'),
    },
    example: (props) => (
      <LoadingSpinner scale={props.scale}>{props.children}</LoadingSpinner>
    ),
  }
);
