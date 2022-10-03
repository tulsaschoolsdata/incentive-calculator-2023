import React from 'react'
import { useRouter } from 'next/router'
import languageDetector from './language-detector'

const debug = process.env.NODE_ENV === 'development'

export const useLanguageRedirect = (to) => {
  const router = useRouter()
  const path = to || router.asPath

  // language detection
  React.useEffect(() => {
    const detectedLng = languageDetector.detect()

    if (!path.startsWith(`/${detectedLng}`) && router.route !== '/404') {
      languageDetector.cache(detectedLng)

      const url = `/${detectedLng}${path}`
      if (debug) {
        window.location = url
      } else {
        router.replace(url)
      }
    }
  })

  return <></>
};

export const LanguageRedirect = () => {
  useLanguageRedirect()

  return <></>
}

// eslint-disable-next-line react/display-name
export const getLanguageRedirect = (to) => () => {
  useLanguageRedirect(to)

  return <></>
}
