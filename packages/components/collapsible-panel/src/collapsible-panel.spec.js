import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../../src/test-utils';
import CollapsiblePanel from './collapsible-panel';

const HeaderControls = props => (
  <div onClick={props.onClick}>Header Controls</div>
);

HeaderControls.propTypes = {
  onClick: PropTypes.func,
};

it('should smoke', () => {
  const rendered = render(
    <CollapsiblePanel header="Header">Children</CollapsiblePanel>
  );
  expect(rendered.getByText('Header')).toBeInTheDocument();
  expect(rendered.getByText('Children')).toBeInTheDocument();
});

describe('header controls', () => {
  describe('when passed header controls without an onClick', () => {
    it('should not call onToggle when headerControls is clicked', () => {
      const onToggle = jest.fn();
      const rendered = render(
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
      rendered.getByText('Header Controls').click();
      expect(onToggle).not.toHaveBeenCalled();
    });
  });
  describe('when passed header controls with an onClick', () => {
    it('should not call onToggle when headerControls is clicked', () => {
      const onToggle = jest.fn();
      const rendered = render(
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
      rendered.getByText('Header Controls').click();
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
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        /Warning: Failed prop type: Invalid prop `isDefaultClosed` supplied to `CollapsiblePanel`\. Component must either be controlled or uncontrolled. Pass either `isClosed` or `isDefaultClosed` but not both\./
      )
    );
  });
  /* eslint-enable no-console */
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
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        /Warning: Failed prop type: Invalid prop `onToggle` supplied to `CollapsiblePanel`\. `onToggle` does not have any effect when the component is uncontrolled\./
      )
    );
  });
  /* eslint-enable no-console */
});

it('should call "onToggle" when header is clicked', () => {
  const onToggle = jest.fn();
  const rendered = render(
    <CollapsiblePanel header="Header" onToggle={onToggle} isClosed={false}>
      Children
    </CollapsiblePanel>
  );
  rendered.getByText('Header').click();
  expect(onToggle).toHaveBeenCalledTimes(1);
});

it('should not call "onToggle" when header is clicked while disabled', () => {
  const onToggle = jest.fn();
  const rendered = render(
    <CollapsiblePanel
      header="Header"
      onToggle={onToggle}
      isClosed={false}
      isDisabled={true}
    >
      Children
    </CollapsiblePanel>
  );
  rendered.getByText('Header').click();
  expect(onToggle).not.toHaveBeenCalled();
});

it('should forward data-attributes ', () => {
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
  const renderPanel = props => {
    const rendered = render(
      <CollapsiblePanel
        id="example"
        header="Header"
        onToggle={jest.fn()}
        {...props}
      >
        Children
      </CollapsiblePanel>
    );
    const getPanelHeader = () =>
      rendered.container.querySelector('[role=button]');

    const panelContentId = CollapsiblePanel.getPanelContentId(
      props.id || 'example'
    );
    const getPanelContent = () =>
      rendered.container.querySelector(`[id=${panelContentId}]`);

    return {
      ...rendered,
      getPanelHeader,
      getPanelContent,
    };
  };
  it('should have a valid aria-controls correspondence', () => {
    const rendered = renderPanel({ id: 'test-id' });

    const panelContentId = CollapsiblePanel.getPanelContentId('test-id');

    // assert that the header button has the aria attribute
    const headerButton = rendered.getPanelHeader();
    expect(headerButton).toHaveAttribute('aria-controls', panelContentId);

    // find the correspondent panel content
    expect(rendered.getPanelContent()).toBeInTheDocument();
  });
  describe('header', () => {
    it('should have aria-expanded true when panel is open', () => {
      const rendered = renderPanel({ isClosed: false });

      const headerButton = rendered.getPanelHeader();
      expect(headerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded false when panel is closed', () => {
      const rendered = renderPanel({ isClosed: true });

      const headerButton = rendered.getPanelHeader();
      expect(headerButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('content', () => {
    it('should have aria-hidden true when panel is closed', () => {
      const rendered = renderPanel({ isClosed: true });

      const panelContent = rendered.getPanelContent();

      expect(panelContent).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-hidden false when panel is open', () => {
      const rendered = renderPanel({ isClosed: false });

      const panelContent = rendered.getPanelContent();

      expect(panelContent).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
