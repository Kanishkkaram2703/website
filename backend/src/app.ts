import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { leadRoutes } from './routes/leads';
import { adminRoutes } from './routes/admin';
import { healthRoutes } from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
