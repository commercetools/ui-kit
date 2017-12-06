/* eslint-disable no-shadow */
import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleMotion from '../collapsible-motion';

const createMockNode = custom => ({
  scrollHeight: 200,
  addEventListener: () => {},
  removeEventListener: () => {},
  ...custom,
});

describe('rendering', () => {
  const renderCallback = jest.fn(() => <div />);
  const wrapper = shallow(
    <CollapsibleMotion>{renderCallback}</CollapsibleMotion>
  );

  it('should render a Collapsible component', () => {
    expect(wrapper.find('Collapsible')).toHaveLength(1);
  });

  const toggle = jest.fn();
  shallow(
    wrapper.find('Collapsible').prop('children')({
      isOpen: true,
      toggle,
    })
  );

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

  it('should propagate the toggle callback', () => {
    renderCallback.mock.calls[0][0].registerContentNode(createMockNode());
    renderCallback.mock.calls[0][0].toggle({});

    expect(toggle).toHaveBeenCalled();
  });

  it('should provide the container styles', () => {
    expect(typeof renderCallback.mock.calls[0][0].containerStyles).toBe(
      'object'
    );
  });
});

describe('toggle', () => {
  describe('is open', () => {
    const renderCallback = jest.fn(() => <div />);
    const wrapper = shallow(
      <CollapsibleMotion>{renderCallback}</CollapsibleMotion>
    );
    const toggle = jest.fn();
    const mockNode = createMockNode();

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

    it('should store (predict) that the panel is closed', () => {
      expect(wrapper.instance().isOpen).toBe(false);
    });

    it('should set the full height', () => {
      expect(wrapper.state()).toEqual({ fullHeight: 200 });
    });
  });

  describe('is not open', () => {
    const renderCallback = jest.fn(() => <div />);
    const wrapper = shallow(
      <CollapsibleMotion>{renderCallback}</CollapsibleMotion>
    );
    const toggle = jest.fn();
    const mockNode = createMockNode();
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

    it('should store (predict) that the panel is opened', () => {
      expect(wrapper.instance().isOpen).toBe(true);
    });

    it('should set the full height to 200', () => {
      console.log('wrapper.state()', wrapper.state());
      expect(wrapper.state()).toEqual({ fullHeight: 200 });
    });
  });
});
