import isPropValid from '@emotion/is-prop-valid';

type TInputWithInvalid = Record<string, any>;
type TInputWithoutInvalid = Partial<Record<keyof TInputWithInvalid, any>>;

export default function filterInvalidAttributes(
  obj: TInputWithInvalid
): TInputWithoutInvalid {
  return Object.fromEntries(
    Object.entries(obj).filter(([propFromEntry]) => isPropValid(propFromEntry))
  );
}
