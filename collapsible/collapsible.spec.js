import React from 'react';
import { shallow } from 'enzyme';
import Collapsible from './collapsible';

describe('rendering', () => {
  const renderCallback = jest.fn(() => <div />);
  shallow(<Collapsible>{renderCallback}</Collapsible>);

  it('should call the render callback', () => {
    expect(renderCallback).toHaveBeenCalled();
  });

  it('should be open by default', () => {
    expect(renderCallback.mock.calls[0][0].isOpen).toBe(true);
  });

  it('should be a function', () => {
    expect(typeof renderCallback.mock.calls[0][0].toggle).toBe('function');
  });

  it('should have called the render callback again', () => {
    renderCallback.mock.calls[0][0].toggle();
    expect(renderCallback).toHaveBeenCalledTimes(2);
  });

  it('should be closed', () => {
    expect(renderCallback.mock.calls[1][0].isOpen).toBe(false);
  });
});

describe('pass initial state', () => {
  const renderCallback = jest.fn(() => <div />);
  const wrapper = shallow(
    <Collapsible isDefaultClosed={true}>{renderCallback}</Collapsible>
  );

  it('initial state is based on given prop', () => {
    expect(wrapper.state('isOpen')).toBe(false);
  });

  it('state does not get updated from props once component is mounted', () => {
    wrapper.setProps({
      isDefaultClosed: false,
    });

    expect(wrapper.state('isOpen')).toBe(false);
  });
});
