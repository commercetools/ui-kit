// @ts-nocheck
import { Card } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  Card,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=107%3A18713',
  {
    props: {
      // These props were automatically mapped based on your linked code:
      type: figma.enum('Type', {
        Raised: 'raised',
        Flat: 'flat',
      }),
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      children: figma.children('*'),
    },
    example: (props) => (
      <Card type={props.type} theme={props.theme}>
        {props.children}
      </Card>
    ),
  }
);
