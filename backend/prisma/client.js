import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Test database connection on startup
prisma.$connect()
    .then(() => console.log('✅ Database connected successfully'))
    .catch((err) => {
        console.error('❌ Database connection FAILED:', err.message);
        console.error('💡 Check your DATABASE_URL and DIRECT_URL in .env file');
        console.error('💡 Make sure your database server is running');
    });

export default prisma