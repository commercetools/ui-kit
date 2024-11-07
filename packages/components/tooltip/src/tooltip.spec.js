import merge from 'lodash/merge';
import { Component, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '../../../../test/test-utils';
import Tooltip from './tooltip';

const waitForTimeout = (timeout) => {
  const now = Date.now();
  return waitFor(() => {
    if (Date.now() - now < timeout) {
      throw new Error('Still waiting for the timeout');
    }
  });
};

const openAndValidateTooltip = async ({
  triggerElement,
  eventType,
  onOpenCallback,
}) => {
  const options = merge(
    {
      eventType: 'focus',
    },
    {
      triggerElement,
      eventType,
      onOpenCallback,
    }
  );
  // Let's focus the button to trigger the tooltip
  fireEvent[options.eventType](options.triggerElement);

  // First we need to wait for the tooltip to be visible
  // after the 'showAfter' delay
  await screen.findByText('What kind of bear is best?');

  // Now we can verify the callbacks
  expect(onOpenCallback).toHaveBeenCalled();

  // Should remove the title
  expect(triggerElement).toHaveProperty('title', '');
};

const closeAndValidateTooltip = async ({
  eventType,
  triggerElement,
  closeAfter,
  exitCallbacks,
} = {}) => {
  const options = merge(
    {
      eventType: 'blur',
      exitCallbacks: [],
    },
    {
      eventType,
      triggerElement,
      closeAfter,
      exitCallbacks,
    }
  );

  // Move away from the trigger element
  fireEvent[options.eventType](options.triggerElement);

  // We need to wait for the tooltip to be removed
  // after the 'closeAfter' delay
  await waitForTimeout(options.closeAfter);

  // We need to fake trigger the animation we use to hide the tooltip
  fireEvent.animationEnd(screen.getByTestId('tooltip-message-wrapper'));

  // should call the exit callbacks
  options.exitCallbacks.forEach((callback) => {
    expect(callback).toHaveBeenCalled();
  });

  // should hide tooltip
  expect(
    screen.queryByText('What kind of bear is best?')
  ).not.toBeInTheDocument();
  // should add the title again
  expect(options.triggerElement).toHaveProperty(
    'title',
    'What kind of bear is best?'
  );
};

const Portal = (props) => {
  const domNode = document.querySelector('#portal-id');
  return ReactDOM.createPortal(props.children, domNode);
};

class TestComponent extends Component {
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
    showAfter: PropTypes.number,
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
    showAfter: 10,
    closeAfter: 10,
  };

  state = {
    open: this.props.isOpen,
  };

  toggleTooltip = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    return (
      <>
        <div id="portal-id" />
        <div id="main">
          <Tooltip
            title={this.props.title}
            onClose={this.props.onClose}
            off={this.props.off}
            onOpen={this.props.onOpen}
            isOpen={this.state.open}
            id={this.props.id}
            showAfter={this.props.showAfter}
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
      </>
    );
  }
}

describe('Tooltip', () => {
  it('should render children', () => {
    render(<TestComponent />);
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('should set title on button', () => {
    render(<TestComponent />);
    const button = screen.getByText('Submit');
    expect(button).toHaveProperty('title', 'What kind of bear is best?');
  });

  it('should set aria-describedby on button when open', async () => {
    const { container } = render(
      <TestComponent id="my-tooltip" isOpen={true} />
    );

    await waitFor(() =>
      expect(
        container.querySelector("[aria-describedby='my-tooltip']")
      ).toBeInTheDocument()
    );
  });

  it('should not set aria-describedby on button when not open', () => {
    const { container } = render(
      <TestComponent id="my-tooltip" isOpen={false} />
    );
    expect(
      container.querySelector("[aria-describedby='my-tooltip']")
    ).not.toBeInTheDocument();
  });

  describe('interacting with mouse', () => {
    it('should show tooltip', async () => {
      const onMouseOver = jest.fn();
      const onMouseLeave = jest.fn();
      const onClose = jest.fn();
      const onOpen = jest.fn();
      const showAfter = 10;
      const closeAfter = 10;

      render(
        <TestComponent
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClose={onClose}
          onOpen={onOpen}
          showAfter={showAfter}
          closeAfter={closeAfter}
        />
      );

      // Get the tooltip triggering element
      const button = await screen.findByText('Submit');

      await openAndValidateTooltip({
        eventType: 'mouseOver',
        triggerElement: button,
        onOpenCallback: onOpen,
      });

      await closeAndValidateTooltip({
        eventType: 'mouseLeave',
        triggerElement: button,
        closeAfter,
        exitCallbacks: [onMouseLeave, onClose],
      });
    });
  });
  describe('interacting with keyboard', () => {
    it('should show tooltip', async () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const onClose = jest.fn();
      const onOpen = jest.fn();
      const showAfter = 10;
      const closeAfter = 10;

      render(
        <TestComponent
          onClose={onClose}
          onOpen={onOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          showAfter={showAfter}
          closeAfter={closeAfter}
        />
      );

      // Get the tooltip triggering element
      const button = await screen.findByText('Submit');

      await openAndValidateTooltip({
        eventType: 'focus',
        triggerElement: button,
        onOpenCallback: onOpen,
      });

      await closeAndValidateTooltip({
        eventType: 'blur',
        triggerElement: button,
        closeAfter,
        exitCallbacks: [onBlur, onClose],
      });
    });
  });

  describe('when controlled with open prop', () => {
    it('should open and close based on open prop', async () => {
      render(<TestComponent isOpen={false} />);

      const toggleButton = screen.getByLabelText('Toggle tooltip');
      // tooltip should be hidden
      expect(
        screen.queryByText('What kind of bear is best?')
      ).not.toBeInTheDocument();
      toggleButton.click();
      // should show the tooltip
      await screen.findByText('What kind of bear is best?');
      toggleButton.click();
      // tooltip should be hidden
      expect(
        screen.queryByText('What kind of bear is best?')
      ).not.toBeInTheDocument();
    });
  });
});

const TooltipWrapper = forwardRef((props, ref) => (
  <div
    data-testid="tooltip-custom-wrapper"
    ref={ref}
    style={{ display: 'block' }}
    {...props}
  >
    {props.children}
  </div>
));

TooltipWrapper.displayName = 'TooltipWrapper';

TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const BodyComponent = (props) => (
  <div data-testid="tooltip-custom-body">{props.children}</div>
);

BodyComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('when used with a custom body component', () => {
  it('should render custom body and interact with keyboard', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const showAfter = 10;
    const closeAfter = 10;

    const { container } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        showAfter={showAfter}
        closeAfter={closeAfter}
        components={{ BodyComponent }}
      />
    );

    // get the tooltip triggering element
    const button = screen.getByText('Submit');

    await openAndValidateTooltip({
      eventType: 'focus',
      triggerElement: button,
      onOpenCallback: onOpen,
    });

    // Validate the custom tooltip body is rendered
    await waitFor(() =>
      container.querySelector("[data-testid='tooltip-custom-body']")
    );

    await closeAndValidateTooltip({
      eventType: 'blur',
      triggerElement: button,
      closeAfter,
      exitCallbacks: [onBlur, onClose],
    });

    // Validate the custom tooltip body is not in the document anymore
    expect(screen.queryByTestId('tooltip-custom-body')).not.toBeInTheDocument();
  });
});

describe('when used with a custom wrapper component', () => {
  it('should render custom wrapper and interact with keyboard', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const showAfter = 10;
    const closeAfter = 10;

    const { container } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        showAfter={showAfter}
        closeAfter={closeAfter}
        components={{ WrapperComponent: TooltipWrapper }}
      />
    );

    // should render the custom WrapperComponent
    expect(
      container.querySelector("[data-testid='tooltip-custom-wrapper']")
    ).toBeInTheDocument();

    // Get the tooltip triggering element
    const button = screen.getByText('Submit');

    await openAndValidateTooltip({
      eventType: 'focus',
      triggerElement: button,
      onOpenCallback: onOpen,
    });

    await closeAndValidateTooltip({
      eventType: 'blur',
      triggerElement: button,
      closeAfter,
      exitCallbacks: [onBlur, onClose],
    });
  });
});

describe('when used with a custom popper wrapper component', () => {
  it('should render tooltip inside custom popper wrapper and interact with keyboard', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const showAfter = 10;
    const closeAfter = 10;

    const { container } = render(
      <TestComponent
        onClose={onClose}
        onOpen={onOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        showAfter={showAfter}
        closeAfter={closeAfter}
        components={{
          BodyComponent,
          TooltipWrapperComponent: Portal,
        }}
      />
    );

    // Get the tooltip triggering element
    const button = screen.getByText('Submit');

    await openAndValidateTooltip({
      eventType: 'focus',
      triggerElement: button,
      onOpenCallback: onOpen,
    });

    // should not render the tooltip inside of the main div
    const mainContainer = await waitFor(() => container.querySelector('#main'));
    expect(
      mainContainer.querySelector("[data-testid='tooltip-custom-body']")
    ).not.toBeInTheDocument();

    // should render the tooltip inside of the portal
    const portalContainer = container.querySelector('#portal-id');
    expect(
      portalContainer.querySelector("[data-testid='tooltip-custom-body']")
    ).toBeInTheDocument();

    await closeAndValidateTooltip({
      eventType: 'blur',
      triggerElement: button,
      closeAfter,
      exitCallbacks: [onBlur, onClose],
    });
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
    render(
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

    const button = screen.getByText('Submit');
    fireEvent.focus(button);
    // should not call callbacks when using keyboard
    expect(onFocus).not.toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();

    // should not be visible
    expect(
      screen.queryByText('What kind of bear is best?')
    ).not.toBeInTheDocument();
    // should not have title
    expect(button).not.toHaveAttribute('title');

    fireEvent.blur(button);

    expect(onBlur).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    // should not call callbacks when using mouse

    fireEvent.mouseOver(button);

    expect(onMouseOver).not.toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();

    // should not be visible
    expect(
      screen.queryByText('What kind of bear is best?')
    ).not.toBeInTheDocument();
    // should not have title
    expect(button).not.toHaveAttribute('title');

    fireEvent.mouseLeave(button);

    expect(onMouseLeave).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
