import { screen, render } from '../../../../../test/test-utils';
import AdditionalInfoMessage from './additional-info-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('AdditionalInfoMessage', () => {
  it('should render children', () => {
    render(<AdditionalInfoMessage>Some info message</AdditionalInfoMessage>);

    expect(screen.getByText('Some info message')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<AdditionalInfoMessage intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
