import { useContext } from 'react'
import {
  ProfileDispatch,
  ProfileProvider,
  ProfileState
} from './profileContext'
import { SearchDispatch, SearchProvider, SearchState } from './SearchContext'
import {
  UsersDataDispatch,
  UsersDataProvider,
  UsersDataState
} from './userData'

export const useSearchState = () => useContext(SearchState)
export const useSearchDispatch = () => useContext(SearchDispatch)

export const useDataState = () => useContext(UsersDataState)
export const useDataDispatch = () => useContext(UsersDataDispatch)

export const useProfileState = () => useContext(ProfileState)
export const useProfileDispatch = () => useContext(ProfileDispatch)

export const ContextWrapper = ({ children }) => {
  return (
    <UsersDataProvider>
      <SearchProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </SearchProvider>
    </UsersDataProvider>
  )
}
