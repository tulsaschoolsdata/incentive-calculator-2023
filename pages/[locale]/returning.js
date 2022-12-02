import Calculator from '~/components/calculator'
import Link from '~/components/link'
import { Trans } from 'next-i18next'

import { getStaticPaths, makeStaticProps } from '~/lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function Returning() {
  return (
    <>
      <h1 className={'text-center'}><Trans>Retention Incentive Calculator</Trans></h1>

      <p className={'italic'}><Trans>This calculator is for returning employees of Team Tulsa. If you joined our team on or before June 30, we are talking to you! If you are a new employee, please <Link href={'/new-hire/'}>click here</Link> for a new hire incentive calculator.</Trans></p>

      <Calculator status={'returning'}>
        <p><Trans>Last spring, we announced a plan to pay all members of Team TPS a retention incentive for returning for the 2022-2023 school year. Nearly 95% of staff who committed to returning to Team Tulsa are still with us this school year. Thank you! This summer, we partnered with AFT and TCTA to finalize the details of a new compensation package. This negotiations included the retention incentive.</Trans></p>
        <p><Trans>This calculator is designed to give you an estimate of the amount and timing of your retention incentive. It gives you a good general sense, but it is not designed to consider all special circumstances.</Trans></p>
        <p><Trans>It <b>does</b> include information about all one-time incentives rewarding staff who were employed during the 2021-2022 school year and returned for the 2022-2023 school year.</Trans></p>
        <p><Trans>It <b>does not</b> include</Trans>:</p>
        <ul>
          <li><Trans>special circumstances such as employees on leave, part time employees, and employees who leave during the school year;</Trans></li>
          <li><Trans>other forms of compensation such as special duty stipends or routine raises;</Trans></li>
          <li><Trans>2022-2023 negotiated changes in compensation for exceptional student services staff working at school sites</Trans></li>
          <li><Trans>New stipends or incentives negotiated after August 2022</Trans></li>
        </ul>
        <p><Trans>We hope that you find this useful and that it helps answer the questions you may have about your pay. We are so grateful that you returned for another year on Team Tulsa.</Trans></p>
      </Calculator>
    </>
  )
}
