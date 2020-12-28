import React from 'react';
import Avatar from '../src';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const storyProps = {
  firstName: 'John',
  lastName: 'Snow',
  gravatarHash: '111',
};

const Template = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 's',
  ...storyProps,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'm',
  ...storyProps,
};

export const Large = Template.bind({});
Large.args = {
  size: 'l',
  ...storyProps,
};
