#!/bin/sh
# Railway start script

echo "🚀 Starting FitFusion Backend..."

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Start the server
echo "✅ Starting Express server..."
node src/index.js
