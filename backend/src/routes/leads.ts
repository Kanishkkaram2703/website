import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../utils/prisma';
import { leadSchema } from '../utils/validation';
import { sendLeadNotification } from '../utils/email';
import { logger } from '../utils/logger';

const router = Router();

// Rate limiting for lead submissions
const submitLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads');
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.pdf', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: JPG, PNG, PDF, WEBP'));
    }
  },
});

// POST /api/leads - Submit a quote request
router.post('/', submitLimiter, upload.single('file'), async (req: Request, res: Response) => {
  try {
    // Validate input
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;

    // Honeypot check
    if (data.website && data.website.length > 0) {
      logger.warn(`Honeypot triggered from IP: ${req.ip}`);
      // Return success to not tip off bots
      res.status(200).json({ success: true, message: 'Thank you for your submission.' });
      return;
    }

    // Store in DB
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        city: data.city,
        serviceNeeded: data.serviceNeeded,
        loadWeight: data.loadWeight || null,
        liftDate: data.liftDate ? new Date(data.liftDate) : null,
        message: data.message || null,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
        ipAddress: req.ip || null,
        userAgent: req.headers['user-agent'] || null,
        source: 'website',
      },
    });

    logger.info(`New lead created: ${lead.id} from ${data.city}`);

    // Send email notification (non-blocking)
    sendLeadNotification({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      city: data.city,
      serviceNeeded: data.serviceNeeded,
      loadWeight: data.loadWeight || undefined,
      liftDate: data.liftDate || undefined,
      message: data.message || undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Your quote request has been submitted successfully. We will contact you shortly.',
      leadId: lead.id,
    });
  } catch (error) {
    logger.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to submit request. Please try again.' });
  }
});

export { router as leadRoutes };
