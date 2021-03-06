/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  cssModules: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  async rewrites() {
    /// proxying to dev server
    return [
      {
        source: '/api/aws/:path*',
        destination: 'https://dev2.strata-api.cc/:path*', // Proxy to Backend
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: {
            extension: '.module.scss',
          },
        },
      ],
    })

    return config
  },
})
