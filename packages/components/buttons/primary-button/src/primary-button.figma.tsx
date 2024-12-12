// @ts-nocheck
import { PrimaryButton } from '@commercetools-frontend/ui-kit';
import figma from '@figma/code-connect';

figma.connect(
  PrimaryButton,
  'https://www.figma.com/design/UoqmtHSHwxvEZRcbsM4A3Z/CT-product-design-system?node-id=84%3A17637',
  {
    props: {
      // TODO: Add the following props
      // No matching props could be found for these Figma properties:
      // "rightIcon": figma.boolean('Right icon'),
      // "rightIcon": figma.instance('↳ right icon'),
      // "text": figma.string('Text'),
      // "leftIcon": figma.instance('↳ left icon'),
      // "leftIcon": figma.boolean('Left icon'),
      // "state": figma.enum('State', {
      //   "Default": "default",
      //   "Hover": "hover",
      //   "Toggled": "toggled",
      //   "Disabled": "disabled"
      // }),
      // "size": figma.enum('Size', {
      //   "big": "big",
      //   "medium": "medium"
      // }),
      // "tone": figma.enum('Tone', {
      //   "Primary": "primary",
      //   "Urgent": "urgent",
      //   "Critical": "critical"
      // })
      children: figma.children('*'),
    },
    example: (props) => <PrimaryButton>{props.children}</PrimaryButton>,
  }
);
