import { useLanguageRedirect } from '~/lib/language-redirect'

export default function Custom404() {
  useLanguageRedirect()

  return (
    <>
      <h1 className={'text-center'}>Page Not Found</h1>
    </>
  )
}
