import { createRef } from 'react';
import { warning } from '@commercetools-uikit/utils';
import { screen, render } from '../../../../../test/test-utils';
import AccessibleButton from './accessible-button';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const createTestProps = (custom) => ({
  label: 'test-button',
  onClick: jest.fn(),
  children: <div />,
  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    render(<AccessibleButton {...props} />);
    expect(screen.getByLabelText('test-button')).toBeInTheDocument();
    expect(screen.getByLabelText('test-button')).toBeEnabled();
  });
  it('should apply the className "foo" to the button', () => {
    render(<AccessibleButton {...props} className="foo" />);
    expect(screen.getByLabelText('test-button')).toHaveClass('foo');
  });
  it('should pass a ref', () => {
    const ref = createRef();
    const { container } = render(<AccessibleButton {...props} ref={ref} />);
    expect(container).toContainElement(ref.current);
  });
  it('should be marked as "disabled"', () => {
    const onClick = jest.fn();
    render(<AccessibleButton {...props} onClick={onClick} isDisabled={true} />);
    const button = screen.getByLabelText('test-button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });
  it('should be marked as "active"', () => {
    render(
      <AccessibleButton {...props} isToggleButton={true} isToggled={true} />
    );
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  it('should pass data attributes', () => {
    render(<AccessibleButton {...props} data-testid="accessible-button" />);
    expect(screen.getByTestId('accessible-button')).toBeInTheDocument();
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      render(<AccessibleButton {...props} />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'button'
      );
    });
    it('should render a button of type "submit"', () => {
      render(<AccessibleButton {...props} type="submit" />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'submit'
      );
    });
    it('should render a button of type "reset"', () => {
      render(<AccessibleButton {...props} type="reset" />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'reset'
      );
    });
  });
  describe('warnings', () => {
    describe('when using both `type` and `as` props', () => {
      it('should warn', () => {
        render(
          <AccessibleButton {...props} onClick={null} as="div" type="submit" />
        );
        expect(warning).toHaveBeenCalledWith(
          false,
          'ui-kit/AccessibleButton: "type" does not have any effect when "as" is set.'
        );
      });
    });
  });
  describe('rendering as a div', () => {
    it('should render a div element with accessibility attributes', () => {
      render(<AccessibleButton {...props} as="div" />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'role',
        'button'
      );
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'tabindex',
        '0'
      );
    });
    it('should render a div element with accessibility attributes when disabled', () => {
      render(<AccessibleButton {...props} as="div" isDisabled={true} />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'role',
        'button'
      );
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'tabindex',
        '0'
      );
    });
  });
});
