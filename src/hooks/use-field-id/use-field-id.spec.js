import React from 'react';
import { render } from '../../test-utils';
import createSequentialId from '../../utils/create-sequential-id';
import useToggleState from '../use-toggle-state';
import useFieldId from './use-field-id';

const sequentialId = createSequentialId('test-id-');

const TestComponent = props => {
  // eslint-disable-next-line react/prop-types
  const [isToggled, toggle] = useToggleState(false);
  // eslint-disable-next-line react/prop-types
  const id = useFieldId(props.id, sequentialId);

  return (
    <div id={id}>
      <button data-testid="toggle-btn" onClick={toggle}>
        Toggle
      </button>
      <div data-testid="test-ctn">{isToggled ? 'Foo' : 'Bar'}</div>
    </div>
  );
};

describe('when id not provided', () => {
  it('should use sequential-id and not increment on rerender', () => {
    const { container, getByTestId } = render(<TestComponent />);
    expect(container.querySelector('#test-id-1')).toBeInTheDocument();
    getByTestId('toggle-btn').click();
    expect(container.querySelector('#test-id-1')).toBeInTheDocument();
    getByTestId('toggle-btn').click();
    expect(container.querySelector('#test-id-1')).toBeInTheDocument();
  });
});

describe('when id is provided', () => {
  it('should use provided id and not change on rerender', () => {
    const { container, getByTestId } = render(<TestComponent id="foo-bar" />);
    expect(container.querySelector('#foo-bar')).toBeInTheDocument();
    getByTestId('toggle-btn').click();
    expect(container.querySelector('#foo-bar')).toBeInTheDocument();
  });
});
