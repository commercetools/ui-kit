import type { Meta } from '@storybook/react';
import DataTableManager from './index';
import BasicExample from './stories/basic-example.stories';
import { WithCustomLayout } from './stories/custom-layout.stories';

const meta: Meta<typeof DataTableManager> = {
  title: 'components/DataTable/DataTableManager',
  component: DataTableManager,
  argTypes: {
    topBar: {
      control: 'text',
    },
    withRowSelection: {
      control: 'boolean',
    },
  },
};
export default meta;

BasicExample.args = {
  topBar: 'topBar can display arbitrary ReactNodes',
  managerTheme: 'light',
};

WithCustomLayout.args = {
  topBar: 'topBar can display arbitrary ReactNodes',
  managerTheme: 'light',
};
