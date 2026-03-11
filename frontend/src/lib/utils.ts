import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getWhatsAppUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const msg = encodeURIComponent(
    message || 'Hi, I am interested in crane services from Shivoham Crane Services. Please share details.'
  );
  return `https://wa.me/${number}?text=${msg}`;
}

export function formatPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}
