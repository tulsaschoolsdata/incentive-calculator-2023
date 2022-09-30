import Calculator from '../../components/calculator'
import { Trans } from 'next-i18next';

import { getStaticPaths, makeStaticProps } from '../../lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function Returning() {
  return (
    <>
      <h1 className={'text-center'}><Trans>Retention Incentive Calculator</Trans></h1>

      <Calculator status={'returning'}>
        <p><Trans>In April of 2022, you were asked to complete an intent to return form with the anticipation of a proposed incentive to be paid in or around October 2022.</Trans></p>
        <p><Trans>The proposal was approved and the incentive will be paid out over the coming months.</Trans></p>
        <p><Trans>Please note that this calculator is designed to give you an estimate of the dollar amount of your incentive and will not take any special circumstances into account.</Trans></p>
        <p><Trans>Additionally, these calculations only reflect retention incentive amounts for returning employees. Newly negotiated rates in TCTA and AFT agreements are not reflected in this total.</Trans></p>
      </Calculator>
    </>
  )
}
