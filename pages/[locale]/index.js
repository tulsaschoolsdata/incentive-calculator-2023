import Link from '../../components/link'
import { Trans } from 'next-i18next'

import { getStaticPaths, makeStaticProps } from '../../lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function Home() {
  return (
    <>
      <h1 className={'text-center'}><Trans>Retention Incentive Calculator</Trans></h1>

      <div className={'flex justify-center space-x-2'}>
        <Link href="/returning">
          <button><Trans>Returning for 22-23</Trans></button>
        </Link>
      </div>
    </>
  )
}
