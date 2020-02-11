import React from 'react';
import { render } from '../../../../../src/test-utils';
import WarningMessage from './warning-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('WarningMessage', () => {
  it('should render children', () => {
    const { container } = render(
      <WarningMessage>Some warning message</WarningMessage>
    );

    expect(container).toHaveTextContent('Some warning message');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(<WarningMessage intlMessage={intlMessage} />);
    expect(container).toHaveTextContent('Hello');
  });
});
