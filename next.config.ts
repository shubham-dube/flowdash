import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*', 
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://team-app-fad7f.firebaseapp.com',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      { source: '/dashboard', destination: '/protected/dashboard' },
      { source: '/profile', destination: '/protected/profile' },
      { source: '/tasks', destination: '/protected/tasks' },
    ];
  },
};
