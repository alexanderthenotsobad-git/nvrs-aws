/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig