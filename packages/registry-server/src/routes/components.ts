import { Router } from 'express';
import { getComponent, getComponentVariant, loadRegistry } from '../registry.js';

export const componentsRouter = Router();

// Get all components
componentsRouter.get('/', async (req, res) => {
  try {
    const registry = await loadRegistry();
    
    // Filter by category
    if (req.query.category) {
      const category = req.query.category as string;
      const filtered = registry.components.filter(c => c.category === category);
      return res.json(filtered);
    }
    
    // Filter by tag
    if (req.query.tag) {
      const tag = req.query.tag as string;
      const filtered = registry.components.filter(c => c.tags?.includes(tag));
      return res.json(filtered);
    }
    
    res.json(registry.components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load components' });
  }
});

// Get component by name
componentsRouter.get('/:name', async (req, res) => {
  try {
    const component = await getComponent(req.params.name);
    
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load component' });
  }
});

// Get component variant
componentsRouter.get('/:name/variants/:variant', async (req, res) => {
  try {
    const component = await getComponent(req.params.name);
    
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    if (!component.variants?.includes(req.params.variant)) {
      return res.status(404).json({ error: 'Variant not found' });
    }
    
    const variant = await getComponentVariant(req.params.name, req.params.variant);
    
    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }
    
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load component variant' });
  }
});

// Get component files
componentsRouter.get('/:name/files', async (req, res) => {
  try {
    const component = await getComponent(req.params.name);
    
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json(component.files || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load component files' });
  }
});

// Get component variant files
componentsRouter.get('/:name/variants/:variant/files', async (req, res) => {
  try {
    const component = await getComponent(req.params.name);
    
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    if (!component.variants?.includes(req.params.variant)) {
      return res.status(404).json({ error: 'Variant not found' });
    }
    
    // In a real implementation, this would return variant-specific files
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load component variant files' });
  }
});