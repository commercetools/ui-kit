import React from 'react';
import { action } from '@storybook/addon-actions';
import { CollapsiblePanel } from '../src';

export default {
  title: 'Components/Collapsibles/CollapsiblePanel',
  component: CollapsiblePanel,
  subcomponents: { CollapsiblePanelHeader: CollapsiblePanel.Header },
};

const headerTitle = 'Lorem ipsum';
const children =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.';

const Template = (args) => (
  <CollapsiblePanel
    {...args}
    header={
      args.condensed ? (
        args.header
      ) : (
        <CollapsiblePanel.Header>{args.header}</CollapsiblePanel.Header>
      )
    }
  />
);

export const Default = Template.bind({});
Default.args = {
  header: headerTitle,
  children,
};
export const Condensed = Template.bind({});
Condensed.args = {
  header: headerTitle,
  condensed: true,
  children,
};
export const Disabled = Template.bind({});
Disabled.args = {
  header: headerTitle,
  isDisabled: true,
  children,
};
export const Closed = Template.bind({});
Closed.args = {
  header: headerTitle,
  isClosed: true,
  children,
  onToggle: action('toggled'),
};
export const Urgent = Template.bind({});
Urgent.args = {
  header: headerTitle,
  tone: 'urgent',
  children,
};
export const WithSecondaryHeader = Template.bind({});
WithSecondaryHeader.args = {
  header: headerTitle,
  secondaryHeader: 'The secondary header',
  children,
};
export const WithDescription = Template.bind({});
WithDescription.args = {
  header: headerTitle,
  description: 'The description text',
  children,
};
export const WithHeaderControls = Template.bind({});
WithHeaderControls.args = {
  header: headerTitle,
  headerControls: <button>{'A fake button'}</button>,
  children,
};
export const WithHiddenExpansionControls = Template.bind({});
WithHiddenExpansionControls.args = {
  header: headerTitle,
  hideExpansionControls: true,
  children,
};
