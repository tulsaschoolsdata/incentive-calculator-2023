// https://www.makeuseof.com/nextjs-google-analytics/

import React from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

const GTAG_R = /^G-[0-9A-Z]+$/

export const pageview = (id, page_path) => {
  window.gtag('config', id, { page_path })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export default function Gtag({id}) {
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url) => { pageview(id, url) }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => { router.events.off('routeChangeComplete', handleRouteChange) }
  }, [router.events, id])

  if (!GTAG_R.test(id)) {
    console.error('Invalid Google tag:', id)
    return null
  }

  const config = JSON.stringify(id)
  const search = new URLSearchParams({id})
  const src = `https://www.googletagmanager.com/gtag/js?${search}`

  return (
    <>
      <Script strategy="afterInteractive" src={src}></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${config}, {
              page_path: window.location.pathname,
            });
          `,
          }}
      />
    </>
  )
}
