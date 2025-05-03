import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { loadRegistry } from './registry.js';
import { componentsRouter } from './routes/components.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/components', componentsRouter);

app.get('/api/registry', async (req, res) => {
  try {
    const registry = await loadRegistry();
    res.json(registry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load registry' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Registry server running on port ${port}`);
});