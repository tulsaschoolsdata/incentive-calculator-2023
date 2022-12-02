import React from 'react'
import { Trans, useTranslation } from 'next-i18next'
import { useIncentiveReducer } from '~/lib/incentives'

function money(number) {
  return '$' + (new Intl.NumberFormat().format(number))
}

function Radio({input, children, ...props}) {
  return <label><input type="radio" checked={input === props.value} {...props} /> {children}</label>
}

function RadioCheckbox({name, checked, onChange, children}) {
  const handleChange = (event) => {
    onChange({ target: { checked: event.target.value === 'yes' } })
  }

  const value = checked ? 'yes' : 'no'

  return (
    <div>
      <div>{children}</div>
      <div><Radio name={name} input={value} value={'no'} onChange={handleChange}><Trans>No</Trans></Radio></div>
      <div><Radio name={name} input={value} value={'yes'} onChange={handleChange}><Trans>Yes</Trans></Radio></div>
    </div>
  )
}

const CHECKBOXES = [
  [
    'fuse',
    'Do you work at Celia Clinton Elementary, John Hope Franklin Elementary, Hawthorne Elementary, Whitman Elementary, Central Middle, or Central High?',
    state => ['support staff', 'certified teacher'].includes(state.school_based_role),
  ],
  [
    'exceptional',
    'Do you teach in an Exceptional Student Services role? This includes ESS teachers, school psychologists, psychometrists, occupational therapists, speech pathologists, and compliance specialists.',
    state => state.status === 'returning' && state.school_based_role === 'certified teacher',
  ],
  [
    'certified_secondary',
    'Secondary certified math, science or world language teacher',
    state => state.status === 'new hire' && state.school_based_role === 'certified teacher',
  ],
  [
    'certified_sped',
    'Certified special education',
    state => state.status === 'new hire' && state.school_based_role === 'certified teacher',
  ],
  [
    'parapro',
    'Are you serving as a paraprofessional with a Level III or Level IV Parapro certification?',
    state => state.status === 'new hire' && state.school_based_role === 'support staff',
  ],
]

export default function Calculator({status, children}) {
  const { t } = useTranslation()
  const [step, setStep] = React.useState(1)

  const {
    state,
    dispatch,
    incentives,
    incentiveTotal,
    oneTimeIncentive,
  } = useIncentiveReducer({ status })

  function changeHandler(name) {
    return function (event) {
      dispatch({type: 'update', payload: {[name]: event.target.value}})
    }
  }

  function checkboxChangeHandler(name) {
    return function (event) {
      dispatch({type: 'update', payload: {[name]: event.target.checked}})
    }
  }

  function startOver() {
    dispatch({type: 'reset', payload: { status }})
    setStep(2)
  }

  const checkboxes = CHECKBOXES.filter(([_name, _text, f]) => f(state))
  const canCalculate = Boolean(state.contract === 'school' ? state.school_based_role : state.contract)

  return (
    <>
      {step === 1 && (
        <>
          {children}
          <div className={'actions'}>
            <button onClick={() => setStep(2)}>Begin</button>
          </div>
        </>
      )}

      {step === 2 && (
        <form className={'flex flex-col space-y-4'}>
          {typeof status === 'undefined' && (
            <div>
              <h5><Trans>Are you a returning staff member or a new staff member this year?</Trans></h5>
              <div><Radio input={state.status} name="status" value="returning" onChange={changeHandler('status')}> <Trans>Team member who worked at TPS in 21-22 and returned for the 22-23 school year</Trans></Radio></div>
              <div><Radio input={state.status} name="status" value="new hire" onChange={changeHandler('status')}> <Trans>New team member who joined TPS for the 22-23 school-year</Trans></Radio></div>
            </div>
          )}

          {state.status && (
            <div>
              <h5><Trans>Do you work at a school site or a district site?</Trans></h5>
              <div><Radio input={state.contract} name="contract" value="school" onChange={changeHandler('contract')}> <Trans>School</Trans></Radio></div>
              <div><Radio input={state.contract} name="contract" value="district-salary" onChange={changeHandler('contract')}> <Trans>District Administrative</Trans></Radio></div>
              <div><Radio input={state.contract} name="contract" value="district-hourly" onChange={changeHandler('contract')}> <Trans>District Operations</Trans></Radio></div>

              <dl className={'text-xs'}>
                <dt><Trans>school</Trans></dt>
                <dd>
                  <Trans>If you report to a school site every day, we are talking about you!</Trans>
                </dd>
                <dt><Trans>district administrative</Trans></dt>
                <dd>
                  <Trans>Administrative staff who work at the Education Service Center, Grant Building, Wilson Teaching and Learning, or Enrollment Center.</Trans>
                </dd>
                <dt><Trans>district operations</Trans></dt>
                <dd>
                  <Trans>Operations and support professionals and administrative staff including facilities and plant operations, maintenance, grounds, child nutrition, transportation, or campus police.</Trans>
                </dd>
              </dl>
            </div>
          )}

          {state.contract === 'school' && (
            <div>
              <h5><Trans>Which of the following position groups represents your current position?</Trans></h5>
              <div><Radio input={state.school_based_role} name="school_based_role" value="certified teacher" onChange={changeHandler('school_based_role')}> <Trans>Certified teacher</Trans></Radio></div>
              {state.status === 'new hire' && (
                <div><Radio input={state.school_based_role} name="school_based_role" value="certified psychometrist" onChange={changeHandler('school_based_role')}> <Trans>Certified psychometrist, psychologist, occupational therapist, speech pathologist</Trans></Radio></div>
              )}
              <div><Radio input={state.school_based_role} name="school_based_role" value="support staff" onChange={changeHandler('school_based_role')}> <Trans>Support professional</Trans></Radio></div>

              <dl className={'text-xs'}>
                <dt><Trans>certified teacher</Trans></dt>
                <dd><Trans>certified teacher working in a school building</Trans></dd>
                <dt><Trans>support professional</Trans></dt>
                <dd><Trans>teacher assistant, front office staff, paraprofessional, nurses, health assistants, custodial, child nutrition, before/after learning</Trans></dd>
              </dl>
            </div>
          )}

          {Boolean(checkboxes.length) && checkboxes.map(([name, text])=> (
            <div key={name}>
              <RadioCheckbox name={name} checked={state[name]} onChange={checkboxChangeHandler(name)}>
                <h5>{t(text)}</h5>
              </RadioCheckbox>
            </div>
          ))}

          <div className={'actions'}>
            <button onClick={() => setStep(3)} disabled={!canCalculate}><Trans>Calculate</Trans></button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          {children}

          <div>
            <h5><Trans>You selected:</Trans></h5>
            <ul>
              {state.status === 'returning' && (<li><Trans>Returning for the 22-23 school year</Trans></li>)}
              {state.status === 'new hire' && (<li><Trans>A new hire for the 22-23 school year</Trans></li>)}
              {state.fuse ? (<li><Trans>Work at Celia Clinton Elementary, John Hope Franklin Elementary, Hawthorne Elementary, Whitman Elementary, Central Middle, or Central High</Trans></li>) : (
                <>
                  {state.contract === 'school' && (<li><Trans>Work at a school</Trans></li>)}
                  {state.contract === 'district-salary' && (<li><Trans>District administrative staff working at the Education Service Center, Grant Building, Wilson Teaching and Learning, or Enrollment Center</Trans></li>)}
                  {state.contract === 'district-hourly' && (<li><Trans>District operations and support professionals and administrative staff including facilities and plant operations, maintenance, grounds, child nutrition, transportation, or campus police</Trans></li>)}
                </>
              )}
              {state.school_based_role === 'support staff' && (<li><Trans>A support professional</Trans></li>)}
              {state.school_based_role === 'certified teacher' && (<li><Trans>A certified teacher</Trans></li>)}
              {state.school_based_role === 'certified psychometrist' && (<li><Trans>A certified psychometrist, psychologist, occupational therapist, speech pathologist</Trans></li>)}
              {state.exceptional && (<li><Trans>Teach in an Exceptional Student Services role</Trans></li>)}
              {state.certified_secondary && (<li><Trans>Secondary certified math, science or world language teacher</Trans></li>)}
              {state.certified_sped && (<li><Trans>Certified special education</Trans></li>)}
              {state.parapro && (<li><Trans>Serving as a paraprofessional with a Level III or Level IV Parapro certification</Trans></li>)}
            </ul>
          </div>
          {(Boolean(incentives.length) || oneTimeIncentive) ? (
            <div>
              <h5><Trans>Qualified incentives:</Trans></h5>
              <ul>
                {incentives.map(([incentive, amount], i) => (
                  <li key={i}>{money(amount)} {t(incentive.name)}</li>
                ))}
                {oneTimeIncentive && (
                  <li><Trans>One-time incentive, 5% of salary</Trans></li>
                )}
              </ul>
              <div className={'my-4 py-4 border-t font-bold text-2xl text-center border-gray-800 dark:border-white'}>
                {money(incentiveTotal)}{' '}{t('total incentive')}{' '}{oneTimeIncentive && (t('plus one-time 5% of salary incentive'))}
              </div>
            </div>
          ) : (
            <div><Trans>Welcome to Team Tulsa! We are glad you joined our team. At this time, there is no hiring incentive for new district office staff members.</Trans></div>
          )}

          <div className={'actions'}>
            <button onClick={startOver}><Trans>Start Over</Trans></button>
          </div>
        </div>
      )}
    </>
  )
}
