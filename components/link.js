import Link from 'next/link'
import { useRouter } from 'next/router'

const LinkComponent = ({ component, children, ...props }) => {
  const router = useRouter()
  const locale = props.locale || router.query.locale || ''
  const skipLocaleHandling = props.skipLocaleHandling || !locale || props.href.indexOf('http') === 0
  const href = skipLocaleHandling ? props.href : `/${locale}/${props.href.replace(/^\/+/, '')}`

  return (
    <>
      <Link {...props} href={href}>
        {children}
      </Link>
    </>
  )
}

export default LinkComponent
