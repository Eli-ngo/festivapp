/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = nextConfig

module.exports = {
  env: {
    CLOUDINARY_CLOUD_NAME: 'elingo',
    CLOUDINARY_API_KEY: '892616949697152',
    CLOUDINARY_SECRET_KEY: 'z4gUvKUuIikZQ2a1ibfaHmoWrwY'
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}
