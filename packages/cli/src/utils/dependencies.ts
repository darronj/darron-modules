import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { detectPackageManager } from './package-manager.js';

export async function installDependencies(dependencies: Map<string, string>): Promise<void> {
  if (dependencies.size === 0) {
    return;
  }

  const packageManager = await detectPackageManager();
  const spinner = ora('Installing dependencies').start();

  try {
    const depArray = Array.from(dependencies.entries()).map(([name, version]) => `${name}@${version}`);

    const installCmd = packageManager === 'npm' ? 'install' : 'add';

    await execa(packageManager, [installCmd, ...depArray]);

    spinner.succeed(`Installed ${dependencies.size} dependencies`);
  } catch (error) {
    spinner.fail(`Failed to install dependencies: ${error.message}`);
    throw error;
  }
}

export async function resolveComponentDependencies(component: any, registry: any) {
  const npmDependencies = new Map<string, string>();
  const componentDependencies = new Set<string>();

  // Add component's npm dependencies
  for (const [name, version] of Object.entries(component.dependencies || {})) {
    npmDependencies.set(name, version as string);
  }

  // Recursively resolve component dependencies
  async function resolveComponentDeps(componentName: string, visited = new Set<string>()) {
    if (visited.has(componentName)) {
      return; // Prevent circular dependencies
    }

    visited.add(componentName);

    const comp = registry.components.find((c) => c.name === componentName);
    if (!comp) return;

    // Add component's npm dependencies
    for (const [name, version] of Object.entries(comp.dependencies || {})) {
      npmDependencies.set(name, version as string);
    }

    // Add component's component dependencies
    for (const depName of comp.componentDependencies || []) {
      componentDependencies.add(depName);
      await resolveComponentDeps(depName, visited);
    }
  }

  // Resolve direct component dependencies
  for (const depName of component.componentDependencies || []) {
    componentDependencies.add(depName);
    await resolveComponentDeps(depName);
  }

  return {
    npmDeps: npmDependencies,
    componentDeps: componentDependencies,
  };
}
