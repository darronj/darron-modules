import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { execa } from 'execa';
import { detectPackageManager } from '../utils/package-manager.js';
import { createConfig } from '../utils/config.js';

interface InitOptions {
  yes?: boolean;
  registry?: string;
}

export async function initCommand(options: InitOptions) {
  console.log(chalk.bold('Initializing Alloy in your project\n'));

  // Check if project has package.json
  try {
    await fs.access(path.join(process.cwd(), 'package.json'));
  } catch (error) {
    console.log(chalk.red('No package.json found in the current directory.'));
    console.log('Run this command in the root of your project.');
    return;
  }

  // Detect if already initialized
  const configExists = await fs.access(path.join(process.cwd(), '.alloyrc.json'))
    .then(() => true)
    .catch(() => false);

  if (configExists) {
    console.log(chalk.yellow('Alloy is already initialized in this project.'));
    if (!options.yes) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Do you want to reinitialize?',
          default: false
        }
      ]);
      
      if (!confirm) {
        return;
      }
    }
  }

  // Configuration options
  let registryUrl = options.registry || 'https://github.com/intermark/alloy-registry';

  if (!options.yes) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'registryUrl',
        message: 'Component registry URL:',
        default: registryUrl
      },
      {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Install base dependencies?',
        default: true
      }
    ]);
    
    registryUrl = answers.registryUrl;
    
    if (answers.installDependencies) {
      const packageManager = await detectPackageManager();
      
      // Install core dependencies
      console.log(chalk.cyan('\nInstalling core dependencies...'));
      
      try {
        await execa(packageManager, [
          packageManager === 'npm' ? 'install' : 'add',
          '@sanity/client',
          'sanity'
        ]);
        console.log(chalk.green('Dependencies installed successfully!'));
      } catch (error) {
        console.error(chalk.red('Failed to install dependencies:'), error.message);
      }
    }
  }

  // Create configuration file
  await createConfig({
    registryUrl,
    components: []
  });

  // Create base directory structure
  await fs.mkdir(path.join(process.cwd(), 'alloy'), { recursive: true })
    .catch(() => {});

  console.log(chalk.green('\n✅ Alloy initialized successfully!'));
  console.log('\nNext steps:');
  console.log(`  1. Browse available components: ${chalk.cyan('alloy list')}`);
  console.log(`  2. Add a component: ${chalk.cyan('alloy add <component-name>')}`);
}