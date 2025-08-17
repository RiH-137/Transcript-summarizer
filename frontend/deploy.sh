#!/bin/bash

# Deployment script for Vercel
echo "🚀 Starting deployment to Vercel..."

# Set environment variables
export NEXT_PUBLIC_API_BASE_URL=https://transcript-summarizer-backend-ipi6.onrender.com
export NODE_ENV=production

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
