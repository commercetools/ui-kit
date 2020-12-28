import React from 'react';
import { action } from '@storybook/addon-actions';
import * as icons from '@commercetools-uikit/icons';
import PrimaryButton from '../src';

const iconNames = Object.keys(icons);

export default {
  title: 'Components/Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    iconLeft: { control: { type: 'select', options: iconNames } },
  },
};

const Template = (args) => {
  const { iconLeft, ...rest } = args;
  const selectedIcon = React.createElement(icons[iconLeft || iconNames[0]]);
  return <PrimaryButton iconLeft={selectedIcon} {...rest} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Click me',
  onClick: action('clicked'),
};
