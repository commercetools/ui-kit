import { screen, render } from '../../../../../test/test-utils';
import WarningMessage from './warning-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('WarningMessage', () => {
  it('should render children', () => {
    render(<WarningMessage>Some warning message</WarningMessage>);

    expect(screen.getByText('Some warning message')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<WarningMessage intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
