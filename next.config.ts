import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: ``,
  },

  images: {
    domains: ['img.clerk.com', 'static-00.iconduck.com', 'wckzanbwucgwxaywopxg.supabase.co'],
  }
}

export default nextConfig;
