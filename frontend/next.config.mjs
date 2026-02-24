/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,
  
  turbopack: {},
  
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'swiper', 'leaflet', 'react-leaflet'],
  },
};

export default nextConfig;
