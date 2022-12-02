import Image from 'next/image'
import ColorLogoImage from '~/public/images/tps-logo-color.svg'

export default function Logo() {
  return (
    <Image src={ColorLogoImage} alt={'Tulsa Public Schools - Logo'} />
  )
}
