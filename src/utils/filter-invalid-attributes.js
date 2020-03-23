import isPropValid from '@emotion/is-prop-valid';

export default function filterProps(obj) {
  return Object.keys(obj)
    .filter((prop) => isPropValid(prop))
    .reduce((acc, prop) => {
      // eslint-disable-next-line no-param-reassign
      acc[prop] = obj[prop];
      return acc;
    }, {});
}
