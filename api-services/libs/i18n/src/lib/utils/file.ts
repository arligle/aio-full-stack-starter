import { lstat, readdir, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import { logger } from '../i18n.module';

export const exists = async (path: string): Promise<boolean> => {
  return !!(await stat(path));
};

export function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  return Promise.all(array.map(callbackfn));
}

export async function filterAsync<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((_, index) => filterMap[index]);
}

export const isDirectory = async (source: string) => {
  const stats = await lstat(source);
  return stats.isDirectory();
};

export const getDirectories = async (source: string) => {
  const dirs = await readdir(source);
  return filterAsync(
    dirs.map((name) => path.join(source, name)),
    isDirectory,
  );
};

export const getFiles = async (
  dirPath: string,
  pattern: RegExp,
  includeSubfolders: boolean,
): Promise<string[]> => {
  const dirs: (Dirent | string)[] = await readdir(dirPath, {
    withFileTypes: true,
  });

  const files: (Dirent | string)[] = [];
  const deepFiles: string[] = [];

  for (const f of dirs) {
    try {
      if (typeof f === 'string') {
        if ((await exists(path.join(dirPath, f))) && pattern.test(f)) {
          files.push(f);
        }
      } else if (f.isFile() && pattern.test(f.name)) {
        files.push(f);
      } else if (includeSubfolders && f.isDirectory()) {
        deepFiles.push(
          ...(await getFiles(
            path.join(dirPath, f.name),
            pattern,
            includeSubfolders,
          )),
        );
      }
    } catch {
      logger.warn(`Could not load and read file ${JSON.stringify(f)}`);
    }
  }

  return [
    ...files.map((f) => path.join(dirPath, typeof f === 'string' ? f : f.name)),
    ...deepFiles,
  ];
};
