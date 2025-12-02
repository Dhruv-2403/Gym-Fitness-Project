import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.workoutSet.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.progressLog.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Cleared existing data\n');

    // Create Users
    console.log('👤 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    const user1 = await prisma.user.create({
        data: {
            user_name: 'John Doe',
            user_email: 'john@fitfusion.com',
            user_password: hashedPassword,
            xp: 150,
            streak: 5,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            user_name: 'Jane Smith',
            user_email: 'jane@fitfusion.com',
            user_password: hashedPassword,
            xp: 300,
            streak: 10,
        },
    });
    console.log(`✅ Created ${2} users\n`);

    // Create Exercises
    console.log('💪 Creating exercises...');
    const exercises = await Promise.all([
        prisma.exercise.create({
            data: { name: 'Bench Press', muscleGroup: 'Chest', userId: user1.user_id },
        }),
        prisma.exercise.create({
            data: { name: 'Squat', muscleGroup: 'Legs', userId: user1.user_id },
        }),
        prisma.exercise.create({
            data: { name: 'Deadlift', muscleGroup: 'Back', userId: user1.user_id },
        }),
        prisma.exercise.create({
            data: { name: 'Overhead Press', muscleGroup: 'Shoulders', userId: user2.user_id },
        }),
        prisma.exercise.create({
            data: { name: 'Pull-ups', muscleGroup: 'Back', userId: user2.user_id },
        }),
    ]);
    console.log(`✅ Created ${exercises.length} exercises\n`);

    // Create Workouts with Sets
    console.log('🏋️ Creating workouts...');
    const workout1 = await prisma.workout.create({
        data: {
            userId: user1.user_id,
            title: 'Chest Day',
            date: new Date('2024-12-01'),
            sets: {
                create: [
                    { exerciseId: exercises[0].id, reps: 10, weight: 60, rpe: 7, order: 1 },
                    { exerciseId: exercises[0].id, reps: 8, weight: 65, rpe: 8, order: 2 },
                    { exerciseId: exercises[0].id, reps: 6, weight: 70, rpe: 9, order: 3 },
                ],
            },
        },
    });

    const workout2 = await prisma.workout.create({
        data: {
            userId: user1.user_id,
            title: 'Leg Day',
            date: new Date('2024-12-02'),
            sets: {
                create: [
                    { exerciseId: exercises[1].id, reps: 5, weight: 100, rpe: 9, order: 1 },
                    { exerciseId: exercises[1].id, reps: 5, weight: 100, rpe: 9, order: 2 },
                    { exerciseId: exercises[1].id, reps: 5, weight: 100, rpe: 10, order: 3 },
                ],
            },
        },
    });

    const workout3 = await prisma.workout.create({
        data: {
            userId: user2.user_id,
            title: 'Upper Body',
            date: new Date('2024-12-01'),
            sets: {
                create: [
                    { exerciseId: exercises[3].id, reps: 8, weight: 40, rpe: 7, order: 1 },
                    { exerciseId: exercises[4].id, reps: 10, weight: null, rpe: 8, order: 2 },
                ],
            },
        },
    });
    console.log(`✅ Created ${3} workouts with sets\n`);

    // Create Attendance Records
    console.log('📅 Creating attendance records...');
    await prisma.attendance.create({
        data: {
            userId: user1.user_id,
            checkIn: new Date('2024-12-01T10:00:00'),
            checkOut: new Date('2024-12-01T11:30:00'),
            durationMinutes: 90,
        },
    });

    await prisma.attendance.create({
        data: {
            userId: user2.user_id,
            checkIn: new Date('2024-12-01T14:00:00'),
            checkOut: new Date('2024-12-01T15:15:00'),
            durationMinutes: 75,
        },
    });
    console.log(`✅ Created ${2} attendance records\n`);

    // Create Progress Logs
    console.log('📊 Creating progress logs...');
    await prisma.progressLog.create({
        data: {
            userId: user1.user_id,
            date: new Date('2024-12-01'),
            weight: 75.5,
            bodyFat: 15.2,
        },
    });

    await prisma.progressLog.create({
        data: {
            userId: user2.user_id,
            date: new Date('2024-12-01'),
            weight: 62.0,
            bodyFat: 22.5,
        },
    });
    console.log(`✅ Created ${2} progress logs\n`);

    // Create Categories
    console.log('🏷️  Creating product categories...');
    const categories = await Promise.all([
        prisma.category.create({
            data: { name: 'Supplements', description: 'Protein powders, vitamins, and more' },
        }),
        prisma.category.create({
            data: { name: 'Equipment', description: 'Gym equipment and accessories' },
        }),
        prisma.category.create({
            data: { name: 'Apparel', description: 'Workout clothes and shoes' },
        }),
    ]);
    console.log(`✅ Created ${categories.length} categories\n`);

    // Create Products
    console.log('🛍️  Creating products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Whey Protein Isolate',
                description: 'Premium quality whey protein isolate - 2kg',
                price: 49.99,
                stock: 100,
                imageUrl: 'https://example.com/whey-protein.jpg',
                categoryId: categories[0].id,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Creatine Monohydrate',
                description: 'Pure creatine monohydrate - 500g',
                price: 24.99,
                stock: 150,
                imageUrl: 'https://example.com/creatine.jpg',
                categoryId: categories[0].id,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Resistance Bands Set',
                description: 'Set of 5 resistance bands with different strengths',
                price: 29.99,
                stock: 75,
                imageUrl: 'https://example.com/resistance-bands.jpg',
                categoryId: categories[1].id,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Yoga Mat',
                description: 'Non-slip yoga mat with carrying strap',
                price: 34.99,
                stock: 50,
                imageUrl: 'https://example.com/yoga-mat.jpg',
                categoryId: categories[1].id,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Performance T-Shirt',
                description: 'Moisture-wicking athletic t-shirt',
                price: 19.99,
                stock: 200,
                imageUrl: 'https://example.com/tshirt.jpg',
                categoryId: categories[2].id,
            },
        }),
    ]);
    console.log(`✅ Created ${products.length} products\n`);

    // Create Cart Items
    console.log('🛒 Creating cart items...');
    await prisma.cartItem.create({
        data: {
            userId: user1.user_id,
            productId: products[0].id,
            quantity: 2,
        },
    });

    await prisma.cartItem.create({
        data: {
            userId: user1.user_id,
            productId: products[2].id,
            quantity: 1,
        },
    });
    console.log(`✅ Created ${2} cart items\n`);

    // Create Orders
    console.log('📦 Creating orders...');
    const order1 = await prisma.order.create({
        data: {
            userId: user2.user_id,
            totalAmount: 74.98,
            status: 'delivered',
            shippingAddress: '123 Main St, New York, NY 10001',
            items: {
                create: [
                    {
                        productId: products[1].id,
                        quantity: 2,
                        price: 24.99,
                    },
                    {
                        productId: products[4].id,
                        quantity: 1,
                        price: 19.99,
                    },
                ],
            },
        },
    });

    const order2 = await prisma.order.create({
        data: {
            userId: user1.user_id,
            totalAmount: 64.98,
            status: 'pending',
            shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
            items: {
                create: [
                    {
                        productId: products[3].id,
                        quantity: 1,
                        price: 34.99,
                    },
                    {
                        productId: products[2].id,
                        quantity: 1,
                        price: 29.99,
                    },
                ],
            },
        },
    });
    console.log(`✅ Created ${2} orders\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - ${2} Users`);
    console.log(`   - ${exercises.length} Exercises`);
    console.log(`   - ${3} Workouts`);
    console.log(`   - ${2} Attendance Records`);
    console.log(`   - ${2} Progress Logs`);
    console.log(`   - ${categories.length} Categories`);
    console.log(`   - ${products.length} Products`);
    console.log(`   - ${2} Cart Items`);
    console.log(`   - ${2} Orders`);
    console.log('\n✅ You can now test the APIs with this sample data!');
    console.log('📧 Test credentials:');
    console.log('   Email: john@fitfusion.com');
    console.log('   Password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
