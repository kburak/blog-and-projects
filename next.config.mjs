/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.pixabay.com',
          },
          {
            protocol: 'https',
            hostname: 'i.ytimg.com',
          }
        ],
      },
};

export default nextConfig;
