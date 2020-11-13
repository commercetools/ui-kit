const regexpData = /^aria-/;

type TInputProps = Record<string, any>;
type TAriaAttributes = Partial<Record<keyof TInputProps, any>>;

export default function filterAriaAttributes(
  obj: TInputProps
): TAriaAttributes {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) =>
      regexpData.test(propFromEntry)
    )
  );
}
