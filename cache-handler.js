const { CacheHandler } = require('@neshca/cache-handler')
const createRedisHandler = require('@neshca/cache-handler/redis-stack').default
const createLruHandler = require('@neshca/cache-handler/local-lru').default
const { createClient } = require('redis')
const createFileSystemCacheHandler = require('./file-system-cache-handler')

CacheHandler.onCreation(async () => {
  if (process.env.USE_FILE_CACHE === 'true') {
    // Use the file-based cache handler during the build
    console.log('Using file-based cache handler during build.')
    const handler = createFileSystemCacheHandler({ cacheDir: '/app/.next/cache/' })
    return {
      handlers: [handler]
    }
  }

  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set.')
  }

  // Runtime configuration: use Redis
  let client

  try {
    client = createClient({
      url: redisUrl
    })

    client.on('error', (error) => {
      console.error('Redis client error:', error)
    })

    await client.connect()
    console.info('Redis client connected.')

    const handler = await createRedisHandler({
      client,
      keyPrefix: 'static-page:',
      timeoutMs: 1000
    })

    return {
      handlers: [handler]
    }
  } catch (error) {
    console.warn('Failed to connect to Redis:', error)
    if (client) {
      await client.disconnect()
    }

    const handler = createLruHandler()
    console.warn('Using in-memory LRU cache as fallback.')

    return {
      handlers: [handler]
    }
  }
})

module.exports = CacheHandler
