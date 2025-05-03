import fs from 'fs/promises';
import path from 'path';

type PackageManager = 'npm' | 'yarn' | 'pnpm';

export async function detectPackageManager(): Promise<PackageManager> {
  const cwd = process.cwd();

  // Check for lockfiles in order of preference
  try {
    await fs.access(path.join(cwd, 'pnpm-lock.yaml'));
    return 'pnpm';
  } catch (e) {
    try {
      await fs.access(path.join(cwd, 'yarn.lock'));
      return 'yarn';
    } catch (e) {
      return 'npm'; // Default to npm
    }
  }
}
