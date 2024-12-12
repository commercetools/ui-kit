// @ts-nocheck
import { LinkButton } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

// REQUIRED: supply node id for the figma component
figma.connect(
  LinkButton,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=<placeholder>',
  {
    props: {
      // *This file was generated from a script*
      // TODO: manually map props here, see https://www.figma.com/code-connect-docs/react/#figmaconnect
      children: figma.children('*'),
    },
    example: (props) => <LinkButton>{props.children}</LinkButton>,
  }
);
