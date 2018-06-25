const regexpData = /^data-/;

export default function filterDataAttributes(obj) {
  return Object.keys(obj)
    .filter(p => regexpData.test(p))
    .reduce((acc, p) => {
      // eslint-disable-next-line no-param-reassign
      acc[p] = obj[p];
      return acc;
    }, {});
}
