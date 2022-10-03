import React from 'react'
import '../styles/globals.css'
import Layout from '../components/layout'

import { appWithTranslation, useTranslation } from 'next-i18next'
import nextI18nConfig from '../next-i18next.config'

function MyApp({ Component, pageProps }) {
  const { ready } = useTranslation()

  return ready && (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp, nextI18nConfig)
