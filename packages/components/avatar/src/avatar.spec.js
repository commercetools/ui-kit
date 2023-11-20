import Avatar from './avatar';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render, screen } from '../../../../test/test-utils';

const createTestProps = (customProps) => ({
  firstName: '',
  lastName: '',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  isHighlighted: false,
  size: 'l',
  color: 'accent',
  icon: <PlusBoldIcon data-testid="icon" />,
  ...customProps,
});

describe('Avatar', () => {
  const props = createTestProps();
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(<Avatar data-foo="bar" {...props} />);

    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });
  it('should render icon', () => {
    render(<Avatar {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
