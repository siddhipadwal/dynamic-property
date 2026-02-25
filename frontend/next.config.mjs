/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,
  
  turbopack: {},
  
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'swiper', 'leaflet', 'react-leaflet'],
  },
  
  // Ensure environment variables are available at runtime
  // Default to 127.0.0.1 to fix IPv6 issue on Hostinger
  env: {
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    FROM_EMAIL: process.env.FROM_EMAIL,
    TO_EMAIL: process.env.TO_EMAIL,
    TO_EMAIL_2: process.env.TO_EMAIL_2,
  },
};

export default nextConfig;
