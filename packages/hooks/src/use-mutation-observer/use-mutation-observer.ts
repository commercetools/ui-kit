// NOTE: This React hook is essentially the same as the [@react-hook/intersection-observer](https://www.npmjs.com/package/@react-hook/intersection-observer)
// except for the usage of `MutationObserver` instead of `IntersectionObserver`.
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import rafSchd from 'raf-schd';

export type TUseMutationObserverCallback = (
  mutationsList: MutationRecord[],
  observer: MutationObserver
) => void;

const useLatest = <T>(current: T) => {
  const storedValue = useRef(current);
  useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

function createMutationObserver(
  containerRef: MutableRefObject<HTMLElement>,
  options?: MutationObserverInit & { parentTargetSelector?: string }
) {
  const callbacks = new Map<Node, TUseMutationObserverCallback[]>();
  const observer = new MutationObserver(
    rafSchd((mutationsList, observer) => {
      const mutationsByTarget = mutationsList.reduce<
        Map<Node, MutationRecord[]>
      >((_mutationsByTarget, mutation) => {
        const callbacksForTarget =
          _mutationsByTarget.get(mutation.target) ?? [];
        callbacksForTarget.push(mutation);
        _mutationsByTarget.set(mutation.target, callbacksForTarget);
        return _mutationsByTarget;
      }, new Map());

      mutationsByTarget.forEach((mutations, target) => {
        let targetCallbacks = callbacks.get(target);

        // If we're observing the subtree we need to check whether the mutated
        // element is a child of the target
        if (!targetCallbacks && options?.subtree && containerRef.current) {
          if (containerRef.current.contains(target)) {
            targetCallbacks = callbacks.get(containerRef.current);
          }
        }

        targetCallbacks?.forEach((cb) => cb(mutations, observer));
      });
    })
  );

  return {
    observer,
    subscribe(
      target: HTMLElement,
      callback: TUseMutationObserverCallback,
      options?: MutationObserverInit
    ) {
      observer.observe(target, options);
      const targetCallbacks = callbacks.get(target) ?? [];
      targetCallbacks.push(callback);
      callbacks.set(target, targetCallbacks);
    },
    unsubscribe(target: HTMLElement, callback: TUseMutationObserverCallback) {
      const targetCallbacks = callbacks.get(target) ?? [];
      if (targetCallbacks.length === 1) {
        observer.disconnect();
        callbacks.delete(target);
        return;
      }
      const tcIndex = targetCallbacks.indexOf(callback);
      if (tcIndex !== -1) targetCallbacks.splice(tcIndex, 1);
      callbacks.set(target, targetCallbacks);
    },
  };
}

function useMutationObserver<T extends HTMLElement = HTMLElement>(
  target: MutableRefObject<T>,
  callback: TUseMutationObserverCallback,
  options?: MutationObserverInit
): MutationObserver {
  const mutationObserver = createMutationObserver(target, options);
  const storedCallback = useLatest(callback);
  const storedOptions = useLatest(options);

  useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target && 'current' in target ? target.current : target;
    if (!targetEl) return () => {};

    function cb(mutationsList: MutationRecord[], observer: MutationObserver) {
      if (didUnsubscribe) return;
      storedCallback.current(mutationsList, observer);
    }

    mutationObserver.subscribe(
      targetEl as HTMLElement,
      cb,
      storedOptions.current
    );

    return () => {
      didUnsubscribe = true;
      mutationObserver.unsubscribe(targetEl as HTMLElement, cb);
    };
  }, [target, mutationObserver, storedCallback, storedOptions]);

  return mutationObserver.observer;
}

export default useMutationObserver;
