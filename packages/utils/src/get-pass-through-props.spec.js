import getPassThroughProps from './get-pass-through-props';

describe('getPassThroughProps', () => {
  it('filters out component props', () => {
    const props = {
      isDisabled: true,
      to: {
        a: 1,
        b: 2,
      },
      'aria-label': 'help us obi wan',
      href: 'asdf',
    };
    const componentProps = ['isDisabled', 'to'];

    expect(getPassThroughProps(props, componentProps)).toEqual({
      'aria-label': 'help us obi wan',
      href: 'asdf',
    });
  });
});
