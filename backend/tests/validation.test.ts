import { leadSchema } from '../src/utils/validation';

describe('Lead Validation', () => {
  const validLead = {
    name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    email: 'rajesh@example.com',
    city: 'Mumbai',
    serviceNeeded: 'Mobile Crane Rental',
    loadWeight: '25 ton',
    liftDate: '2026-04-15',
    message: 'Need a crane for a construction project.',
    website: '', // honeypot
  };

  test('should accept valid lead data', () => {
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  test('should reject empty name', () => {
    const result = leadSchema.safeParse({ ...validLead, name: '' });
    expect(result.success).toBe(false);
  });

  test('should reject invalid phone', () => {
    const result = leadSchema.safeParse({ ...validLead, phone: '123' });
    expect(result.success).toBe(false);
  });

  test('should accept empty email', () => {
    const result = leadSchema.safeParse({ ...validLead, email: '' });
    expect(result.success).toBe(true);
  });

  test('should reject invalid email', () => {
    const result = leadSchema.safeParse({ ...validLead, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  test('should reject empty city', () => {
    const result = leadSchema.safeParse({ ...validLead, city: '' });
    expect(result.success).toBe(false);
  });

  test('should reject empty serviceNeeded', () => {
    const result = leadSchema.safeParse({ ...validLead, serviceNeeded: '' });
    expect(result.success).toBe(false);
  });

  test('should detect honeypot spam', () => {
    const result = leadSchema.safeParse({ ...validLead, website: 'http://spam.com' });
    expect(result.success).toBe(false);
  });

  test('should reject message over 2000 chars', () => {
    const result = leadSchema.safeParse({ ...validLead, message: 'a'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  test('should accept optional fields as undefined', () => {
    const minimal = {
      name: 'Test User',
      phone: '9876543210',
      city: 'Mumbai',
      serviceNeeded: 'Heavy Lifting',
    };
    const result = leadSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });
});
