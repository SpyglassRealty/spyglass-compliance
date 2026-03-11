/**
 * One-off seed script to create the initial admin user.
 * Run in Render shell where DATABASE_URL is already set.
 *
 * Usage:  node scripts/seed-admin.js
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    // Run migrations first
    console.log('Running migrations...');

    const admin = await prisma.user.upsert({
      where: { email: 'admin@spyglassrealty.com' },
      update: {},
      create: {
        email: 'admin@spyglassrealty.com',
        passwordHash: await bcrypt.hash('admin123', 12),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '512-555-0001',
        trecLicense: 'ADMIN001',
      },
    });
    console.log('Admin created:', admin.email);

    const agent = await prisma.user.upsert({
      where: { email: 'agent@spyglassrealty.com' },
      update: {},
      create: {
        email: 'agent@spyglassrealty.com',
        passwordHash: await bcrypt.hash('agent123', 12),
        firstName: 'Test',
        lastName: 'Agent',
        role: 'agent',
        phone: '512-555-0002',
        trecLicense: 'AGENT001',
      },
    });
    console.log('Agent created:', agent.email);

    console.log('\nLogin credentials:');
    console.log('  Admin: admin@spyglassrealty.com / admin123');
    console.log('  Agent: agent@spyglassrealty.com / agent123');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
