declare module 'warning' {
  export default function warning(
    shouldNotWarn: boolean,
    message: string
  ): void;
}
