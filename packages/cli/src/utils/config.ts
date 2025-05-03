import fs from 'fs/promises';
import path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';

const explorerSync = cosmiconfig('alloy');

const ConfigSchema = z.object({
  registryUrl: z.string().url(),
  components: z.array(z.string()),
  componentVersions: z.record(z.string(), z.string()).optional(),
  customizationOptions: z.record(z.string(), z.any()).optional(),
});

type Config = z.infer<typeof ConfigSchema>;

export async function getConfig(): Promise<Config | null> {
  try {
    const result = await explorerSync.search();

    if (!result || result.isEmpty) {
      return null;
    }

    return ConfigSchema.parse(result.config);
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

export async function createConfig(config: Config): Promise<void> {
  const configPath = path.join(process.cwd(), '.alloyrc.json');
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}

export async function saveConfig(config: Config): Promise<void> {
  const configPath = path.join(process.cwd(), '.alloyrc.json');
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}

export async function updateConfig(updater: (config: Config) => Config): Promise<void> {
  const config = await getConfig();
  if (!config) {
    throw new Error('No config found');
  }

  const updatedConfig = updater(config);
  await saveConfig(updatedConfig);
}
