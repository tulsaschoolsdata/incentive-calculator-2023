import Calculator from '~/components/calculator'

import { getStaticPaths, makeStaticProps } from '~/lib/get-static'
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

export default function NewHire() {
  return (
    <>
      <h1 className={'text-center'}>New Hire Incentive Calculator</h1>

      <Calculator status={'new hire'}>
        {/* TODO: replace with new hire incentive text */}
        <p className={'text-center text-red-600'}>WORK IN PROGRESS</p>
      </Calculator>
    </>
  )
}
