const nextBuildId = require('next-build-id')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  cacheHandler: process.env.NODE_ENV === 'production' ? require.resolve('./cache-handler.js') : undefined,
  experimental: {
    instrumentationHook: true
  },
  generateBuildId: () => {
    return nextBuildId({ dir: __dirname, describe: true })
  }
}

module.exports = nextConfig
