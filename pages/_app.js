import React from 'react'
import '~/styles/globals.css'
import Layout from '~/components/layout'

import { appWithTranslation, useTranslation } from 'next-i18next'
import nextI18nConfig from '~/next-i18next.config'
import Gtag from '~/components/gtag'

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID

function MyApp({ Component, pageProps }) {
  const { ready } = useTranslation()

  return ready && (
    <>
      {GTAG_ID && <Gtag id={GTAG_ID} />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18nConfig)
