import { screen, render, fireEvent } from '../../../../test/test-utils';
import Link from './link';

const createTestProps = (custom) => ({
  to: 'https://mc.ct-test.com/',
  ...custom,
});

const intlMessage = { id: 'link', defaultMessage: 'Link' };

describe('rendering', () => {
  let props;
  describe('when rendering a default (react-router) link', () => {
    beforeEach(() => {
      props = createTestProps();
    });
    it('should render a react router link', () => {
      render(<Link {...props}>Link</Link>);
      const link = screen.getByText('Link');
      expect(link).toBeInTheDocument();
    });
    it('should call "onClick" when link is clicked', () => {
      const onClickMock = jest.fn();
      const linkProps = { ...props, onClick: onClickMock };
      render(<Link {...linkProps}>Link</Link>);
      fireEvent.click(screen.getByText('Link'));
      expect(onClickMock).toHaveBeenCalled();
    });
  });
  describe('when rendering an external link', () => {
    beforeEach(() => {
      props = createTestProps({
        isExternal: true,
        isFoo: 'bar',
      });
    });
    it('should render a native link', () => {
      render(<Link {...props}>Link</Link>);
      const link = screen.getByText('Link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveProperty('href', props.to);
    });
    it('should call "onClick" when link is clicked', () => {
      const onClickMock = jest.fn();
      const linkProps = { ...props, onClick: onClickMock };
      render(<Link {...linkProps}>Link</Link>);
      fireEvent.click(screen.getByText('Link'));
      expect(onClickMock).toHaveBeenCalled();
    });
  });
  describe('when rendering a translated link', () => {
    beforeEach(() => {
      props = createTestProps({
        isExternal: true,
        intlMessage,
      });
    });
    it('should render link with react-intl', () => {
      render(<Link {...props} />);
      const link = screen.getByText('Link');
      expect(link).toBeInTheDocument();
    });
  });
});
