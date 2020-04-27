import React from 'react';
import { render } from '../../../../test/test-utils';
import ContentNotification from './content-notification';

describe('ContentNotification', () => {
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(
      <ContentNotification data-foo="bar" type="info">
        A message
      </ContentNotification>
    );

    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });
});
