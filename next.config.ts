import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'team-app-fad7f.firebaseapp.com/', 
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
          {
            key: 'Access-Control-Allow-Origin',
            value: 'accounts.google.com/', 
          },
         
        ],
      },
    ];
  },
};

export default nextConfig;