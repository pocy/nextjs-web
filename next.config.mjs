/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  // GitHub Pages 配置
  basePath: process.env.NODE_ENV === 'production' ? '/nextjs-web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nextjs-web/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
