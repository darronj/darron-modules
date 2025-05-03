import chalk from 'chalk';
import ora from 'ora';
import { getRegistry } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';

interface ListOptions {
  category?: string;
  tag?: string;
}

export async function listCommand(options: ListOptions) {
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

    // Filter components
    let components = registry.components;
    
    if (options.category) {
      components = components.filter(c => c.category === options.category);
    }
    
    if (options.tag) {
      components = components.filter(c => c.tags?.includes(options.tag));
    }

    if (components.length === 0) {
      console.log(chalk.yellow('No components found matching the criteria.'));
      return;
    }

    // Group by category
    const categorized = components.reduce((acc, component) => {
      const category = component.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(component);
      return acc;
    }, {});

    // Display components
    console.log(chalk.bold('\nAvailable Components:\n'));
    
    Object.entries(categorized).forEach(([category, components]) => {
      console.log(chalk.blue.bold(` ${category}`));
      
      (components as any[]).forEach(component => {
        const installed = config.components.includes(component.name);
        const indicator = installed ? chalk.green('✓') : ' ';
        
        console.log(`  ${indicator} ${chalk.cyan(component.name)} - ${component.description}`);
        
        if (component.variants?.length) {
          console.log(`    Variants: ${component.variants.join(', ')}`);
        }
      });
      
      console.log(''); // Add space between categories
    });
    
    // Display tags
    const allTags = new Set<string>();
    registry.components.forEach(c => {
      c.tags?.forEach(tag => allTags.add(tag));
    });
    
    if (allTags.size > 0) {
      console.log(chalk.bold('Available Tags:'));
      console.log(`  ${Array.from(allTags).join(', ')}`);
      console.log('');
    }
    
    // Display categories
    const categories = Object.keys(categorized);
    console.log(chalk.bold('Available Categories:'));
    console.log(`  ${categories.join(', ')}`);
    console.log('');
    
    // Display usage help
    console.log(chalk.bold('Usage:'));
    console.log(`  Add component:    ${chalk.cyan('alloy add <component-name>')}`);
    console.log(`  Filter by tag:    ${chalk.cyan('alloy list --tag <tag-name>')}`);
    console.log(`  Filter by category: ${chalk.cyan('alloy list --category <category-name>')}`);
  } catch (error) {
    spinner.fail(`Failed to list components: ${error.message}`);
  }
}