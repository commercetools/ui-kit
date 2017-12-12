/* eslint-disable no-shadow */
import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleMotion from '../collapsible-motion';

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
  beforeEach(() => {
    renderCallback = jest.fn(() => <div />);
    wrapper = shallow(<CollapsibleMotion>{renderCallback}</CollapsibleMotion>);
    toggle = jest.fn();
    shallow(
      wrapper.find('Collapsible').prop('children')({
        isOpen: true,
        toggle,
      })
    );
  });

  it('should render a Collapsible component', () => {
    expect(wrapper).toRender('Collapsible');
  });

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

  describe('when toggled', () => {
    beforeEach(() => {
      renderCallback.mock.calls[0][0].registerContentNode(createMockNode());
      renderCallback.mock.calls[0][0].toggle({});
    });
    it('should propagate the toggle callback', () => {
      expect(toggle).toHaveBeenCalled();
    });

    describe('is open', () => {
      let renderCallback;
      let wrapper;
      let toggle;
      let mockNode;
      beforeEach(() => {
        renderCallback = jest.fn(() => <div />);
        wrapper = shallow(
          <CollapsibleMotion>{renderCallback}</CollapsibleMotion>
        );
        toggle = jest.fn();
        mockNode = createMockNode();
        shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: true,
            toggle,
          })
        );

        // simulate ref callback calling
        renderCallback.mock.calls[0][0].registerContentNode(mockNode);
        // simulate triggering the toggle
        renderCallback.mock.calls[0][0].toggle();
      });

      it('should store (predict) that the panel is closed', () => {
        expect(wrapper.instance().isOpen).toBe(false);
      });

      it('should set the full height', () => {
        expect(wrapper.state()).toEqual({ fullHeight: 200 });
      });
    });

    describe('is not open', () => {
      let renderCallback;
      let wrapper;
      let toggle;
      let mockNode;
      beforeEach(() => {
        renderCallback = jest.fn(() => <div />);
        wrapper = shallow(
          <CollapsibleMotion>{renderCallback}</CollapsibleMotion>
        );
        toggle = jest.fn();
        mockNode = createMockNode();
        shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: false,
            toggle,
          })
        );

        // simulate ref callback calling
        renderCallback.mock.calls[0][0].registerContentNode(mockNode);
        // simulate triggering the toggle
        renderCallback.mock.calls[0][0].toggle();
      });

      it('should store (predict) that the panel is opened', () => {
        expect(wrapper.instance().isOpen).toBe(true);
      });

      it('should set the full height to 200', () => {
        expect(wrapper.state()).toEqual({ fullHeight: 200 });
      });
    });
  });
});
