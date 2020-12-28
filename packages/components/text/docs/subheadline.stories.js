import React from 'react';
import { Subheadline } from '../src/text';

export default {
  title: 'Components/Text/Subheadline',
  component: Subheadline,
};

const Template = (args) => <Subheadline {...args} />;

export const H4 = Template.bind({});
H4.args = {
  as: 'h4',
  title: 'Subheadline H4',
  children: 'Subheadline H4',
};

export const H5 = Template.bind({});
H5.args = {
  as: 'h5',
  title: 'Subheadline H5',
  children: 'Subheadline H5',
};
