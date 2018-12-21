import React from 'react';
import { render } from '../../../test-utils';
import CollapsiblePanel from './collapsible-panel';

it('should smoke', () => {
  const { getByText } = render(
    <CollapsiblePanel header="Header">Children</CollapsiblePanel>
  );
  expect(getByText('Header')).toBeInTheDocument();
  expect(getByText('Children')).toBeInTheDocument();
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
        /Warning: Failed prop type: Invalid prop `onToggle` supplied to `Collapsible`\. `onToggle` does not have any effect when the component is uncontrolled\./
      )
    );
  });
  /* eslint-enable no-console */
});

it('should call "onToggle" when header is clicked', () => {
  const onToggle = jest.fn();
  const { getByText } = render(
    <CollapsiblePanel header="Header" onToggle={onToggle} isClosed={false}>
      Children
    </CollapsiblePanel>
  );
  getByText('Header').click();
  expect(onToggle).toHaveBeenCalledTimes(1);
});

it('should not call "onToggle" when header is clicked while disabled', () => {
  const onToggle = jest.fn();
  const { getByText } = render(
    <CollapsiblePanel
      header="Header"
      onToggle={onToggle}
      isClosed={false}
      isDisabled={true}
    >
      Children
    </CollapsiblePanel>
  );
  getByText('Header').click();
  expect(onToggle).not.toHaveBeenCalled();
});
