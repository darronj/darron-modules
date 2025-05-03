import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

// Schemas for validation
const ComponentSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dependencies: z.record(z.string(), z.string()).optional(),
  componentDependencies: z.array(z.string()).optional(),
  variants: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      path: z.string(),
      type: z.enum(['component', 'schema', 'entry', 'style', 'test', 'doc']),
    })
  )
});

const RegistrySchema = z.object({
  name: z.string(),
  version: z.string(),
  components: z.array(ComponentSchema)
});

type Registry = z.infer<typeof RegistrySchema>;
type Component = z.infer<typeof ComponentSchema>;

// Registry cache
let registryCache: Registry | null = null;
const CACHE_TTL = 60 * 1000; // 1 minute
let lastCacheTime = 0;

async function scanComponentDirectories(baseDir: string): Promise<Component[]> {
  const components: Component[] = [];
  
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const descriptionPath = path.join(baseDir, entry.name, 'description.json');
        
        try {
          const content = await fs.readFile(descriptionPath, 'utf-8');
          const component = ComponentSchema.parse(JSON.parse(content));
          components.push(component);
        } catch (error) {
          console.warn(`Failed to load component description from ${descriptionPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error scanning component directories:', error);
  }
  
  return components;
}

export async function loadRegistry(): Promise<Registry> {
  const now = Date.now();
  
  // Return cached registry if it's still valid
  if (registryCache && now - lastCacheTime < CACHE_TTL) {
    return registryCache;
  }
  
  try {
    // Load components from examples directory
    const componentsDir = path.join(process.cwd(), '../../examples/components');
    const components = await scanComponentDirectories(componentsDir);
    
    const registry: Registry = {
      name: "Alloy Component Registry",
      version: "1.0.0",
      components
    };
    
    // Validate registry
    registryCache = RegistrySchema.parse(registry);
    lastCacheTime = now;
    
    return registryCache;
  } catch (error) {
    console.error('Error loading registry:', error);
    throw new Error('Failed to load registry');
  }
}

export async function getComponent(name: string): Promise<Component | null> {
  const registry = await loadRegistry();
  return registry.components.find(c => c.name === name) || null;
}

export async function getComponentVariant(name: string, variant: string): Promise<any | null> {
  const component = await getComponent(name);
  if (!component || !component.variants?.includes(variant)) {
    return null;
  }
  
  try {
    const variantPath = path.join(process.cwd(), '../../examples/components', name, 'variants', variant);
    const descriptionPath = path.join(variantPath, 'description.json');
    
    const content = await fs.readFile(descriptionPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading variant ${variant} for component ${name}:`, error);
    return null;
  }
}