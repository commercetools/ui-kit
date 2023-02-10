// NOTE: This React hook is essentially the same as the [@react-hook/intersection-observer](https://www.npmjs.com/package/@react-hook/intersection-observer)
// except for the usage of `MutationObserver` instead of `IntersectionObserver`.
import { useEffect, useLayoutEffect, useRef } from 'react';
import rafSchd from 'raf-schd';

type TUseMutationObserverCallback = (
  mutationsList: MutationRecord[],
  observer: MutationObserver
) => void;

let _mutationObserver: ReturnType<typeof createMutationObserver>;

const useLatest = <T>(current: T) => {
  const storedValue = useRef(current);
  useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

function createMutationObserver() {
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
        const targetCallbacks = callbacks.get(target);
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

const getMutationObserver = () =>
  !_mutationObserver
    ? (_mutationObserver = createMutationObserver())
    : _mutationObserver;

function useMutationObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: TUseMutationObserverCallback,
  options?: MutationObserverInit
): MutationObserver {
  const mutationObserver = getMutationObserver();
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
