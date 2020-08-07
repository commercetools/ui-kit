declare module 'vfile-reporter' {
  import type { VFile } from 'vfile';

  export default function report(file: Error | VFile): string;
}
