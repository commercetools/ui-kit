import type { TCollapsibleProps } from './collapsible';
import Collapsible from './collapsible';
import { screen, render, fireEvent } from '../../../../test/test-utils';

const TestComponent = (props: Omit<TCollapsibleProps, 'children'>) => (
  <Collapsible {...props}>
    {(options) => (
      <div>
        <div data-testid="openState">{options.isOpen ? 'open' : 'closed'}</div>
        <button
          data-testid="toggle"
          onClick={() => {
            if (options.toggle) {
              options.toggle();
            }
          }}
        >
          Toggle
        </button>
      </div>
    )}
  </Collapsible>
);

describe('when component is uncontrolled', () => {
  it('should be open by default', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('openState')).toHaveTextContent('open');
  });

  it('should be possible to toggle the open state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('openState')).toHaveTextContent('open');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('openState')).toHaveTextContent('closed');
  });

  it('should respect the default closed state', () => {
    render(<TestComponent isDefaultClosed={true} />);
    expect(screen.getByTestId('openState')).toHaveTextContent('closed');
  });
});

describe('when component is controlled', () => {
  it('should be open by default', () => {
    const onToggle = jest.fn();
    render(<TestComponent isClosed={false} onToggle={onToggle} />);
    expect(screen.getByTestId('openState')).toHaveTextContent('open');
  });

  it('should be possible to toggle the open state', () => {
    const onToggle = jest.fn();
    const { rerender } = render(
      <TestComponent isClosed={false} onToggle={onToggle} />
    );
    expect(screen.getByTestId('openState')).toHaveTextContent('open');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    // simulate the parent react to onToggle by changing the isClosed state
    // to true
    rerender(<TestComponent isClosed={true} onToggle={onToggle} />);
    expect(screen.getByTestId('openState')).toHaveTextContent('closed');
  });
});
