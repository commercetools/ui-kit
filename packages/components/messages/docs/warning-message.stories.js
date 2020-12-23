import React from 'react';
import { WarningMessage } from '../src';

export default {
  title: 'Components/Messages/Warning',
  component: WarningMessage,
};

const Template = (args) => <WarningMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This name is already being used by another variant',
};
