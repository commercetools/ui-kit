// Polyfill for `MutationObserver` when used with SSR.
// eslint-disable-next-line no-undef
globalThis.MutationObserver =
  typeof window !== 'undefined' && 'MutationObserver' in window
    ? window.MutationObserver
    : class MutationObserver {
        observe() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      };
