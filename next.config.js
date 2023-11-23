/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['components', 'models', 'features', 'adapters']
  }
  // images: {
  //   domains: ['i.insider.com', 'i.blogs.es', 'assetsio.reedpopcdn.com', 'media.istockphoto.com']
  // }
}

module.exports = nextConfig
