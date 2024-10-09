export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerInitialCache } = await import('@neshca/cache-handler/instrumentation')
    const CacheHandler = (await import('./cache-handler.js')).default

    await registerInitialCache(CacheHandler, {
      // By default, it populates the cache with pre-rendered pages, routes, and fetch calls.
      // You can disable these features by setting the options to false.
      // For example, if you want to populate the cache with only pre-rendered pages, you can set the options as follows:
      fetch: false,
      routes: false
    })
  }
}
