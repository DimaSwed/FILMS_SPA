/** @type {import('next').NextConfig} */
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.kinopoisk.dev',
        port: '',
        pathname: '/v1.4/movie/**'
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'films-spa-dimas-projects-c1a0dfa7.vercel.app',
        port: '',
        pathname: '/logomain.jpg'
      }
    ]
  }
}

export default nextConfig
