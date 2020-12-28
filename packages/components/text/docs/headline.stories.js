import React from 'react';
import { Headline } from '../src/text';

export default {
  title: 'Components/Text/Headline',
  component: Headline,
};

const Template = (args) => <Headline {...args} />;

export const H1 = Template.bind({});
H1.args = {
  as: 'h1',
  title: 'Headline H1',
  children: 'Headline H1',
};

export const H2 = Template.bind({});
H2.args = {
  as: 'h2',
  title: 'Headline H2',
  children: 'Headline H2',
};

export const H3 = Template.bind({});
H3.args = {
  as: 'h3',
  title: 'Headline H3',
  children: 'Headline H3',
};
