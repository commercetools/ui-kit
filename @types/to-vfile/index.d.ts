declare module 'to-vfile' {
  import type { VFileContents, VFileCompatible, VFile } from 'vfile';

  export type FsFileOptions = { encoding?: string; flag?: string };

  export function read(
    description: VFileContents,
    options?: FsFileOptions
  ): Promise<VFileCompatible>;
  export function write(
    description: VFile,
    options?: FsFileOptions
  ): Promise<void>;
  export function readSync(
    description: VFileContents,
    options?: FsFileOptions
  ): VFileCompatible;
  export function writeSync(description: VFile, options?: FsFileOptions): void;
}
