import React from 'react';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import Avatar from './avatar';
import { render } from '../../test-utils';

const createTestProps = customProps => ({
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

  it('should render an <img> with `src` attribute', () => {
    const { container } = render(<Avatar data-foo="bar" {...props} />);

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      'https://www.gravatar.com/avatar/20c9c1b252b46ab49d6f7a4cee9c3e68?s=100&d=blank'
    );
  });

  it('should render an <img> with `srcset` attribute', () => {
    const { container } = render(<Avatar data-foo="bar" {...props} />);

    expect(container.querySelector('img')).toHaveAttribute(
      'srcset',
      oneLineTrim`
        https://www.gravatar.com/avatar/20c9c1b252b46ab49d6f7a4cee9c3e68?s=100&d=blank 1x, 
        https://www.gravatar.com/avatar/20c9c1b252b46ab49d6f7a4cee9c3e68?s=200&d=blank 2x
      `
    );
  });
});
