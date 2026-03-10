import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin root to this project directory to avoid Turbopack scanning parent dirs
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
