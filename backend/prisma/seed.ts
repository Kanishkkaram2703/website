import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.lead.createMany({
    data: [
      {
        name: 'Rajesh Kumar',
        phone: '+91-9876543210',
        email: 'rajesh@example.com',
        city: 'Mumbai',
        serviceNeeded: 'Mobile Crane Rental',
        loadWeight: '25 ton',
        liftDate: new Date('2026-04-15'),
        message: 'Need a crane for construction site in Andheri.',
        source: 'website',
      },
      {
        name: 'Priya Sharma',
        phone: '+91-9123456780',
        email: 'priya@example.com',
        city: 'Pune',
        serviceNeeded: 'Heavy Lifting',
        loadWeight: '50 ton',
        liftDate: new Date('2026-04-20'),
        message: 'Factory equipment relocation project.',
        source: 'website',
      },
      {
        name: 'Mohammed Ali',
        phone: '+91-8765432190',
        city: 'Delhi',
        serviceNeeded: 'Machinery Shifting',
        loadWeight: '15 ton',
        liftDate: new Date('2026-05-01'),
        message: 'Industrial machinery shifting from warehouse.',
        source: 'website',
      },
    ],
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
