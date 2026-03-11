export function StructuredData() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Shivoham Crane Services',
    description:
      'Professional crane rental and heavy lifting services based in Navi Mumbai, Maharashtra. Mobile cranes, hydra cranes, industrial lifting, machinery shifting and more. Pan-India service.',
    url: 'https://shivohamcrane.com',
    telephone: '+91-98765-43210',
    email: 'info@shivohamcrane.com',
    image: 'https://shivohamcrane.com/images/logo.png',
    logo: 'https://shivohamcrane.com/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Navi Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.0760',
      longitude: '72.8777',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    priceRange: '₹₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Crane Rental and Heavy Lifting Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Shivoham Crane Services',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Crane Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Crane Rental' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hydra Crane Rental' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Heavy Lifting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Machinery Shifting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Erection & Dismantling' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Industrial Lifting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plant Maintenance Lifts' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency / Night Lifts' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
