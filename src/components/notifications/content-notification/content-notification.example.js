import React from 'react';
import { ContentNotification } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/content-notification';

export const component = () => (
  <Suite>
    <Spec label="when type is error">
      <ContentNotification type="error">A Notification</ContentNotification>
    </Spec>
    <Spec label="when type is info">
      <ContentNotification type="info">A Notification</ContentNotification>
    </Spec>
    <Spec label="when type is warning">
      <ContentNotification type="warning">A Notification</ContentNotification>
    </Spec>
    <Spec label="when type is success">
      <ContentNotification type="success">A Notification</ContentNotification>
    </Spec>
  </Suite>
);
