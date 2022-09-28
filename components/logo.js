import Image from 'next/image'
import ColorLogoImage from '../public/images/TPS_Color.png'

export default function Logo() {
  return (
    <Image src={ColorLogoImage} alt={'Tulsa Public Schools - Logo'} />
  )
}
