import React from 'react';
import { shallow } from 'enzyme';
import Constraint from './constraint';

describe('rendering', () => {
  describe('by default', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Constraint>
          <div />
        </Constraint>
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

  describe('with `horizontalConstraint`', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = { horizontalConstraint: 'xl' };
      wrapper = shallow(
        <Constraint {...props}>
          <div />
        </Constraint>
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
