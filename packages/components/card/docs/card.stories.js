import React from 'react';
import { Card } from '../src';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;
const children =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.';

export const RaisedLight = Template.bind({});
RaisedLight.args = {
  type: 'raised',
  theme: 'light',
  children,
};
RaisedLight.storyName = 'Raised / Light';

export const RaisedDark = Template.bind({});
RaisedDark.args = {
  type: 'raised',
  theme: 'dark',
  children,
};
RaisedDark.storyName = 'Raised / Dark';

export const FlatLight = Template.bind({});
FlatLight.args = {
  type: 'flat',
  theme: 'light',
  children,
};
FlatLight.storyName = 'Flat / Light';

export const FlatDark = Template.bind({});
FlatDark.args = {
  type: 'flat',
  theme: 'dark',
  children,
};
FlatDark.storyName = 'Flat / Dark';
