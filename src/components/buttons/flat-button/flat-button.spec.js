import React from 'react';
import { render } from '../../../test-utils';
import { PlusThinIcon } from '../../icons';
import FlatButton from './flat-button';

const createTestProps = props => ({
  tone: 'primary',
  label: 'Add',
  onClick: jest.fn(),
  icon: <PlusThinIcon size="medium" data-testid="icon" />,
  isDisabled: false,
  // HOC
  isMouseOver: false,
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    const { getByLabelText } = render(<FlatButton {...props} />);
    expect(getByLabelText('Add')).toBeInTheDocument();
    expect(getByLabelText('Add')).not.toHaveAttribute('disabled');
  });
  it('should pass events', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
      <FlatButton {...props} onFocus={onFocus} />
    );
    getByLabelText('Add').focus();
    expect(onFocus).toHaveBeenCalled();
  });
  it('should pass aria attributes"', () => {
    const { getByLabelText } = render(
      <FlatButton {...props} isDisabled={true} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <FlatButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('disabled');
    expect(getByLabelText('Add')).toHaveAttribute('aria-disabled', 'true');
  });
  it('should render icon', () => {
    const { getByTestId } = render(<FlatButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should render label', () => {
    const { getByLabelText } = render(<FlatButton {...props} />);
    expect(getByLabelText('Add').querySelector('p')).toHaveTextContent('Add');
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<FlatButton {...props} />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <FlatButton {...props} type="submit" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(<FlatButton {...props} type="reset" />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
});
