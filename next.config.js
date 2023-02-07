const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const http = require('./http')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  return {
  reactStrictMode: true,
  headers: async () => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
      return http.headers.development
    }

    return http.headers.production
  },
}
}

module.exports = nextConfig
