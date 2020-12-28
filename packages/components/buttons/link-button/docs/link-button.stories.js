import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import * as icons from '@commercetools-uikit/icons';
import LinkButton from '../src';

const iconNames = Object.keys(icons);

export default {
  title: 'Components/Buttons/LinkButton',
  component: LinkButton,
  argTypes: {
    iconLeft: { control: { type: 'select', options: iconNames } },
  },
};

const Template = (args) => {
  const { iconLeft, ...rest } = args;
  const selectedIcon = React.createElement(icons[iconLeft || iconNames[0]]);
  return (
    <Router>
      <LinkButton iconLeft={selectedIcon} {...rest} />
    </Router>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Click me',
  to: '/foo',
  onClick: action('clicked'),
};
