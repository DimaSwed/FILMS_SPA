/** @type {import('next').NextConfig} */
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['image.openmoviedb.com']
  }
}

export default nextConfig
