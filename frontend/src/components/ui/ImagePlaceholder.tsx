import Image from 'next/image';
import { Construction } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
}

export function ImagePlaceholder({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  objectFit = 'cover',
}: ImagePlaceholderProps) {
  // If src starts with /images/ and is a placeholder, show the placeholder
  const isPlaceholder = !src || src.includes('placeholder') || !src.startsWith('http');

  if (isPlaceholder && !src?.endsWith('.jpeg') && !src?.endsWith('.png') && !src?.endsWith('.jpg') && !src?.endsWith('.webp')) {
    return (
      <div
        className={cn(
          'img-placeholder relative overflow-hidden',
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
          <Construction size={48} className="text-brand-gold/60" />
          <span className="text-xs font-medium text-brand-gold/60 max-w-[200px]">{alt}</span>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src || '/images/logo.png'}
        alt={alt}
        fill
        className={cn(objectFit === 'contain' ? 'object-contain' : 'object-cover', className)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={src || '/images/logo.png'}
      alt={alt}
      width={width || 600}
      height={height || 400}
      className={cn(objectFit === 'contain' ? 'object-contain' : 'object-cover', className)}
      priority={priority}
    />
  );
}
