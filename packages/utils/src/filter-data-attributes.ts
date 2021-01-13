const regexpData = /^data-/;

type Props = Record<string, unknown>;

export default function filterDataAttributes(obj: Props): Props {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) =>
      regexpData.test(propFromEntry)
    )
  );
}
