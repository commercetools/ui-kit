/* global percySnapshot */
/* eslint-disable-next-line import/prefer-default-export */
export const screenshot = (label, fn) =>
  percySnapshot(label, { widths: [1024] }, fn);
