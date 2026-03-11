import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ badge, title, titleHighlight, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-brand-green pt-32 pb-16 lg:pt-36 lg:pb-20">
      <div className="container-custom">
        {breadcrumbs && (
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={12} />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-gold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
          {badge}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}{' '}
          {titleHighlight && <span className="text-brand-gold">{titleHighlight}</span>}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg text-white/60 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
