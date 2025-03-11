import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: [
    '@duck/registry-ui-duckui',
    '@duck/registry-examples-duckui',
  ],
}

export default nextConfig
