import React from 'react';
import { shallow } from 'enzyme';
import Collapsible from './collapsible';

const createTestProps = customProps => ({
  isClosed: undefined,
  onToggle: undefined,
  ...customProps,
});

describe('rendering', () => {
  describe('when component is uncontrolled', () => {
    let renderCallback;
    beforeEach(() => {
      const props = createTestProps();
      renderCallback = jest.fn(() => <div />);
      shallow(<Collapsible {...props}>{renderCallback}</Collapsible>);
    });

    it('should call the render callback', () => {
      expect(renderCallback).toHaveBeenCalled();
    });

    it('should be open by default', () => {
      expect(renderCallback.mock.calls[0][0].isOpen).toBe(true);
    });

    it('toggle should be a function', () => {
      expect(typeof renderCallback.mock.calls[0][0].toggle).toBe('function');
    });

    describe('when toggled', () => {
      beforeEach(() => {
        renderCallback.mock.calls[0][0].toggle();
      });

      it('should have called the render callback again', () => {
        expect(renderCallback).toHaveBeenCalledTimes(2);
      });

      it('should close', () => {
        expect(renderCallback.mock.calls[1][0].isOpen).toBe(false);
      });
    });
  });

  describe('when component is controlled', () => {
    let renderCallback;
    beforeEach(() => {
      const props = createTestProps({
        isClosed: true,
        onToggle: jest.fn(),
      });
      renderCallback = jest.fn(() => <div />);
      shallow(<Collapsible {...props}>{renderCallback}</Collapsible>);
    });

    it('should call the render callback', () => {
      expect(renderCallback).toHaveBeenCalled();
    });

    it('should be closed based on isClosed prop', () => {
      expect(renderCallback.mock.calls[0][0].isOpen).toBe(false);
    });

    describe('when toggled', () => {
      beforeEach(() => {
        renderCallback.mock.calls[0][0].toggle();
      });

      it('should call the custom onToggle prop', () => {
        expect(renderCallback.mock.instances[0].onToggle).toHaveBeenCalled();
      });
    });
  });
});
