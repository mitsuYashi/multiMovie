const isProd = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  presets: ["next/babel"],
  images: {
    domains: ["i.ytimg.com"],
  },
  env: {
    originAPI: isProd ? "http://localhost:3000" : "",
  },
};
