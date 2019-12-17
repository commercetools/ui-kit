import React from 'react';
import Collapsible from './collapsible';
import { render } from '../../../../src/test-utils';

const TestComponent = props => (
  <Collapsible {...props}>
    {options => (
      <div>
        <div data-testid="openState">{options.isOpen ? 'open' : 'closed'}</div>
        <button data-testid="toggle" onClick={options.toggle}>
          Toggle
        </button>
      </div>
    )}
  </Collapsible>
);

describe('when component is uncontrolled', () => {
  it('should be open by default', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('openState')).toHaveTextContent('open');
  });

  it('should be possible to toggle the open state', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('openState')).toHaveTextContent('open');
    getByTestId('toggle').click();
    expect(getByTestId('openState')).toHaveTextContent('closed');
  });

  it('should respect the default closed state', () => {
    const { getByTestId } = render(<TestComponent isDefaultClosed={true} />);
    expect(getByTestId('openState')).toHaveTextContent('closed');
  });
});

describe('when component is controlled', () => {
  it('should be open by default', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <TestComponent isClosed={false} onToggle={onToggle} />
    );
    expect(getByTestId('openState')).toHaveTextContent('open');
  });

  it('should be possible to toggle the open state', () => {
    const onToggle = jest.fn();
    const { getByTestId, rerender } = render(
      <TestComponent isClosed={false} onToggle={onToggle} />
    );
    expect(getByTestId('openState')).toHaveTextContent('open');
    getByTestId('toggle').click();
    expect(onToggle).toHaveBeenCalledTimes(1);
    // simulate the parent react to onToggle by changing the isClosed state
    // to true
    rerender(<TestComponent isClosed={true} onToggle={onToggle} />);
    expect(getByTestId('openState')).toHaveTextContent('closed');
  });
});
