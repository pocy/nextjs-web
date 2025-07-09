/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  // GitHub Pages 配置
  basePath: '/nextjs-web',
  assetPrefix: '/nextjs-web/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
