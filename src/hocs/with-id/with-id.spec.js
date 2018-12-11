import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../test-utils';
import withId from './with-id';

const createComponent = () => {
  const ComponentWithId = withId('my-prefix-')(props => (
    <div data-testid={props['data-testid']} id={props.id} />
  ));
  ComponentWithId.propTypes = { id: PropTypes.string };
  return ComponentWithId;
};

// We need to create a fresh component for every test to ensure that the
// sequential ids are predictable.
let Component;
beforeEach(() => {
  Component = createComponent();
});

describe('when an id is provided', () => {
  it('should forward the provided id', () => {
    const { getByTestId } = render(
      <Component id="foo" data-testid="component" />
    );
    expect(getByTestId('component')).toHaveAttribute('id', 'foo');
  });
});

describe('when no id is provided', () => {
  it('should create an id with the provided prefix', () => {
    const { getByTestId } = render(<Component data-testid="component" />);
    expect(getByTestId('component')).toHaveAttribute('id', 'my-prefix-1');
  });
});

describe('when the component is rendered multiple times', () => {
  it('should use a different id for each component', () => {
    const { getByTestId } = render(
      <div>
        <Component data-testid="component1" />
        <Component data-testid="component2" />
      </div>
    );
    expect(getByTestId('component1')).toHaveAttribute('id', 'my-prefix-1');
    expect(getByTestId('component2')).toHaveAttribute('id', 'my-prefix-2');
  });
});
