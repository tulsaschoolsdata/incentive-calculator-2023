import Calculator from '../components/calculator'

export default function Returning() {

  return (
    <>
      <h1 className={'text-center'}>Retention Incentive Calculator</h1>

      <Calculator status={'returning'}>
        <p>In April of 2022, you were asked to complete an intent to return form with the anticipation of a proposed incentive to be payed in or around October 2022.</p>
        <p>The proposal was approved and the incentive will be payed out over the coming months.</p>
        <p>Please note that this calculator is designed to give you an estimate of the dollar amount of your incentive and will not take any special circumstances into account.</p>
        <p>Additionally, these calculations only reflect retention incentive amounts for returning employees. Newly negotiated rates in TCTA and AFT agreements are not reflected in this total.</p>
      </Calculator>
    </>
  )
}
