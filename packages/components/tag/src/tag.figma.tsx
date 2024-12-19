// @ts-nocheck
import { Tag } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  Tag,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=1301%3A38461',
  {
    props: {
      type: figma.enum('Type', {
        Warning: 'warning',
        Default: 'normal',
      }),
      isDraggable: figma.boolean('is draggable'),
      children: figma.children('*'),
      /**TODO: Implement `Tone` in figma and add here */
    },
    example: (props) => (
      <Tag type={props.type} isDraggable={props.isDraggable}>
        {props.children}
      </Tag>
    ),
  }
);
