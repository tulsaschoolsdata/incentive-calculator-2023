import { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'

export default function Document() {
  // window.__NEXT_DATA__.query.locale
  const currentLocale = i18nextConfig.i18n.defaultLocale

  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cfb7oxy.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
