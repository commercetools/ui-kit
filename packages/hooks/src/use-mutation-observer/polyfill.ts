// Polyfill for `MutationObserver` when used with SSR.
global.MutationObserver =
  typeof window !== 'undefined' && 'MutationObserver' in window
    ? window.MutationObserver
    : class MutationObserver {
        observe() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      };

// Empty export statement to identify this as a module.
export {};
