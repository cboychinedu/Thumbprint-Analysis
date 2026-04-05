/** @type {import('next').NextConfig} */
// Creating the next config 
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: 'build', 
  devIndicators: false, 
  images: {
    formats: ['image/avif', 'image/webp'],
  }, 
};

// Exporting the next config 
export default nextConfig;
