import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { Tag } from '../src';

export default {
  title: 'Components/Tag',
  component: Tag,
};

const text = 'This is a tag';

const Template = (args) => (
  <Router>
    <Tag
      {...args}
      onClick={args.onClick ? action('clicked') : undefined}
      onRemove={args.onRemove ? action('removed') : undefined}
    />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  horizontalConstraint: 4,
  children: text,
};
export const Disabled = Template.bind({});
Disabled.args = {
  horizontalConstraint: 4,
  isDisabled: true,
  children: text,
};
