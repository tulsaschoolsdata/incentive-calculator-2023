import Head from 'next/head'
import { useRouter } from 'next/router'
import Logo from './logo'
import { useTranslation } from 'next-i18next'
import LanguageLink from './language-link'
import { i18n } from '../next-i18next.config'

export default function Layout({ children }) {
  const router = useRouter()
  const { t } = useTranslation()
  const currentLocale = router.query.locale || i18n.defaultLocale
  const title = `Tulsa Public Schools - ${t('Retention Incentive Calculator')}`

  return (
    <div className={'container max-w-3xl flex flex-col min-h-full'}>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <div className={'mx-auto relative p-8 w-40'}>
          <Logo />
        </div>
      </header>

      <main className={'flex-grow'}>
        {children}
      </main>

      <footer>
        <p className={'flex justify-center space-x-2'}>
          {i18n.locales.map((locale) => (
            (locale === currentLocale) ? (
              <span key={locale}>{locale}</span>
            ) : (
              <LanguageLink key={locale} locale={locale} />
            )
          ))}
        </p>
      </footer>
    </div>
  )
}
