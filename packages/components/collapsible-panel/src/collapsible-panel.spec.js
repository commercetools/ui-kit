import PropTypes from 'prop-types';
import { screen, render } from '../../../../test/test-utils';
import CollapsiblePanel from './collapsible-panel';

const HeaderControls = (props) => (
  <div onClick={props.onClick}>Header Controls</div>
);

HeaderControls.propTypes = {
  onClick: PropTypes.func,
};

it('should smoke', () => {
  render(<CollapsiblePanel header="Header">Children</CollapsiblePanel>);
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Children')).toBeInTheDocument();
});

describe('header controls', () => {
  describe('when passed header controls without an onClick', () => {
    it('should not call onToggle when headerControls is clicked', () => {
      const onToggle = jest.fn();
      render(
        <CollapsiblePanel
          header="Header"
          onToggle={onToggle}
          headerControls={<HeaderControls />}
          className="foo"
          isClosed={true}
        >
          Children
        </CollapsiblePanel>
      );
      screen.getByText('Header Controls').click();
      expect(onToggle).not.toHaveBeenCalled();
    });
  });
  describe('when passed header controls with an onClick', () => {
    it('should not call onToggle when headerControls is clicked', () => {
      const onToggle = jest.fn();
      render(
        <CollapsiblePanel
          header="Header"
          onToggle={onToggle}
          headerControls={<HeaderControls onClick={() => {}} />}
          className="foo"
          isClosed={true}
        >
          Children
        </CollapsiblePanel>
      );
      screen.getByText('Header Controls').click();
      expect(onToggle).not.toHaveBeenCalled();
    });
  });
});

// We really shouldn't be accepting arbitrary class-names
it('should apply custom container className', () => {
  const { container } = render(
    <CollapsiblePanel header="Header" className="foo">
      Children
    </CollapsiblePanel>
  );
  expect(container.querySelector('.foo')).toBeInTheDocument();
});

describe('when isDefaultClosed and isClosed are passed', () => {
  /* eslint-disable no-console */
  let log;
  beforeEach(() => {
    log = console.error;
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = log;
  });
  it('should throw error', () => {
    expect(() =>
      render(
        <CollapsiblePanel
          header="Header"
          isClosed={true}
          isDefaultClosed={false}
          onToggle={() => {}}
        >
          Children
        </CollapsiblePanel>
      )
    ).toThrowError(/Invalid prop `isDefaultClosed` supplied to (.*)/);
  });
});

describe('when onToggle is provided without isClosed', () => {
  /* eslint-disable no-console */
  let log;
  beforeEach(() => {
    log = console.error;
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = log;
  });
  it('should warn', () => {
    expect(() =>
      render(
        <CollapsiblePanel header="Header" onToggle={() => {}}>
          Children
        </CollapsiblePanel>
      )
    ).toThrowError(/Invalid prop `onToggle` supplied to (.*)/);
  });
});

it('should call "onToggle" when header is clicked', () => {
  const onToggle = jest.fn();
  render(
    <CollapsiblePanel header="Header" onToggle={onToggle} isClosed={false}>
      Children
    </CollapsiblePanel>
  );
  screen.getByText('Header').click();
  expect(onToggle).toHaveBeenCalledTimes(1);
});

it('should not call "onToggle" when header is clicked while disabled', () => {
  const onToggle = jest.fn();
  render(
    <CollapsiblePanel
      header="Header"
      onToggle={onToggle}
      isClosed={false}
      isDisabled={true}
    >
      Children
    </CollapsiblePanel>
  );
  screen.getByText('Header').click();
  expect(onToggle).not.toHaveBeenCalled();
});

it('should forward data-attributes', () => {
  const { container } = render(
    <CollapsiblePanel header="Header" data-foo="bar">
      Children
    </CollapsiblePanel>
  );

  expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
});

describe('getPanelContentId', () => {
  it('should return a string containing the given id', () => {
    const panelContentId = CollapsiblePanel.getPanelContentId('example');

    expect(panelContentId).toEqual(expect.stringContaining('example'));
  });
});

describe('aria attributes', () => {
  const renderPanel = (props) => {
    const { container } = render(
      <CollapsiblePanel
        id="example"
        header="Header"
        onToggle={jest.fn()}
        {...props}
      >
        Children
      </CollapsiblePanel>
    );
    const getPanelHeader = () => screen.getByRole('button');

    const panelContentId = CollapsiblePanel.getPanelContentId(
      props.id || 'example'
    );
    const getPanelContent = () =>
      container.querySelector(`[id=${panelContentId}]`);

    return {
      getPanelHeader,
      getPanelContent,
    };
  };
  it('should have a valid aria-controls correspondence', () => {
    const { getPanelHeader, getPanelContent } = renderPanel({
      id: 'test-id',
      isClosed: false,
    });

    const panelContentId = CollapsiblePanel.getPanelContentId('test-id');

    // assert that the header button has the aria attribute
    const headerButton = getPanelHeader();
    expect(headerButton).toHaveAttribute('aria-controls', panelContentId);

    // find the correspondent panel content
    expect(getPanelContent()).toBeInTheDocument();
  });
  describe('header', () => {
    it('should have aria-expanded true when panel is open', () => {
      const { getPanelHeader } = renderPanel({ isClosed: false });

      const headerButton = getPanelHeader();
      expect(headerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded false when panel is closed', () => {
      const { getPanelHeader } = renderPanel({ isClosed: true });

      const headerButton = getPanelHeader();
      expect(headerButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('content', () => {
    it('should have aria-hidden true when panel is closed', () => {
      const { getPanelContent } = renderPanel({ isClosed: true });

      const panelContent = getPanelContent();

      expect(panelContent).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-hidden false when panel is open', () => {
      const { getPanelContent } = renderPanel({ isClosed: false });

      const panelContent = getPanelContent();

      expect(panelContent).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
