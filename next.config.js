module.exports = {
  env: {
    NEXT_PUBLIC_APOLLO_URI: process.env.NEXT_PUBLIC_APOLLO_URI,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_CALLBACK_AUTH: process.env.NEXT_PUBLIC_CALLBACK_AUTH,
  },
  reactStrictMode: false,
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
  },
};
