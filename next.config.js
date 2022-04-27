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
  env: {
    MONGODB_URI:
      "mongodb+srv://Angas:AngasPassword@cluster0.cnqnq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    DB_NAME: "hawkeye",
    DEV_URL: "http://localhost:3000",
    PROD_URL: "",
    JWT_SECRET_KEY:
      "KEYKEY9d7c5245015e6bed7d5813d7e4edf3f42c279e29e00d82b9KEYKEY",

    NODEMAILER_SERVICE: "gmail",
    NODEMAILER_EMAIL: "no.reply.astig03@gmail.com",
    NODEMAILER_PASSWORD: '4-DKHydYFhmX;}"',
    NODEMAILER_SUPER_ADMIN: "astig03.Aadmiin@gmail.com",
  },
};
