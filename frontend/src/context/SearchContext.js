import { createContext, useReducer } from 'react'

export const SearchState = createContext({
  query: '',
  isLoading: true
})
export const SearchDispatch = createContext()

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'QUERY':
      console.log('QUERY', payload)
      return { ...state, isLoading: false, query: payload }

    default:
      return state
  }
}

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    query: '',
    isLoading: true
  })
  return (
    <SearchDispatch.Provider value={dispatch}>
      <SearchState.Provider value={state}>{children}</SearchState.Provider>
    </SearchDispatch.Provider>
  )
}
