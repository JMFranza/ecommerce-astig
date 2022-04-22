/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  exportPathMap: async function () {
    const paths = {
      "/": { page: "/" },
    };
    return paths; //<--this was missing previously
  },
  // env: {
  //   MONGODB_URI:
  //     "mongodb+srv://movie_haus:123@cluster0.t14et.mongodb.net/hawkeye?retryWrites=true&w=majority",
  //   DB_NAME: "hawkeye",
  //   DEV_URL: "http://localhost:3000",
  //   PROD_URL: "",
  //   JWT_SECRET_KEY: "KEYKEY",
  // },
};
