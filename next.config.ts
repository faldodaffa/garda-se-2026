import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://elfsightcdn.com https://static.elfsight.com https://www.youtube.com https://s.ytimg.com https://www.instagram.com https://www.embedista.com https://s.electricblaze.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://static.elfsight.com https://www.instagram.com;
  img-src 'self' blob: data: https://webapi.bps.go.id https://*.ytimg.com https://*.ggpht.com https://*.elfsight.com https://static.elfsight.com https://*.cdninstagram.com https://*.fbcdn.net https://*.electricblaze.com;
  font-src 'self' data: https://fonts.gstatic.com https://static.elfsight.com;
  connect-src 'self' https://*.supabase.co https://core.elfsight.com https://static.elfsight.com https://api.electricblaze.com;
  frame-src 'self' https://www.youtube.com https://*.elfsight.com https://*.elfsight.io https://www.instagram.com https://*.instagram.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader.replace(/\n/g, '') },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
        ],
      },
    ];
  },
};

export default nextConfig;
