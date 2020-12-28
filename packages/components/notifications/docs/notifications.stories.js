import React from 'react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import ContentNotification from '../src';

export default {
  title: 'Components/Notifications/ContentNotification',
  component: ContentNotification,
};

const TemplateAll = (args) => (
  <SpacingsStack>
    <ContentNotification {...args} type="success" />
    <ContentNotification {...args} type="info" />
    <ContentNotification {...args} type="warning" />
    <ContentNotification {...args} type="error" />
  </SpacingsStack>
);
const Template = (args) => <ContentNotification {...args} />;

export const Default = TemplateAll.bind({});
Default.args = {
  children: 'The notification message',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  children: 'The notification message',
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  children: 'The notification message',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  children: 'The notification message',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  children: 'The notification message',
};
