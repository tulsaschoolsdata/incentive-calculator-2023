import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const a = React.forwardRef(
  function a({href, ...props}, ref) {
    return <a ref={ref} href={href} {...props} />
  }
)

const button = React.forwardRef(
  function button(props, ref) {
    return <button ref={ref} {...props} />
  }
)

const LinkComponent = ({ Component, children, ...props }) => {
  const router = useRouter()
  const locale = props.locale || router.query.locale || ''
  const skipLocaleHandling = props.skipLocaleHandling || !locale || props.href.indexOf('http') === 0
  const href = skipLocaleHandling ? props.href : `/${locale}/${props.href.replace(/^\/+/, '')}`

  return (
    <NextLink {...props} href={href} passHref={Component === a}>
      <Component>{children}</Component>
    </NextLink>
  )
}

export const Link = (props) => <LinkComponent Component={a} {...props} />
export const Button = (props) => <LinkComponent Component={button} {...props} />

export default Link
