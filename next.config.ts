import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  experimental: {
    globalNotFound: true
  },
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
