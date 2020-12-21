import { createContext, useReducer } from 'react'

export const ProfileState = createContext()
export const ProfileDispatch = createContext()

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'USER':
      console.log('CONTEXT - USER ', payload)
      return { ...state, isLoading: false, profile: payload }
    case 'RETRIEVE_INFO':
      console.log('RETRIEVE_INFO', payload)
      return { ...state, isLoading: false, info: payload }
    case 'SELECT_VALUE':
      console.log('SELECT_VALUE', payload)
      return { ...state, isLoading: false, value: payload }
    default:
      return state
  }
}

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    profile: {},
    info: {},
    value: '',
    isLoading: true
  })
  return (
    <ProfileDispatch.Provider value={dispatch}>
      <ProfileState.Provider value={state}>{children}</ProfileState.Provider>
    </ProfileDispatch.Provider>
  )
}
