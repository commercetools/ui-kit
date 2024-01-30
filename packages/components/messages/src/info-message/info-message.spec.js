import { screen, render } from '../../../../../test/test-utils';
import InfoMessage from './info-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('InfoMessage', () => {
  it('should render children', () => {
    render(<InfoMessage>Some info message</InfoMessage>);

    expect(screen.getByText('Some info message')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<InfoMessage intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
