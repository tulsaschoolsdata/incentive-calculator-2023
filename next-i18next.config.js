// const HttpBackend = require('i18next-http-backend/cjs')
// const ChainedBackend = require('i18next-chained-backend').default
// const LocalStorageBackend = require('i18next-localstorage-backend').default

const debug = process.env.NODE_ENV === 'development'
// const expirationTime = debug ? 1 : 60 * 60 * 1000 // 1 hour
// const undefinedWindow = typeof window === 'undefined'

module.exports = {
  debug,
  // backend: {
  //   backendOptions: [{ expirationTime }, { /* loadPath: 'https:// somewhere else' */ }],
  //   backends: undefinedWindow ? [] : [LocalStorageBackend, HttpBackend],
  // },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  // serializeConfig: false,
  // use: undefinedWindow ? [] : [ChainedBackend],
}
