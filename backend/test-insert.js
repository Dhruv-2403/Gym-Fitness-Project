import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Creating a test user...');

        const testUser = await prisma.user.create({
            data: {
                user_name: 'Test User',
                user_email: 'testuser@example.com',
                user_password: 'hashedpassword123', 
            },
        });

        console.log('✅ Test user created successfully!');
        console.log('User details:', {
            id: testUser.user_id,
            name: testUser.user_name,
            email: testUser.user_email,
        });

        console.log('\n📊 Fetching all users from database...');
        const allUsers = await prisma.user.findMany();
        console.log(`Found ${allUsers.length} user(s) in the database:`);
        allUsers.forEach(user => {
            console.log(`  - ${user.user_name} (${user.user_email})`);
        });

        console.log('\n✅ Data successfully inserted and retrieved from Supabase!');
        console.log('\n🔍 To view this data in Supabase Dashboard:');
        console.log('1. Go to https://supabase.com');
        console.log('2. Open your project');
        console.log('3. Click "Table Editor" in the left sidebar');
        console.log('4. Select the "User" table');
        console.log('5. You should see your test user there!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
