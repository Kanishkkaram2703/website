import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name too long')
    .trim(),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(20, 'Phone too long')
    .regex(/^[+]?[\d\s\-()]{10,20}$/, 'Invalid phone number format'),
  email: z
    .string()
    .email('Invalid email format')
    .max(255)
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(255, 'City name too long')
    .trim(),
  serviceNeeded: z
    .string()
    .min(2, 'Please select a service')
    .max(255)
    .trim(),
  loadWeight: z
    .string()
    .max(100)
    .optional()
    .or(z.literal('')),
  liftDate: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(2000, 'Message too long (max 2000 characters)')
    .optional()
    .or(z.literal('')),
  // Honeypot field - should be empty
  website: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
