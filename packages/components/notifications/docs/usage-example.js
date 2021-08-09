import { ContentNotification } from '@commercetools-uikit/notifications';

export const Success = () => (
  <ContentNotification type="success">
    This is an success message
  </ContentNotification>
);
export const Info = () => (
  <ContentNotification type="info">This is an info message</ContentNotification>
);
export const Warning = () => (
  <ContentNotification type="warning">
    This is an warning message
  </ContentNotification>
);
export const Error = () => (
  <ContentNotification type="error">
    This is an error message
  </ContentNotification>
);
