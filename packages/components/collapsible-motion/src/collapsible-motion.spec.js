/* eslint-disable no-shadow */
import React from 'react';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import CollapsibleMotion from './collapsible-motion';

describe('uncontrolled mode', () => {
  it('should toggle when clicked', async () => {
    const renderProp = jest.fn(
      ({ isOpen, toggle, containerStyles, registerContentNode }) => (
        <div>
          <button data-testid="button" onClick={toggle}>
            {isOpen ? 'Close' : 'Open'}
          </button>
          <div data-testid="container-node" style={containerStyles}>
            <div data-testid="content-node" ref={registerContentNode}>
              Content
            </div>
          </div>
        </div>
      )
    );

    render(<CollapsibleMotion>{renderProp}</CollapsibleMotion>);

    expect(screen.getByTestId('content-node')).toBeVisible();
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        // no animation here because the panel is already expanded
        containerStyles: { height: 'auto' },
      })
    );

    // hide the content
    fireEvent.click(screen.getByTestId('button'));

    // ensure the container gets hidden
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        containerStyles: {
          animation: expect.stringMatching(
            /^animation-[a-z0-9]+ 200ms forwards$/
          ),
          height: 0,
          overflow: 'hidden',
        },
      })
    );

    // show the content
    fireEvent.click(screen.getByTestId('button'));

    // ensure the container gets shown again
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        containerStyles: {
          height: 'auto',
          animation: expect.stringMatching(
            /^animation-[a-z0-9]+ 200ms forwards$/
          ),
        },
      })
    );
  });
  describe('with minHeight set', () => {
    it('should toggle when clicked', async () => {
      const renderProp = jest.fn(
        ({ isOpen, toggle, containerStyles, registerContentNode }) => (
          <div>
            <button data-testid="button" onClick={toggle}>
              {isOpen ? 'Close' : 'Open'}
            </button>
            <div data-testid="container-node" style={containerStyles}>
              <div data-testid="content-node" ref={registerContentNode}>
                Content
              </div>
            </div>
          </div>
        )
      );

      render(
        <CollapsibleMotion minHeight={50}>{renderProp}</CollapsibleMotion>
      );

      expect(screen.getByTestId('content-node')).toBeVisible();
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: true,
          // no animation here because the panel is already expanded
          containerStyles: { height: 'auto' },
        })
      );

      // hide the content
      fireEvent.click(screen.getByTestId('button'));

      // ensure the container gets hidden
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: false,
          containerStyles: {
            animation: expect.stringMatching(
              /^animation-[a-z0-9]+ 200ms forwards$/
            ),
            height: '50px',
            overflow: 'hidden',
          },
        })
      );

      // show the content
      fireEvent.click(screen.getByTestId('button'));

      // ensure the container gets shown again
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: true,
          containerStyles: {
            height: 'auto',
            animation: expect.stringMatching(
              /^animation-[a-z0-9]+ 200ms forwards$/
            ),
          },
        })
      );
    });
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
                this.setState((prevState) => ({
                  isClosed: !prevState.isClosed,
                }))
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

    render(<TestComponent />);

    expect(screen.getByTestId('content-node')).toBeVisible();
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        // no animation here because the panel is already expanded
        containerStyles: { height: 'auto' },
      })
    );

    // hide the content
    fireEvent.click(screen.getByTestId('button'));

    // ensure the container gets hidden
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        containerStyles: {
          animation: expect.stringMatching(
            /^animation-[a-z0-9]+ 200ms forwards$/
          ),
          height: 0,
          overflow: 'hidden',
        },
      })
    );

    // show the content
    fireEvent.click(screen.getByTestId('button'));

    // ensure the container gets shown again
    expect(renderProp).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        containerStyles: {
          height: 'auto',
          animation: expect.stringMatching(
            /^animation-[a-z0-9]+ 200ms forwards$/
          ),
        },
      })
    );
  });
  describe('with minHeight set', () => {
    it('should toggle when clicked', async () => {
      const renderProp = jest.fn(
        ({ isOpen, toggle, containerStyles, registerContentNode }) => (
          <div>
            <button data-testid="button" onClick={toggle}>
              {isOpen ? 'Close' : 'Open'}
            </button>
            <div data-testid="container-node" style={containerStyles}>
              <div data-testid="content-node" ref={registerContentNode}>
                Content
              </div>
            </div>
          </div>
        )
      );

      render(
        <CollapsibleMotion minHeight={50}>{renderProp}</CollapsibleMotion>
      );

      expect(screen.getByTestId('content-node')).toBeVisible();
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: true,
          // no animation here because the panel is already expanded
          containerStyles: { height: 'auto' },
        })
      );

      // hide the content
      fireEvent.click(screen.getByTestId('button'));

      // ensure the container gets hidden
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: false,
          containerStyles: {
            animation: expect.stringMatching(
              /^animation-[a-z0-9]+ 200ms forwards$/
            ),
            height: '50px',
            overflow: 'hidden',
          },
        })
      );

      // show the content
      fireEvent.click(screen.getByTestId('button'));

      // ensure the container gets shown again
      expect(renderProp).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isOpen: true,
          containerStyles: {
            height: 'auto',
            animation: expect.stringMatching(
              /^animation-[a-z0-9]+ 200ms forwards$/
            ),
          },
        })
      );
    });
  });
});
