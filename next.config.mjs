/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatar.vercel.sh' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.137.147:3000',
    '192.168.137.147'
  ]
}

export default nextConfig
