import isPropValid from '@emotion/is-prop-valid';

type Props = Record<string, unknown>;

export default function filterInvalidAttributes(obj: Props): Props {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) => isPropValid(propFromEntry))
  );
}
