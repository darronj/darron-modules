import chalk from 'chalk';
import ora from 'ora';
import { getRegistry } from '../utils/registry.js';
import { getConfig, saveConfig } from '../utils/config.js';
import { addCommand } from './add.js';

interface UpdateOptions {
  all?: boolean;
  install?: boolean;
}

export async function updateCommand(componentNames: string[], options: UpdateOptions) {
  // Load configuration
  const config = await getConfig();
  if (!config) {
    console.log(chalk.yellow('Alloy has not been initialized in this project.'));
    console.log(`Run ${chalk.cyan('alloy init')} first.`);
    return;
  }

  const spinner = ora('Fetching component registry').start();

  try {
    // Get component registry
    const registry = await getRegistry(config.registryUrl);
    spinner.succeed('Component registry loaded');

    // Determine components to update
    let componentsToUpdate: string[] = [];

    if (options.all) {
      componentsToUpdate = config.components;
    } else if (componentNames.length > 0) {
      // Check if specified components are installed
      componentsToUpdate = componentNames.filter((name) => {
        const installed = config.components.includes(name);
        if (!installed) {
          console.log(chalk.yellow(`Component '${name}' is not installed.`));
        }
        return installed;
      });
    } else {
      console.log(chalk.yellow('No components specified to update.'));
      console.log(`Use ${chalk.cyan('alloy update --all')} to update all components, or`);
      console.log(`${chalk.cyan('alloy update <component-name>')} to update specific components.`);
      return;
    }

    if (componentsToUpdate.length === 0) {
      console.log(chalk.yellow('No components to update.'));
      return;
    }

    // For each component, check for updates
    const updatesAvailable: string[] = [];

    for (const componentName of componentsToUpdate) {
      const component = registry.components.find((c) => c.name === componentName);

      if (!component) {
        console.log(chalk.yellow(`Warning: Component '${componentName}' not found in registry.`));
        continue;
      }

      const installedVersion = config.componentVersions?.[componentName] || '0.0.0';

      if (component.version > installedVersion) {
        updatesAvailable.push(componentName);
      }
    }

    if (updatesAvailable.length === 0) {
      console.log(chalk.green('All components are up to date!'));
      return;
    }

    // Update components
    console.log(chalk.cyan(`\nUpdating ${updatesAvailable.length} components:`));
    updatesAvailable.forEach((name) => console.log(`  - ${name}`));
    console.log('');

    // Use add command with force option to update
    await addCommand(updatesAvailable, {
      force: true,
      install: options.install,
    });

    // Update version information in config
    for (const componentName of updatesAvailable) {
      const component = registry.components.find((c) => c.name === componentName);
      if (component) {
        if (!config.componentVersions) {
          config.componentVersions = {};
        }
        config.componentVersions[componentName] = component.version;
      }
    }

    await saveConfig(config);

    console.log(chalk.green('\n✅ Components updated successfully!'));
  } catch (error) {
    spinner.fail(`Failed to update components: ${error.message}`);
  }
}
