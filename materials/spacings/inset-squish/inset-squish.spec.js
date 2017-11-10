import React from 'react';
import { shallow } from 'enzyme';
import InsetSquish from './inset-squish';

describe('rendering', () => {
  describe('by default', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <InsetSquish>
          <div />
        </InsetSquish>
      );
    });

    it('should output correc tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply `m` as the scale class name', () => {
      expect(wrapper).toHaveClassName('m');
    });

    it('should render `children`', () => {
      expect(wrapper.children()).toBeDefined();
    });
  });

  describe('with `scale`', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = { scale: 'l' };
      wrapper = shallow(
        <InsetSquish {...props}>
          <div />
        </InsetSquish>
      );
    });

    it('should output correc tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `scale` class name', () => {
      expect(wrapper).toHaveClassName(props.scale);
    });
  });
});
