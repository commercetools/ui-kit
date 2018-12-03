/* eslint-disable no-shadow */
import React from 'react';
import { render, fireEvent } from '../../test-utils';
import CollapsibleMotion from './collapsible-motion';

describe('uncontrolled mode', () => {
  it('should toggle when clicked', async () => {
    const renderProp = jest.fn(
      ({ isOpen, toggle, containerClassName, registerContentNode }) => (
        <div>
          <button data-testid="button" onClick={toggle}>
            {isOpen ? 'Close' : 'Open'}
          </button>
          <div data-testid="container-node" className={containerClassName}>
            <div data-testid="content-node" ref={registerContentNode}>
              Content
            </div>
          </div>
        </div>
      )
    );

    const { getByTestId } = render(
      <CollapsibleMotion>{renderProp}</CollapsibleMotion>
    );

    expect(getByTestId('content-node')).toBeVisible();
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        // no animation here because the panel is already expanded
        containerClassName: expect.any(String),
      })
    );

    // hide the content
    fireEvent.click(getByTestId('button'));

    // ensure the container gets hidden
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        containerClassName: expect.any(String),
      })
    );

    // show the content
    fireEvent.click(getByTestId('button'));

    // ensure the container gets shown again
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        containerClassName: expect.any(String),
      })
    );
  });
});

describe('controlled mode', () => {
  it('should toggle when clicked', async () => {
    const renderProp = jest.fn(({ containerStyles, registerContentNode }) => (
      <div data-testid="container-node" style={containerStyles}>
        <div data-testid="content-node" ref={registerContentNode}>
          Content
        </div>
      </div>
    ));

    class TestComponent extends React.Component {
      state = {
        isClosed: false,
      };
      render() {
        return (
          <div>
            <button
              data-testid="button"
              onClick={() =>
                this.setState(prevState => ({ isClosed: !prevState.isClosed }))
              }
            >
              Toggle
            </button>
            <CollapsibleMotion
              isClosed={this.state.isClosed}
              onToggle={() => {}}
            >
              {renderProp}
            </CollapsibleMotion>
          </div>
        );
      }
    }

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('content-node')).toBeVisible();
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        // no animation here because the panel is already expanded
        containerClassName: expect.any(String),
      })
    );

    // hide the content
    fireEvent.click(getByTestId('button'));

    // ensure the container gets hidden
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        containerClassName: expect.any(String),
      })
    );

    // show the content
    fireEvent.click(getByTestId('button'));

    // ensure the container gets shown again
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        containerClassName: expect.any(String),
      })
    );
  });
});
