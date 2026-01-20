import type { NextConfig } from "next";
import nextra from 'nextra'

const withNextra = nextra({

})

const nextConfig: NextConfig = {
  reactCompiler: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  }
};

export default withNextra(nextConfig);
