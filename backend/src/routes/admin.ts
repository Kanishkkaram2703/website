import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { adminAuth } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// All admin routes require auth
router.use(adminAuth);

// GET /api/admin/leads - List all leads
router.get('/leads', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where: { isSpam: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where: { isSpam: false } }),
    ]);

    res.json({
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Admin leads fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// GET /api/admin/leads/:id - Get single lead
router.get('/leads/:id', async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id as string },
    });

    if (!lead) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }

    // Mark as read
    if (!lead.read) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { read: true },
      });
    }

    res.json(lead);
  } catch (error) {
    logger.error('Admin lead fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// GET /api/admin/stats - Dashboard stats
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const [totalLeads, unreadLeads, todayLeads] = await Promise.all([
      prisma.lead.count({ where: { isSpam: false } }),
      prisma.lead.count({ where: { isSpam: false, read: false } }),
      prisma.lead.count({
        where: {
          isSpam: false,
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    res.json({ totalLeads, unreadLeads, todayLeads });
  } catch (error) {
    logger.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export { router as adminRoutes };
