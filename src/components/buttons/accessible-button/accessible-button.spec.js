import React from 'react';
import { render } from '../../../test-utils';
import AccessibleButton from './accessible-button';

const createTestProps = custom => ({
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
    const { getByLabelText } = render(<AccessibleButton {...props} />);
    expect(getByLabelText('test-button')).toBeInTheDocument();
    expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
  });
  it('should apply the className "foo" to the button', () => {
    const { getByLabelText } = render(
      <AccessibleButton {...props} className="foo" />
    );
    expect(getByLabelText('test-button')).toHaveClass('foo');
  });
  it('should pass a ref', () => {
    const ref = React.createRef();
    const { container } = render(<AccessibleButton {...props} ref={ref} />);
    expect(container).toContainElement(ref.current);
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <AccessibleButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('test-button')).toHaveAttribute('disabled');
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should be marked as "active"', () => {
    const { getByLabelText } = render(
      <AccessibleButton {...props} isToggleButton={true} isToggled={true} />
    );
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<AccessibleButton {...props} />);
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <AccessibleButton {...props} type="submit" />
      );
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(
        <AccessibleButton {...props} type="reset" />
      );
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'reset');
    });
  });
});
