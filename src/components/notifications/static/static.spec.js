import React from 'react';
import { render } from 'react-testing-library';
import Static from './static';

describe('Static', () => {
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(
      <Static data-foo="bar" type="info">
        A message
      </Static>
    );

    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });

  it.each(['error', 'info', 'success', 'warning'])(
    'should render notification of type `%s`',
    type => {
      const { container } = render(<Static type={type}>A message</Static>);

      expect(container).toMatchSnapshot();
    }
  );
});
