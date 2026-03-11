import nodemailer from 'nodemailer';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface LeadEmailData {
  name: string;
  phone: string;
  email?: string;
  city: string;
  serviceNeeded: string;
  loadWeight?: string;
  liftDate?: string;
  message?: string;
}

export async function sendLeadNotification(data: LeadEmailData): Promise<void> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      logger.warn('SMTP credentials not configured. Skipping email notification.');
      return;
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #142f2a; padding: 20px; text-align: center;">
          <h1 style="color: #ba8d32; margin: 0;">New Quote Request</h1>
          <p style="color: #ffffff; margin: 5px 0 0;">Shivoham Crane Services</p>
        </div>
        <div style="padding: 20px; background: #f7f7f7;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Phone:</td><td style="padding: 8px;">${data.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Email:</td><td style="padding: 8px;">${data.email || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">City:</td><td style="padding: 8px;">${data.city}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Service:</td><td style="padding: 8px;">${data.serviceNeeded}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Load Weight:</td><td style="padding: 8px;">${data.loadWeight || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Lift Date:</td><td style="padding: 8px;">${data.liftDate || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #142f2a;">Message:</td><td style="padding: 8px;">${data.message || 'N/A'}</td></tr>
          </table>
        </div>
        <div style="background: #142f2a; padding: 15px; text-align: center;">
          <p style="color: #ba8d32; margin: 0; font-size: 12px;">This is an automated notification from shivohamcrane.com</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@shivohamcrane.com',
      to: process.env.NOTIFICATION_EMAIL || 'info@shivohamcrane.com',
      subject: `New Quote Request: ${data.serviceNeeded} - ${data.city}`,
      html: htmlBody,
    });

    logger.info(`Email notification sent for lead: ${data.name}`);
  } catch (error) {
    logger.error('Failed to send email notification:', error);
    // Don't throw - email failure shouldn't break the lead submission
  }
}
