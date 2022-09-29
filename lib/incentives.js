import React from 'react'

export const INCENTIVES = [
  {
    name: 'Retention incentive based on submitted Intent to Return form in April 2022',
    label: 'retention incentive',
    qualify: function (state) {
      if (state.status === 'returning') {
        if (state.school_based_role === 'support staff') return 1000;
        if (state.school_based_role === 'certified teacher') return 2000;
        if (state.contract === 'district-salary') return 1000;
        if (state.contract === 'district-hourly') return 1000;
      }
    }
  },
  {
    name: 'New hire incentive',
    label: 'new hire incentive',
    qualify: function (state) {
      if (state.status === 'new hire') {
        if (state.school_based_role === 'support staff') return 1500;
        if (state.school_based_role === 'certified teacher') return 2000;
        if (state.school_based_role === 'certified psychometrist') return 2000;
        if (state.contract === 'district-hourly') return 1500;
      }
    }
  },
  {
    name: 'FUSE retention incentive',
    label: 'FUSE retention incentive',
    qualify: function (state) {
      if (state.status === 'returning' && state.fuse) {
        if (state.school_based_role === 'support staff') return 1000;
        if (state.school_based_role === 'certified teacher') return 2000;
      }
    }
  },
  {
    name: 'FUSE hiring incentive',
    label: 'FUSE hiring incentive',
    qualify: function (state) {
      if (state.status === 'new hire' && state.fuse) {
        if (state.school_based_role === 'support staff') return 1000;
        if (state.school_based_role === 'certified teacher') return 2000;
      }
    }
  },
  {
    name: 'FUSE completion award (based on completion of the 22-23 school year)',
    label: 'FUSE completion award (based on completion of the 22-23 school year)',
    qualify: function (state) {
      if (state.fuse) {
        if (state.school_based_role === 'support staff') return 1000;
        if (state.school_based_role === 'certified teacher') return 1000;
      }
    }
  },
  {
    name: 'Parapro, Level III or IV incentive',
    label: 'Parapro, Level III or IV incentive',
    qualify: function (state) {
      if (state.status === 'new hire' && state.parapro) {
        if (state.school_based_role === 'support staff') return 2000;
      }
    }
  },
  {
    name: 'Secondary certified math, science or world language teacher',
    label: 'Secondary certified math, science or world language teacher',
    qualify: function (state) {
      if (state.status === 'new hire' && state.certified_secondary) {
        if (state.school_based_role === 'certified teacher') return 2000;
      }
    }
  },
  {
    name: 'Certified special education teachers',
    label: 'Certified special education teachers',
    qualify: function (state) {
      if (state.status === 'new hire' && state.certified_sped) {
        if (state.school_based_role === 'certified teacher') return 6000;
      }
    }
  },
  {
    name: 'Certified psychometrist, Psychologist, Occupational therapist, speech pathologist',
    label: 'Certified psychometrist, Psychologist, Occupational therapist, speech pathologist',
    qualify: function (state) {
      if (state.status === 'new hire') {
        if (state.school_based_role === 'certified psychometrist') return 3000;
      }

    }
  }
]

export const defaultInitialState = {
  status: '',
  contract: '',
  school_based_role: '',
  fuse: false,
  certified_secondary: false,
  certified_sped: false,
  exceptional: false,
  parapro: false
}

export function reducer(state, action) {
  switch (action.type) {
    case 'update': {
      if (typeof action.payload.status !== 'undefined') {
        return { ...defaultInitialState, ...action.payload }
      }
      if (typeof action.payload.contract !== 'undefined') {
        const { status } = state
        return { ...defaultInitialState, status, ...action.payload }
      }
      if (typeof action.payload.school_based_role !== 'undefined') {
        const { status, contract } = state
        return { ...defaultInitialState, status, contract, ...action.payload }
      }
      return {...state, ...action.payload}
    }
    case 'reset': {
      return {...defaultInitialState, ...action.payload}
    }
    default: {
      throw new Error();
    }
  }
}

export function useIncentiveReducer(initialState) {
  const [state, dispatch] = React.useReducer(reducer, {...defaultInitialState, ...initialState})
  const oneTimeIncentive = state.status === 'returning' && state.school_based_role === 'certified teacher' && state.exceptional
  const incentives = INCENTIVES.map(incentive => ([incentive, incentive.qualify(state) || 0])).filter(([_incentive, amount]) => amount)
  const incentiveTotal = incentives.reduce((total, [_incentive, amount]) => (total + amount), 0)

  return { state, dispatch, incentives, incentiveTotal, oneTimeIncentive }
}
