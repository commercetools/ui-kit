import PropTypes from 'prop-types';
import { warning } from '@commercetools-uikit/utils';
import { screen, render } from '../../../../test/test-utils';
import CollapsiblePanel from './collapsible-panel';
import CollapsiblePanelHeader from './collapsible-panel-header';

const HeaderControls = (props) => (
  <div onClick={props.onClick}>Header Controls</div>
);

HeaderControls.propTypes = {
  onClick: PropTypes.func,
};

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

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
  it('should warn', () => {
    render(
      <CollapsiblePanel
        header="Header"
        isClosed={true}
        isDefaultClosed={false}
        onToggle={() => {}}
      >
        Children
      </CollapsiblePanel>
    );

    expect(warning).toHaveBeenCalledWith(
      expect.any(Boolean),
      expect.stringMatching(/Invalid prop `isDefaultClosed` supplied to (.*)/i)
    );
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
    render(
      <CollapsiblePanel header="Header" onToggle={() => {}}>
        Children
      </CollapsiblePanel>
    );
    expect(warning).toHaveBeenCalledWith(
      expect.any(Boolean),
      expect.stringMatching(/Invalid prop `onToggle` supplied to (.*)/i)
    );
  });
});

describe('condensed and when header prop has <CollapsiblePanelHeader>', () => {
  it('render a <h4>', () => {
    render(
      <CollapsiblePanel
        header={<CollapsiblePanelHeader>Header</CollapsiblePanelHeader>}
        onToggle={() => {}}
        isClosed={false}
        condensed={true}
      >
        Children
      </CollapsiblePanel>
    );
    expect(screen.getByText('Header').tagName).toEqual('H4');
  });

  it('should not render a <h> as a child of a <h>', () => {
    render(
      <CollapsiblePanel
        header={<CollapsiblePanelHeader>Header</CollapsiblePanelHeader>}
        onToggle={() => {}}
        isClosed={false}
        condensed={true}
      >
        Children
      </CollapsiblePanel>
    );
    expect(screen.getByText('Header').parentNode.tagName).not.toMatch(
      /h[1-6]/i
    );
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

describe('aria attributes', () => {
  const renderPanel = (props) => {
    const { container } = render(
      <CollapsiblePanel header="Header" onToggle={jest.fn()} {...props}>
        Children
      </CollapsiblePanel>
    );

    const panelHeader = screen.getByRole('button');
    const panelHeaderId = panelHeader.getAttribute('id');
    const panelContent = container.querySelector(
      `[aria-labelledby="${panelHeaderId}"]`
    );

    return {
      panelHeader,
      panelContent,
    };
  };
  it('should have a valid aria-controls correspondence', () => {
    const { panelHeader, panelContent } = renderPanel({
      id: 'test-id',
      isClosed: false,
    });

    // assert that the header button has the aria attribute linked to the panel content
    expect(panelHeader).toHaveAttribute(
      'aria-controls',
      panelContent.getAttribute('id')
    );
  });
  describe('header', () => {
    it('should have aria-expanded true when panel is open', () => {
      const { panelHeader } = renderPanel({ isClosed: false });

      expect(panelHeader).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded false when panel is closed', () => {
      const { panelHeader } = renderPanel({ isClosed: true });

      expect(panelHeader).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('content', () => {
    it('should have hidden attribute when panel is closed', () => {
      const { panelContent } = renderPanel({ isClosed: true });

      expect(panelContent).toHaveAttribute('hidden');
    });

    it('should not have hidden attribute when panel is open', () => {
      const { panelContent } = renderPanel({ isClosed: false });

      expect(panelContent).not.toHaveAttribute('hidden');
    });
  });
});
