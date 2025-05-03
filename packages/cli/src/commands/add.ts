import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import { getRegistry } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { installDependencies } from '../utils/dependencies.js';
import { resolveComponentDependencies } from '../utils/dependencies.js';
import { renderTemplate } from '../utils/templates.js';

interface AddOptions {
  yes?: boolean;
  variant?: string;
  force?: boolean;
  install?: boolean;
}

export async function addCommand(componentNames: string[], options: AddOptions) {
  if (!componentNames.length) {
    console.log(chalk.yellow('No components specified. Use:'));
    console.log(`  ${chalk.cyan('alloy add <component-name>')}`);
    console.log(`\nRun ${chalk.cyan('alloy list')} to see available components.`);
    return;
  }

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

    // Track dependencies to install
    const npmDependencies = new Map<string, string>();
    const componentsToInstall = new Set<string>();
    
    // Process each component
    for (const componentName of componentNames) {
      const componentSpinner = ora(`Processing ${componentName}`).start();
      
      try {
        // Find the component in the registry
        const component = registry.components.find(c => c.name === componentName);
        if (!component) {
          componentSpinner.fail(`Component '${componentName}' not found`);
          continue;
        }

        // Check if variant exists if specified
        if (options.variant && !component.variants?.includes(options.variant)) {
          const availableVariants = component.variants?.join(', ') || 'none';
          componentSpinner.fail(`Variant '${options.variant}' not found for ${componentName}. Available variants: ${availableVariants}`);
          continue;
        }

        // Resolve dependencies
        const { npmDeps, componentDeps } = await resolveComponentDependencies(component, registry);
        
        // Add to installation queues
        npmDeps.forEach((version, name) => {
          npmDependencies.set(name, version);
        });
        
        componentDeps.forEach(dep => {
          componentsToInstall.add(dep);
        });
        
        // Add the component itself
        componentsToInstall.add(componentName);
        
        componentSpinner.succeed(`Component ${componentName} processed`);
      } catch (error) {
        componentSpinner.fail(`Failed to process ${componentName}: ${error.message}`);
      }
    }

    // Install all required components
    if (componentsToInstall.size > 0) {
      const installSpinner = ora('Installing components').start();
      
      try {
        for (const componentName of componentsToInstall) {
          const component = registry.components.find(c => c.name === componentName);
          if (!component) continue;
          
          await installComponent(component, {
            variant: options.variant,
            force: options.force,
            config
          });
        }
        
        installSpinner.succeed(`Installed ${componentsToInstall.size} components`);
      } catch (error) {
        installSpinner.fail(`Component installation failed: ${error.message}`);
      }
    }

    // Install npm dependencies
    if (npmDependencies.size > 0 && options.install !== false) {
      await installDependencies(npmDependencies);
    }

    console.log(chalk.green('\n✅ Components added successfully!'));
  } catch (error) {
    spinner.fail(`Failed to add components: ${error.message}`);
  }
}

async function installComponent(component: any, options: { variant?: string, force?: boolean, config: any }) {
  // Fetch component files
  const componentUrl = `${options.config.registryUrl}/components/${component.name}`;
  const variantPath = options.variant ? `/variants/${options.variant}` : '';
  const filesUrl = `${componentUrl}${variantPath}/files`;
  
  // TODO: Fetch files from registry
  
  // Create files from templates
  const templatesPath = `${componentUrl}${variantPath}/templates`;
  
  // TODO: Fetch templates from registry
  
  // For each file in the component
  for (const file of component.files || []) {
    // Determine destination path
    const destPath = path.join(process.cwd(), file.path);
    
    // Check if file exists and handle force option
    const fileExists = await fs.stat(destPath).catch(() => false);
    if (fileExists && !options.force) {
      console.log(chalk.yellow(`Skipping existing file: ${file.path}`));
      continue;
    }
    
    // Create directory if needed
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    
    // Render template or copy file
    const content = await renderTemplate(file.template || file.content, {
      component,
      variant: options.variant,
      config: options.config
    });
    
    await fs.writeFile(destPath, content);
  }
}