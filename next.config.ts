import type { NextConfig } from "next";

const svgrLoader = {
  loader: "@svgr/webpack",
  options: {
    icon: true,
    svgo: true,
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: { overrides: { removeViewBox: false } },
        },
      ],
    },
    replaceAttrValues: {
      "#5A636B": "currentColor",
      "#B5BFC9": "currentColor",
    },
  },
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [svgrLoader],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [svgrLoader],
    });
    return config;
  },
};

export default nextConfig;
