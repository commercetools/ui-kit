import React from 'react';
import { render } from '../../../test-utils';
import { PlusBoldIcon } from '../../icons';
import IconButton from './icon-button';

const createTestProps = custom => ({
  type: 'button',
  label: 'test-button',
  onClick: jest.fn(),
  icon: <PlusBoldIcon data-testid="icon" />,

  // HoC
  isMouseDown: false,
  isMouseOver: false,
  handleMouseUp: jest.fn(),
  handleMouseDown: jest.fn(),
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),

  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    const { getByLabelText } = render(<IconButton {...props} />);
    expect(getByLabelText('test-button')).toBeInTheDocument();
    expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <IconButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('test-button')).toHaveAttribute('disabled');
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should render icon', () => {
    const { getByTestId } = render(<IconButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
});
