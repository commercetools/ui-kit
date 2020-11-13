const regexpData = /^data-/;

type TInputProps = Record<string, any>;
type TDataAttributes = Partial<Record<keyof TInputProps, any>>;

export default function filterDataAttributes(
  obj: TInputProps
): TDataAttributes {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) =>
      regexpData.test(propFromEntry)
    )
  );
}
