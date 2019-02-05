import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../test-utils';
import Tooltip from './tooltip';

jest.useFakeTimers();

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

class TestComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    open: PropTypes.bool,
    id: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    leaveDelay: PropTypes.number,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };
  static defaultProps = {
    title: 'What kind of bear is best?',
    buttonLabel: 'Submit',
  };

  state = {
    open: this.props.open,
  };

  toggleTooltip = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    return (
      <div>
        <Tooltip
          title={this.props.title}
          onClose={this.props.onClose}
          onOpen={this.props.onOpen}
          open={this.state.open}
          id={this.props.id}
          leaveDelay={this.props.leaveDelay}
        >
          <button
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onMouseOver={this.props.onMouseOver}
            onMouseLeave={this.props.onMouseLeave}
          >
            {this.props.buttonLabel}
          </button>
        </Tooltip>
        <label htmlFor="toggleButton">Toggle tooltip</label>
        <button id="toggleButton" type="button" onClick={this.toggleTooltip} />
      </div>
    );
  }
}

describe('Tooltip', () => {
  it('should render children', () => {
    const { getByText } = render(<TestComponent />);
    const button = getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('should set title on button', () => {
    const { getByText } = render(<TestComponent />);
    const button = getByText('Submit');
    expect(button).toHaveProperty('title', 'What kind of bear is best?');
  });

  it('should set aria-describedby on button when open', () => {
    const { container } = render(<TestComponent id="my-tooltip" open={true} />);
    expect(
      container.querySelector("[aria-describedby='my-tooltip']")
    ).toBeInTheDocument();
  });

  describe('interacting with mouse', () => {
    it('should show tooltip', () => {
      const onMouseOver = jest.fn();
      const onMouseLeave = jest.fn();
      const onClose = jest.fn();
      const onOpen = jest.fn();

      const { getByText, queryByText } = render(
        <TestComponent
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClose={onClose}
          onOpen={onOpen}
        />
      );

      const button = getByText('Submit');
      fireEvent.mouseOver(button);
      // should call callbacks
      expect(onMouseOver).toHaveBeenCalled();
      expect(onOpen).toHaveBeenCalled();
      // should show the tooltip
      expect(getByText('What kind of bear is best?')).toBeInTheDocument();
      // should remove the title
      expect(button).not.toHaveProperty('title');
      fireEvent.mouseLeave(button);
      // should call callbacks
      expect(onMouseLeave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      // should hide tooltip
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
      // should add the title again
      expect(button).toHaveProperty('title', 'What kind of bear is best?');
    });
  });
  describe('interacting with keyboard', () => {
    it('should show tooltip', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const onClose = jest.fn();
      const onOpen = jest.fn();
      const { queryByText, getByText } = render(
        <TestComponent
          onClose={onClose}
          onOpen={onOpen}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );
      const button = getByText('Submit');
      fireEvent.focus(button);
      // should call callbacks
      expect(onFocus).toHaveBeenCalled();
      expect(onOpen).toHaveBeenCalled();
      // should show the tooltip
      expect(getByText('What kind of bear is best?')).toBeInTheDocument();
      // should remove the title
      expect(button).not.toHaveProperty('title');
      fireEvent.blur(button);
      // should call callbacks
      expect(onBlur).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      // should hide tooltip
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
      // should add the title again
      expect(button).toHaveProperty('title', 'What kind of bear is best?');
    });
  });
  describe('with leave delay', () => {
    it('should show tooltip for duration of delay', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const onOpen = jest.fn();
      const onClose = jest.fn();

      const { queryByText, getByText } = render(
        <TestComponent
          onClose={onClose}
          onOpen={onOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          leaveDelay={1000}
        />
      );

      const button = getByText('Submit');
      fireEvent.focus(button);
      // should call callbacks
      expect(onFocus).toHaveBeenCalled();
      expect(onOpen).toHaveBeenCalled();
      // should show the tooltip
      expect(getByText('What kind of bear is best?')).toBeInTheDocument();
      fireEvent.blur(button);
      // should call callback
      expect(onBlur).toHaveBeenCalled();
      // should not call onClose
      expect(onClose).not.toHaveBeenCalled();
      // after delay
      jest.advanceTimersByTime(1000);
      expect(onClose).toHaveBeenCalled();
      // should hide tooltip again
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
    });
  });
  describe('when controlled with open prop', () => {
    it('should open and close based on open prop', () => {
      const { queryByText, getByText, getByLabelText } = render(
        <TestComponent open={false} />
      );

      const toggleButton = getByLabelText('Toggle tooltip');
      // tooltip should be hidden
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
      toggleButton.click();
      // should show the tooltip
      expect(getByText('What kind of bear is best?')).toBeInTheDocument();
      toggleButton.click();
      // tooltip should be hidden
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
    });
  });
});
