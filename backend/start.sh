#!/bin/sh
# Railway start script that runs migrations before starting the server

echo "🚀 Starting FitFusion Backend..."

# Run Prisma migrations
echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Start the server
echo "✅ Starting Express server..."
node src/index.js
