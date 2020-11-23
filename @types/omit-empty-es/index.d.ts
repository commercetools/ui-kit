declare module 'omit-empty-es' {
  export type OmitObject = Array<unknown> | { [key: string]: unknown };
  export default function omitEmpty(obj: OmitObject): OmitObject | undefined;
}
