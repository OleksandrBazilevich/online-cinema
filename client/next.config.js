/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_SECRET: process.env.REACT_APP_SECRET,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.1.4:4200/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://192.168.1.4:4200/uploads/:path*',
      },
    ]
  },
}

module.exports = nextConfig
