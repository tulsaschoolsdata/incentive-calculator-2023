import React from 'react'
import { useRouter } from 'next/router'
import languageDetector from './language-detector'

export const useLanguageRedirect = (to) => {
  const router = useRouter()
  to = to || router.asPath

  // language detection
  React.useEffect(() => {
    const detectedLng = languageDetector.detect()
    if (to.startsWith('/' + detectedLng) && router.route === '/404') { // prevent endless loop
      router.replace('/' + detectedLng + router.route)
      return
    }

    languageDetector.cache(detectedLng)
    router.replace('/' + detectedLng + to)
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