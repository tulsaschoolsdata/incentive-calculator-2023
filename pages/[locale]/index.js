import { Button } from '~/components/link'
import { Trans } from 'next-i18next'

import { getStaticPaths, makeStaticProps } from '~/lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function Home() {
  return (
    <>
      <h1 className={'text-center'}><Trans>New Hire and Retention Incentive Calculators</Trans></h1>

      <div className={'flex justify-center space-x-2'}>
        <Button href="/new-hire/">
          <Trans>New Hire for 22-23</Trans>
        </Button>
        <Button href="/returning/">
          <Trans>Returning for 22-23</Trans>
        </Button>
      </div>
    </>
  )
}
