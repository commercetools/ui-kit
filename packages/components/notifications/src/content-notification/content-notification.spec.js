import { render } from '../../../../../test/test-utils';
import ContentNotification from './content-notification';

const intlMessage = {
  id: 'notification',
  defaultMessage: 'translated-notification',
};

describe('ContentNotification', () => {
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(
      <ContentNotification data-foo="bar" type="info">
        A message
      </ContentNotification>
    );

    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <ContentNotification type="warning" intlMessage={intlMessage} />
    );
    expect(container).toHaveTextContent('translated-notification');
  });
});
