import Calculator from '~/components/calculator'
import Link from '~/components/link'
import { Trans } from 'next-i18next'

import { getStaticPaths, makeStaticProps } from '~/lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function NewHire() {
  return (
    <>
      <h1 className={'text-center'}><Trans>New Hire Incentive Calculator</Trans></h1>

      <p><Trans>This calculator is for any new members of Team Tulsa. If you joined our team after June 30, we are talking to you! If you are a returning employee, please <Link href={'/returning'}>click here</Link> for a retention incentive calculator.</Trans></p>

      <Calculator status={'new hire'}>
        <p><Trans>This is designed to give you an estimate of the amount and timing of your recruitment incentive. It gives you a good general sense, but it is not designed to consider all special circumstances.</Trans></p>
        <p><Trans>We are offering this as a fast and easy way to understand your likely new hire incentive. It gives you a good general sense, but it is not designed to consider all special circumstances.</Trans></p>
        <p><Trans>It <b>does</b> include information about all one-time recruitment incentives rewarding staff who joined Team Tulsa during 2022-2023 school year.</Trans></p>
        <p><Trans>It <b>does not</b> include:</Trans></p>
        <ul>
          <li><Trans>special circumstances such as employees on leave, part time employees, and employees who leave during the school year;</Trans></li>
          <li><Trans>other forms of compensation such as special duty stipends or routine raises;</Trans></li>
          <li><Trans>2022-2023 negotiated changes in compensation for exceptional student services staff working at school sites</Trans></li>
          <li><Trans>New stipends or incentives negotiated after August 2022</Trans></li>
        </ul>
        <p><Trans>We hope that you find this useful and that it helps answer questions about your pay. We are so grateful that you joined Team Tulsa for this school year.</Trans></p>
      </Calculator>
    </>
  )
}
