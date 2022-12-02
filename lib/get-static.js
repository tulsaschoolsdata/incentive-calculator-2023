import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '~/next-i18next.config'

export const getI18nPaths = () => (
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng
    }
  }))
)

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
})

export async function getI18nProps(ctx, ns = ['common']) {
  const locale = ctx?.params?.locale
  return {
    ...(await serverSideTranslations(locale, ns))
  }
}

export function makeStaticProps(ns = {}) {
  return async function getStaticProps(ctx) {
    return {
      props: await getI18nProps(ctx, ns)
    }
  }
}

export function makeStaticPaths(paths = []) {
  const staticPaths = getStaticPaths()

  staticPaths.paths = staticPaths.paths.flatMap((i18nPath) => {
    return paths.map(path => {
      const params = {...i18nPath.params, ...path.params}
      return {...i18nPath, ...path, params}
    })
  })

  return () => staticPaths
}
