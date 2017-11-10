import React from 'react';
import { shallow } from 'enzyme';
import Inline from './inline';

describe('rendering', () => {
  describe('by default', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Inline>
          <div />
        </Inline>
      );
    });

    it('should output correc tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply `s` as the scale class name', () => {
      expect(wrapper).toHaveClassName('s');
    });

    it('should apply `flexStart` as the scale class name', () => {
      expect(wrapper).toHaveClassName('flexStart');
    });

    it('should render `children`', () => {
      expect(wrapper.children()).toBeDefined();
    });
  });

  describe('with `scale`', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = { scale: 'xl' };
      wrapper = shallow(
        <Inline {...props}>
          <div />
        </Inline>
      );
    });

    it('should output correc tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `scale` class name', () => {
      expect(wrapper).toHaveClassName(props.scale);
    });
  });

  describe('with `alignItems`', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = { alignItems: 'flexEnd' };
      wrapper = shallow(
        <Inline {...props}>
          <div />
        </Inline>
      );
    });

    it('should output correc tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `alignItems` class name', () => {
      expect(wrapper).toHaveClassName(props.alignItems);
    });
  });
});
