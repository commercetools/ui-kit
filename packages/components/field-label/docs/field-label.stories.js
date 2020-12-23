import React from 'react';
import { action } from '@storybook/addon-actions';
import * as icons from '@commercetools-uikit/icons';
import { FieldLabel } from '../src';

const iconNames = Object.keys(icons);

export default {
  title: 'Components/FieldLabel',
  component: FieldLabel,
  argTypes: {
    hintIcon: { control: { type: 'select', options: iconNames } },
  },
};

const Template = (args) => <FieldLabel {...args} />;
const TemplateDark = (args) => (
  <div style={{ backgroundColor: 'black' }}>
    <FieldLabel {...args} />
  </div>
);
const TemplateWithIcon = (args) => {
  const { hintIcon, ...rest } = args;
  const selectedIcon = React.createElement(icons[hintIcon || iconNames[0]]);
  return <FieldLabel hintIcon={selectedIcon} {...rest} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'First name',
  onInfoButtonClick: undefined,
};
export const Required = Template.bind({});
Required.args = {
  title: 'First name',
  hasRequiredIndicator: true,
  onInfoButtonClick: undefined,
};
export const Primary = Template.bind({});
Primary.args = {
  title: 'First name',
  tone: 'primary',
  onInfoButtonClick: undefined,
};
export const Inverted = TemplateDark.bind({});
Inverted.args = {
  title: 'First name',
  tone: 'inverted',
  onInfoButtonClick: undefined,
};
export const WithInfoIcon = Template.bind({});
WithInfoIcon.args = {
  title: 'First name',
  onInfoButtonClick: action('info icon clicked'),
};
export const WithBadge = Template.bind({});
WithBadge.args = {
  title: 'First name',
  badge: 'This is a badge',
  horizontalConstraint: 4,
};
export const WithHint = TemplateWithIcon.bind({});
WithHint.args = {
  title: 'First name',
  hint: 'This is a hint',
};
