import React from 'react'
import { useIncentiveReducer } from '../lib/incentives'

function money(number) {
  return '$' + (new Intl.NumberFormat().format(number))
}

function Radio({input, children, ...props}) {
  return <label><input type="radio" checked={input === props.value} {...props} /> {children}</label>
}

function RadioCheckbox({name, checked, onChange, children, ...props}) {
  const handleChange = (event) => {
    onChange({ target: { checked: event.target.value === 'yes' } })
  }

  const value = checked ? 'yes' : 'no'

  return (
    <div>
      <div>{children}</div>
      <div><Radio name={name} input={value} value={'no'} onChange={handleChange}>No</Radio></div>
      <div><Radio name={name} input={value} value={'yes'} onChange={handleChange}>Yes</Radio></div>
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
    'Secondary certified math, science or foreign language teacher',
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
              <h5>Are you a returning staff member or a new staff member this year?</h5>
              <div><Radio input={state.status} name="status" value="returning" onChange={changeHandler('status')}> Team member who worked at TPS in 21-22 and returned for the 22-23 school year</Radio></div>
              <div><Radio input={state.status} name="status" value="new hire" onChange={changeHandler('status')}> New team member who joined TPS for the 22-23 school-year</Radio></div>
            </div>
          )}

          {state.status && (
            <div>
              <h5>Do you work at a school site or a district site?</h5>
              <div><Radio input={state.contract} name="contract" value="school" onChange={changeHandler('contract')}> School</Radio></div>
              <div><Radio input={state.contract} name="contract" value="district-salary" onChange={changeHandler('contract')}> District Administrative</Radio></div>
              <div><Radio input={state.contract} name="contract" value="district-hourly" onChange={changeHandler('contract')}> District Operations</Radio></div>

              <dl className={'text-xs'}>
                <dt>school</dt>
                <dd>
                  If you report to a school site every day, we are talking about you!
                </dd>
                <dt>district administrative</dt>
                <dd>
                  Administrative staff who work at the Education Service Center, Grant Building, Wilson Teaching and Learning, or Enrollment Center.
                </dd>
                <dt>district operations</dt>
                <dd>
                  Operations and support professionals and administrative staff including facilities and plant operations, maintenance, grounds, child nutrition, transportation, or campus police.
                </dd>
              </dl>
            </div>
          )}

          {state.contract === 'school' && (
            <div>
              <h5>Which of the following position groups represents your current position?</h5>
              <div><Radio input={state.school_based_role} name="school_based_role" value="certified teacher" onChange={changeHandler('school_based_role')}> Certified teacher</Radio></div>
              {state.status === 'new hire' && (
                <div><Radio input={state.school_based_role} name="school_based_role" value="certified psychometrist" onChange={changeHandler('school_based_role')}> Certified psychometrist, psychologist, occupational therapist, speech pathologist</Radio></div>
              )}
              <div><Radio input={state.school_based_role} name="school_based_role" value="support staff" onChange={changeHandler('school_based_role')}> Support professional</Radio></div>

              <dl className={'text-xs'}>
                <dt>certified teacher</dt>
                <dd>certified teacher working in a school building</dd>
                <dd>apprentice teachers are not eligible</dd>
                <dt>support professional</dt>
                <dd>teacher assistant, front office staff, paraprofessional, nurses, health assistants, custodial, child nutrition, before/after learning</dd>
              </dl>
            </div>
          )}

          {Boolean(checkboxes.length) && checkboxes.map(([name, text])=> (
            <div key={name}>
              <RadioCheckbox name={name} checked={state[name]} onChange={checkboxChangeHandler(name)}>
                <h5>{text}</h5>
              </RadioCheckbox>
            </div>
          ))}

          <div className={'actions'}>
            <button onClick={() => setStep(3)} disabled={!canCalculate}>Calculate</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          {children}

          <div>
            <h5>You selected:</h5>
            <ul>
              {state.status === 'returning' && (<li>Returning for the 22-23 school year</li>)}
              {state.status === 'new hire' && (<li>A new hire for the 22-23 school year</li>)}
              {state.fuse ? (<li>Work at Celia Clinton Elementary, John Hope Franklin Elementary, Hawthorne Elementary, Whitman Elementary, Central Middle, or Central High</li>) : (
                <>
                  {state.contract === 'school' && (<li>Work at a school</li>)}
                  {state.contract === 'district-salary' && (<li>District administrative staff working at the Education Service Center, Grant Building, Wilson Teaching and Learning, or Enrollment Center</li>)}
                  {state.contract === 'district-hourly' && (<li>District operations and support professionals and administrative staff including facilities and plant operations, maintenance, grounds, child nutrition, transportation, or campus police</li>)}
                </>
              )}
              {state.school_based_role === 'support staff' && (<li>A support professional</li>)}
              {state.school_based_role === 'certified teacher' && (<li>A certified teacher</li>)}
              {state.school_based_role === 'certified psychometrist' && (<li>A certified psychometrist, psychologist, occupational therapist, speech pathologist</li>)}
              {state.exceptional && (<li>Teach in an Exceptional Student Services role</li>)}
              {state.certified_secondary && (<li>Secondary certified math, science or foreign language teacher</li>)}
              {state.certified_sped && (<li>Certified special education</li>)}
              {state.parapro && (<li>Serving as a paraprofessional with a Level III or Level IV Parapro certification</li>)}
            </ul>
          </div>
          {(Boolean(incentives.length) || oneTimeIncentive) ? (
            <div>
              <h5>Qualified incentives:</h5>
              <ul>
                {incentives.map(([incentive, amount], i) => (
                  <li key={i}>{money(amount)} {incentive.name}</li>
                ))}
                {oneTimeIncentive && (
                  <li>One-time incentive, 5% of salary</li>
                )}
              </ul>
              <div className={'my-4 py-4 border-t border-black font-bold text-2xl text-center'}>
                {money(incentiveTotal)}{' '}total incentive{oneTimeIncentive && (' plus one-time 5% of salary incentive')}
              </div>
            </div>
          ) : (
            <div>Welcome to Team Tulsa! We are glad you joined our team. At this time, there is no hiring incentive for new district office staff members.</div>
          )}

          <div className={'actions'}>
            <button onClick={startOver}>Start Over</button>
          </div>
        </div>
      )}
    </>
  )
}
