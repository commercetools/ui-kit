import React from 'react';
import { shallow } from 'enzyme';
import Horizontal from './horizontal';

describe('rendering', () => {
  describe('by default', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Horizontal>
          <div />
        </Horizontal>
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply `constraintScale` as the horizontalConstraint class name', () => {
      expect(wrapper).toHaveClassName('constraintScale');
    });

    it('should render `children`', () => {
      expect(wrapper.children()).toBeDefined();
    });
  });

  describe('with `constraint`', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = { constraint: 'xl' };
      wrapper = shallow(
        <Horizontal {...props}>
          <div />
        </Horizontal>
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `constraintXl` class name', () => {
      expect(wrapper).toHaveClassName('constraintXl');
    });
  });
});
