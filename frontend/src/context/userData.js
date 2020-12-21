import { createContext, useContext, useReducer } from 'react'

export const SearchState = createContext({
  query: '',
  isLoading: true
})
export const SearchDispatch = createContext()

const searchReducer = (state, { type, payload }) => {
  switch (type) {
    case 'QUERY':
      return { ...state, isLoading: false, query: payload }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: '',
    isLoading: true
  })
  return (
    <SearchDispatch.Provider value={dispatch}>
      <SearchState.Provider value={state}>{children}</SearchState.Provider>
    </SearchDispatch.Provider>
  )
}

export const useSearchState = () => useContext(SearchState)
export const useSearchDispatch = () => useContext(SearchDispatch)

export const UsersDataState = createContext({
  usersData: [],
  isLoading: true
})
export const UsersDataDispatch = createContext()

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'RETRIEVE_USERS':
      console.log('RETRIEVE_USERS', payload)
      return { ...state, isLoading: false, usersData: payload }

    default:
      return state
  }
}

export const UsersDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    usersData: [],
    isLoading: true
  })
  return (
    <UsersDataDispatch.Provider value={dispatch}>
      <UsersDataState.Provider value={state}>
        {children}
      </UsersDataState.Provider>
    </UsersDataDispatch.Provider>
  )
}
