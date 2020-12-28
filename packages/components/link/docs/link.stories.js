import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from '../src';

export default {
  title: 'Components/Link',
  component: Link,
};

const Template = (args) => (
  <Router>
    <Link {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  to: '/',
  children: 'Click me',
};
export const NoUnderline = Template.bind({});
NoUnderline.args = {
  to: '/',
  children: 'Click me',
  hasUnderline: false,
};
export const External = Template.bind({});
External.args = {
  to: 'https://docs.commercetools.com',
  children: 'Click me',
  isExternal: true,
};
