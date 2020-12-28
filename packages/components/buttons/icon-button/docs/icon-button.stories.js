import React from 'react';
import { action } from '@storybook/addon-actions';
import * as icons from '@commercetools-uikit/icons';
import IconButton from '../src';

const iconNames = Object.keys(icons);

export default {
  title: 'Components/Buttons/IconButton',
  component: IconButton,
  argTypes: {
    icon: { control: { type: 'select', options: iconNames } },
  },
};

const Template = (args) => {
  const { icon, ...rest } = args;
  const selectedIcon = React.createElement(icons[icon || iconNames[0]]);
  return <IconButton icon={selectedIcon} {...rest} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Click me',
  onClick: action('clicked'),
};
