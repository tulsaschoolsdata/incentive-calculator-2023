import languageDetector from '~/lib/language-detector'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { i18n } from '~/next-i18next.config'

const locale_r = new RegExp(`^/(?:${i18n.locales.join('|')})/`)

const LanguageLink = ({ locale }) => {
  const router = useRouter()
  const href = router.asPath.replace(locale_r, `/${locale}/`)
  const onClick = () => languageDetector.cache(locale)

  return (
    <Link href={href}>
      <a onClick={onClick}>{locale}</a>
    </Link>
  );
};

export default LanguageLink
