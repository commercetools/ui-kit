const regexpData = /^aria-/;

type Props = Record<string, unknown>;

export default function filterAriaAttributes(obj: Props): Props {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) =>
      regexpData.test(propFromEntry)
    )
  );
}
