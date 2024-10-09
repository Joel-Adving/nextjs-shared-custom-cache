module.exports = function createFileSystemCacheHandler({ cacheDir }) {
  const fs = require('fs').promises
  const path = require('path')
  return {
    async get(key) {
      try {
        const filePath = path.join(cacheDir, key)
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
      } catch {
        return null
      }
    },
    async set(key, value) {
      try {
        const filePath = path.join(cacheDir, key)
        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, JSON.stringify(value))
      } catch (error) {
        console.error('Error writing cache file:', error)
      }
    },
    async delete(key) {
      try {
        const filePath = path.join(cacheDir, key)
        await fs.unlink(filePath)
      } catch {}
    }
  }
}
