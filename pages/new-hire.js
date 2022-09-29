import Calculator from '../components/calculator'

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
