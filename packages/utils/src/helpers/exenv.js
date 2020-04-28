// eslint-disable-next-line import/prefer-default-export
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
