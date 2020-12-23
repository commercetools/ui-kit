import React from 'react';
import { Avatar } from '../src';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const Template = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 's',
  firstName: 'John',
  lastName: 'Snow',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'm',
  firstName: 'John',
  lastName: 'Snow',
};

export const Large = Template.bind({});
Large.args = {
  size: 'l',
  firstName: 'John',
  lastName: 'Snow',
};
