import React from 'react';
import Avatar from './avatar';
import { render } from '../../../../src/test-utils';

const createTestProps = (customProps) => ({
  firstName: '',
  lastName: '',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  isHighlighted: false,
  size: 'l',
  ...customProps,
});

describe('Avatar', () => {
  const props = createTestProps();
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(<Avatar data-foo="bar" {...props} />);

    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });
});
