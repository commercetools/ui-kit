import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '../../test-utils';
import Tooltip from './tooltip';

jest.mock('popper.js');
jest.useFakeTimers();

const Portal = props => {
  const domNode = document.querySelector('#portal-id');
  return ReactDOM.createPortal(props.children, domNode);
};

class TestComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    off: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    closeAfter: PropTypes.number,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    components: PropTypes.shape({
      TooltipWrapperComponent: PropTypes.any,
      BodyComponent: PropTypes.any,
      WrapperComponent: PropTypes.any,
    }),
  };

  static defaultProps = {
    title: 'What kind of bear is best?',
    buttonLabel: 'Submit',
  };

  state = {
    open: this.props.isOpen,
  };

  toggleTooltip = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div id="portal-id" />
        <div id="main">
          <Tooltip
            title={this.props.title}
            onClose={this.props.onClose}
            off={this.props.off}
            onOpen={this.props.onOpen}
            isOpen={this.state.open}
            id={this.props.id}
            closeAfter={this.props.closeAfter}
            components={this.props.components}
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
          <button
            id="toggleButton"
            type="button"
            onClick={this.toggleTooltip}
          />
        </div>
      </React.Fragment>
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
    const { container } = render(
      <TestComponent id="my-tooltip" isOpen={true} />
    );
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
      expect(button).toHaveProperty('title', '');
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
      expect(button).toHaveProperty('title', '');
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
          closeAfter={1000}
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
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(onClose).toHaveBeenCalled();
      // should hide tooltip again
      expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
    });
  });
  describe('when controlled with open prop', () => {
    it('should open and close based on open prop', () => {
      const { queryByText, getByText, getByLabelText } = render(
        <TestComponent isOpen={false} />
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

const TooltipWrapper = React.forwardRef((props, ref) => (
  <div
    data-testid="tooltip-custom-wrapper"
    ref={ref}
    style={{ display: 'block' }}
    {...props}
  >
    {props.children}
  </div>
));

TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const BodyComponent = props => (
  <div data-testid="tooltip-custom-body">{props.children}</div>
);

BodyComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('when used with a custom body component', () => {
  it('should render custom body and interact with keyboard', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const { container, queryByText, getByText } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        components={{ BodyComponent }}
      />
    );

    const button = getByText('Submit');
    fireEvent.focus(button);
    // should call callbacks
    expect(onFocus).toHaveBeenCalled();
    expect(onOpen).toHaveBeenCalled();
    // should show the tooltip and show the custom body
    expect(
      container.querySelector("[data-testid='tooltip-custom-body']")
    ).toBeInTheDocument();

    expect(getByText('What kind of bear is best?')).toBeInTheDocument();
    // should remove the title
    expect(button).toHaveProperty('title', '');
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

describe('when used with a custom wrapper component', () => {
  it('should render custom wrapper and interact with keyboard', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const { container, queryByText, getByText } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        components={{ WrapperComponent: TooltipWrapper }}
      />
    );

    // should render the custom WrapperComponent
    expect(
      container.querySelector("[data-testid='tooltip-custom-wrapper']")
    ).toBeInTheDocument();

    const button = getByText('Submit');
    fireEvent.focus(button);
    // should call callbacks
    expect(onFocus).toHaveBeenCalled();
    expect(onOpen).toHaveBeenCalled();
    // should show the tooltip
    expect(getByText('What kind of bear is best?')).toBeInTheDocument();
    // should remove the title
    expect(button).toHaveProperty('title', '');
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

describe('when used with a custom popper wrapper component', () => {
  it('should render tooltip inside custom popper wrapper and interact with keyboard', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const { container, queryByText, getByText } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        components={{
          BodyComponent,
          TooltipWrapperComponent: Portal,
        }}
      />
    );

    const button = getByText('Submit');
    fireEvent.focus(button);
    // should call callbacks
    expect(onFocus).toHaveBeenCalled();
    expect(onOpen).toHaveBeenCalled();

    // should not render the tooltip inside of the main div\
    const mainContainer = container.querySelector('#main');
    expect(
      mainContainer.querySelector("[data-testid='tooltip-custom-body']")
    ).not.toBeInTheDocument();

    // should render the tooltip inside of the portal
    const portalContainer = container.querySelector('#portal-id');
    expect(
      portalContainer.querySelector("[data-testid='tooltip-custom-body']")
    ).toBeInTheDocument();

    // should show the tooltip
    expect(getByText('What kind of bear is best?')).toBeInTheDocument();
    // should remove the title
    expect(button).toHaveProperty('title', '');
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

describe('when off is true', () => {
  it('should not render a tooltip and not call callbacks', () => {
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const { queryByText, getByText } = render(
      <TestComponent
        off={true}
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      />
    );

    const button = getByText('Submit');
    fireEvent.focus(button);
    // should not call callbacks when using keyboard
    expect(onFocus).not.toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();

    // should not be visible
    expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
    // should not remove title
    expect(button).toHaveProperty('title', 'What kind of bear is best?');

    fireEvent.blur(button);

    expect(onBlur).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    // should not call callbacks when using mouse

    fireEvent.mouseOver(button);

    expect(onMouseOver).not.toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();

    // should not be visible
    expect(queryByText('What kind of bear is best?')).not.toBeInTheDocument();
    // should not remove title
    expect(button).toHaveProperty('title', 'What kind of bear is best?');

    fireEvent.mouseLeave(button);

    expect(onMouseLeave).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
