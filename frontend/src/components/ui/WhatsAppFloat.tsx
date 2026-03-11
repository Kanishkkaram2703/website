'use client';

import { getWhatsAppUrl } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppFloat() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-transform hover:scale-110"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
}
