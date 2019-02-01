import React from 'react';
import { render, fireEvent } from '../../test-utils';
import Tooltip from './tooltip';

// copy pasta from https://github.com/FezVrasta/popper.js/issues/478
jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ];

      constructor() {
        return {
          destroy: () => {},
          scheduleUpdate: () => {},
        };
      }
    }
);

describe('Tooltip', () => {
  it('should render children and label', () => {
    const { getByText } = render(
      <Tooltip title="What kind of bear is best?">
        <button>Click me!</button>
      </Tooltip>
    );
    expect(getByText('Click me!')).toBeInTheDocument();
    expect(getByText('What kind of bear is best?')).toBeInTheDocument();
  });

  describe('interacting', () => {
    it('should call onMouseOver and onMouseLeave', () => {
      const onMouseOver = jest.fn();
      const onMouseLeave = jest.fn();
      const { getByText } = render(
        <Tooltip title="What kind of bear is best?">
          <button onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            Submit
          </button>
        </Tooltip>
      );

      fireEvent.mouseOver(getByText('Submit'));
      expect(onMouseOver).toHaveBeenCalled();
      fireEvent.mouseLeave(getByText('Submit'));
      expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should call onFocus and onBlur', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const { getByText } = render(
        <Tooltip title="What kind of bear is best?">
          <button onBlur={onBlur} onFocus={onFocus}>
            Submit
          </button>
        </Tooltip>
      );

      fireEvent.focus(getByText('Submit'));
      expect(onFocus).toHaveBeenCalled();
      fireEvent.blur(getByText('Submit'));
      expect(onBlur).toHaveBeenCalled();
    });
  });
});
