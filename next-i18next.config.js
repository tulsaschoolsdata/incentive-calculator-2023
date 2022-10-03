const debug = process.env.NODE_ENV === 'development'

module.exports = {
  debug,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
}
