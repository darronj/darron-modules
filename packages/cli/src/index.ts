#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { updateCommand } from './commands/update.js';
import { checkForUpdates } from './utils/updates.js';
import packageJson from '../package.json';

const program = new Command();

// Program metadata
program
  .name('alloy')
  .description('CLI for managing Alloy components')
  .version(packageJson.version, '-v, --version', 'Output the current version');

// Commands
program
  .command('init')
  .description('Initialize Alloy in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--registry <url>', 'Use a custom registry URL')
  .action(initCommand);

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--variant <variant>', 'Specify component variant')
  .option('--force', 'Overwrite existing files')
  .option('--no-install', 'Skip dependency installation')
  .action(addCommand);

program
  .command('list')
  .description('List available components')
  .option('--category <category>', 'Filter by category')
  .option('--tag <tag>', 'Filter by tag')
  .action(listCommand);

program
  .command('update [components...]')
  .description('Update components')
  .option('--all', 'Update all installed components')
  .option('--no-install', 'Skip dependency installation')
  .action(updateCommand);

// Run the program
async function main() {
  console.log(chalk.bold(`🛠️  ${chalk.blue('Alloy')} CLI v${packageJson.version}\n`));

  try {
    // Check for updates
    await checkForUpdates();

    // Parse command line arguments
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red('\nError:'), error.message);
    process.exit(1);
  }
}

main();
