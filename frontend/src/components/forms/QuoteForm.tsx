'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICES, THEME } from '@/lib/constants';
import { cn } from '@/lib/utils';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required (min 2 characters)').max(255),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(20)
    .regex(/^[+]?[\d\s\-()]{10,20}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  city: z.string().min(2, 'City is required').max(255),
  serviceNeeded: z.string().min(2, 'Please select a service'),
  loadWeight: z.string().optional(),
  liftDate: z.string().optional(),
  message: z.string().max(2000, 'Max 2000 characters').optional(),
  website: z.string().max(0).optional(), // honeypot
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const res = await fetch(`${THEME.api.baseUrl}/leads`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit. Please try again.');
      }

      setStatus('success');
      reset();
      setSelectedFile(null);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again or call us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 size={48} className="mx-auto text-green-600" />
        <h3 className="mt-4 text-xl font-heading font-bold text-green-800">
          Quote Request Submitted!
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for reaching out. Our team will contact you within 2 hours with a customized quote.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <input {...register('website')} tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 text-red-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800">Submission Failed</p>
            <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="input-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Rajesh Kumar"
            className={cn('input-field', errors.name && 'border-red-400 focus:ring-red-200')}
            {...register('name')}
          />
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="input-label">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +91-98765-43210"
            className={cn('input-field', errors.phone && 'border-red-400 focus:ring-red-200')}
            {...register('phone')}
          />
          {errors.phone && <p className="input-error">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="input-label">
            Email <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. rajesh@company.com"
            className={cn('input-field', errors.email && 'border-red-400 focus:ring-red-200')}
            {...register('email')}
          />
          {errors.email && <p className="input-error">{errors.email.message}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="input-label">
            City / Location <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="e.g. Mumbai, Pune, Delhi"
            className={cn('input-field', errors.city && 'border-red-400 focus:ring-red-200')}
            {...register('city')}
          />
          {errors.city && <p className="input-error">{errors.city.message}</p>}
        </div>

        {/* Service Needed */}
        <div>
          <label htmlFor="serviceNeeded" className="input-label">
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            id="serviceNeeded"
            className={cn('input-field', errors.serviceNeeded && 'border-red-400 focus:ring-red-200')}
            {...register('serviceNeeded')}
          >
            <option value="">Select a service...</option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
            <option value="Other">Other (specify in message)</option>
          </select>
          {errors.serviceNeeded && <p className="input-error">{errors.serviceNeeded.message}</p>}
        </div>

        {/* Load Weight */}
        <div>
          <label htmlFor="loadWeight" className="input-label">
            Load Weight (ton) <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="loadWeight"
            type="text"
            placeholder="e.g. 25 ton"
            className="input-field"
            {...register('loadWeight')}
          />
        </div>

        {/* Lift Date */}
        <div className="sm:col-span-2">
          <label htmlFor="liftDate" className="input-label">
            Expected Lift Date <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="liftDate"
            type="date"
            className="input-field"
            {...register('liftDate')}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="input-label">
          Project Details / Message <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your project: site location, access conditions, lift requirements..."
          className={cn('input-field resize-y', errors.message && 'border-red-400 focus:ring-red-200')}
          {...register('message')}
        />
        {errors.message && <p className="input-error">{errors.message.message}</p>}
      </div>

      {/* File upload */}
      <div>
        <label className="input-label">
          Site Photo / Document <span className="text-gray-400">(optional, max 5MB)</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-brand-gold hover:bg-brand-gold/5"
        >
          <Upload size={24} className="text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {selectedFile ? selectedFile.name : 'Click to upload a file'}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, PDF, WEBP — Max 5MB</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,.webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && file.size <= 5 * 1024 * 1024) {
              setSelectedFile(file);
            } else if (file) {
              alert('File too large. Maximum 5MB allowed.');
            }
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full sm:w-auto text-base px-10 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Quote Request
          </>
        )}
      </button>

      <p className="text-xs text-gray-400">
        Your information is secure and will only be used to prepare your quote. We do not share your data with third parties.
      </p>
    </form>
  );
}
