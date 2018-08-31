/* eslint-disable no-shadow */
import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleMotion, { ToggleAnimation } from './collapsible-motion';

const createMockNode = custom => ({
  clientHeight: 200,
  addEventListener: () => {},
  removeEventListener: () => {},
  ...custom,
});

describe('rendering', () => {
  let wrapper;
  let renderCallback;
  let toggle;
  let toggleAnimationWrapper;
  beforeEach(() => {
    renderCallback = jest.fn(() => <div />);
    wrapper = shallow(<CollapsibleMotion>{renderCallback}</CollapsibleMotion>);
    toggle = jest.fn();
    toggleAnimationWrapper = shallow(
      <div>
        {wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle,
        })}
      </div>
    );
    shallow(
      <div>
        {toggleAnimationWrapper.find('ToggleAnimation').prop('children')({
          isOpen: true,
          toggle,
          registerContentNode: jest.fn(),
        })}
      </div>
    );
  });

  it('should render a Collapsible component', () => {
    expect(wrapper).toRender('Collapsible');
  });

  describe('Collapsible render callback', () => {
    it('should render a ToggleAnimation component', () => {
      expect(toggleAnimationWrapper).toRender('ToggleAnimation');
    });
  });

  describe('ToggleAnimation render callback', () => {
    it('should call the render callback', () => {
      expect(renderCallback).toHaveBeenCalled();
    });

    it('should propagate the isOpen state', () => {
      expect(renderCallback.mock.calls[0][0].isOpen).toBe(true);
    });

    it('should provide a callback to register the content node', () => {
      expect(typeof renderCallback.mock.calls[0][0].registerContentNode).toBe(
        'function'
      );
    });

    it('should provide the container styles', () => {
      expect(typeof renderCallback.mock.calls[0][0].containerStyles).toBe(
        'object'
      );
    });
  });
});

describe('ToggleAnimation', () => {
  let renderCallback;
  let props;
  let wrapper;
  const createTestProps = custom => ({
    toggle: jest.fn(),
    isOpen: true,
    ...custom,
  });
  beforeEach(() => {
    renderCallback = jest.fn();
    props = createTestProps();
    wrapper = shallow(
      <ToggleAnimation {...props}>{renderCallback}</ToggleAnimation>
    );
  });
  describe('when toggled', () => {
    beforeEach(() => {
      renderCallback.mock.calls[0][0].registerContentNode(createMockNode());
      wrapper.instance().handleToggle();
    });
    it('should propagate the toggle callback', () => {
      expect(props.toggle).toHaveBeenCalled();
    });

    describe('is open', () => {
      it('should set the full height', () => {
        expect(wrapper.instance().fullHeight).toBe(200);
      });
    });

    describe('is not open', () => {
      beforeEach(() => {
        renderCallback = jest.fn();
        props = createTestProps({ isOpen: false });
        wrapper = shallow(
          <ToggleAnimation {...props}>{renderCallback}</ToggleAnimation>
        );
        renderCallback.mock.calls[0][0].registerContentNode(createMockNode());
        wrapper.instance().handleToggle();
      });

      it('should set the full height to 200', () => {
        expect(wrapper.instance().fullHeight).toBe(200);
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    describe("when isOpen wasn't changed", () => {
      beforeEach(() => {
        wrapper.setProps({ foo: 'bar' });
      });
      it('should set no animation', () => {
        expect(wrapper.instance().animation).toBe('');
      });
    });
    describe('when isOpen was changed', () => {
      beforeEach(() => {
        wrapper.setProps({ isOpen: false });
      });
      it('should set no animation', () => {
        expect(wrapper.instance().animation).not.toBe('');
      });
    });
  });
});
