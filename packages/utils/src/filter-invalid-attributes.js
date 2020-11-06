import isPropValid from '@emotion/is-prop-valid';

export default function filterInvalidAttributes(obj) {
  return Object.keys(obj)
    .filter((prop) => isPropValid(prop))
    .reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: obj[prop],
      }),
      {}
    );
}
