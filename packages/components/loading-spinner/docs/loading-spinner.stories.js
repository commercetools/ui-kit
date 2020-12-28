import React from 'react';
import LoadingSpinner from '../src';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
};

const Template = (args) => <LoadingSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
