/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { render, screen, waitFor } from '@testing-library/react';
import useMutationObserver from "./use-mutation-observer";

const TestComponent = (props) => {
  const containerRef = useRef();
  const [mutationCount, setMutationCount] = useState(0);
  useMutationObserver(
    containerRef,
    (mutationsList) => {
      setMutationCount(mutationCount + 1);
      props.observerHandler(mutationsList);
    },
    {
      childList: true,
      ...(props.mutationObserverProps || {})
    },
  );
  return (
    <div ref={containerRef} data-testid="test-container" data-mutationscount={mutationCount}>
      <main>__children placeholder__</main>
    </div>
  );
};

describe('useMutationObserver', () => {
  it('should call the observerHandler when adding a child to the observed element', async () => {
    const observerHandler = jest.fn();

    render(<TestComponent observerHandler={observerHandler} />);

    const containerElement = screen.getByTestId('test-container');
    containerElement.innerHTML = '<div>test content</div>';

    await screen.findByText('test content');
    await waitFor(() => {
      expect(containerElement.getAttribute('data-mutationscount')).toEqual('1');
    });
    expect(observerHandler).toHaveBeenCalledTimes(1);
  });

  it('should call the observerHandler when adding a garndchild to the observed element', async () => {
    const observerHandler = jest.fn();
    const mutationObserverProps = {
      subtree: true,
    };

    render(<TestComponent observerHandler={observerHandler} mutationObserverProps={mutationObserverProps} />);

    const containerElement = screen.getByTestId('test-container');
    containerElement.querySelector('main').innerHTML = '<div>test content</div>';

    await screen.findByText('test content');
    await waitFor(() => {
      expect(containerElement.getAttribute('data-mutationscount')).toEqual('1');
    });
    expect(observerHandler).toHaveBeenCalledTimes(1);
  });
});
