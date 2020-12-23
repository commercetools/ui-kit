import React from 'react';
import { ErrorMessage } from '../src';

export default {
  title: 'Components/Messages/ErrorMessage',
  component: ErrorMessage,
};

const Template = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Required text missing',
};
