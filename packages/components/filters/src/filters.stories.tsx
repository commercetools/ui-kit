import type { Meta, StoryFn } from '@storybook/react';
import Filters from './filters';
import Footer from './filter-menu/footer/footer';
import { PrimaryButton } from '@commercetools-uikit/buttons';

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  // tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof Filters>;

export const BasicExample: Story = () => {
  return <Filters label={'test'} />;
};
