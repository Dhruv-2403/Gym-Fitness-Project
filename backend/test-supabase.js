import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    // Attempt to query the database. Even if the table is empty, this checks the connection.
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Successfully connected to Supabase!');
    console.log(`Found ${users.length} users.`);
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
