import type { Meta, StoryObj } from '@storybook/react';
import InlineSvg from './inline-svg';

const meta: Meta<typeof InlineSvg> = {
  title: 'Text & Media/Icons/InlineSvg',
  component: InlineSvg,
};
export default meta;

type Story = StoryObj<typeof InlineSvg>;

/**
 * Renders arbitrary SVG markup as "Icon".
 *
 * Simply pass the `<svg ../>` markup as string via the `data` property to the <InlineSvg/> component.
 * The markup will be [sanititzed](https://github.com/cure53/DOMPurify) (to prevent insertion of malicious
 * content) and then rendered as a React element.
 */
export const BasicExample: Story = {
  args: {
    data: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13.7324356,13 C13.3866262,13.5978014 12.7402824,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.2597176 10.4021986,10.6133738 11,10.2675644 L11,7 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,10.2675644 C13.303628,10.4432037 13.5567963,10.696372 13.7324356,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L13.7324356,13 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"/></svg>`,
    size: '40',
    color: 'solid',
  },
};
