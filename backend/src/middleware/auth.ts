import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    logger.error('ADMIN_API_TOKEN not configured');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  if (!token || token !== expectedToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
