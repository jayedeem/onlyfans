import { createContext, useCallback, useEffect, useState } from 'react'
import UserServices from '../services/user.service'

export const UsersDataContext = createContext()

export function UsersDataProvider({ children }) {
  const [usersData, setUsersData] = useState()
  const [didMount, setDidMount] = useState(false)
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState()

  const retrieveUsers = useCallback(async () => {
    const { data } = await UserServices.getUsers()
    const filtered = data.api.userApi
      .filter(
        (user) => user.state !== 'disabled' && user.email.match(/^.+@ultra.me$/)
      )
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))
    setStatus(`Fetching ${filtered.length} users`)
    setUsersData(filtered)
    setCount(filtered.length)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setDidMount(true)
    retrieveUsers()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    setStatus('Retrieving Users')
    return () => setDidMount(false)
  }, [retrieveUsers])

  return (
    <UsersDataContext.Provider
      value={{
        usersData,
        setStatus,
        status,
        setIsLoading,
        isLoading,
        count,
        didMount
      }}
    >
      {children}
    </UsersDataContext.Provider>
  )
}

// export const ProfilePageContext = createContext()

// export function ProfilePageProvider({ children }) {
//   const history = useHistory()
//   const { state } = useLocation()
//   const [status, setStatus] = useState('')
//   const [profileUser, setProfileUser] = useState({})
//   const [fetching, setFetching] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const retrieveUser = useCallback(async (id) => {
//     const { data } = await UserServices.getUser(id)

//     setStatus(data.status.msg)
//     setProfileUser(data.api)

//     setStatus('Something went wrong')
//   }, [])

//   useEffect(() => {
//     if (state === undefined) {
//       history.push('/')
//       console.log('state?', typeof state)
//       console.log('Something went wrong', typeof state)
//     } else {
//       try {
//         console.log("there's state", typeof state)
//         retrieveUser(state.user.id)
//         setFetching(true)
//         setIsLoading(true)
//         setTimeout(() => {
//           setIsLoading(false)
//         }, 1000)
//         setStatus('')
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     return () => setFetching(false)
//   }, [state, retrieveUser])

//   if (!state || !Object.keys(state).length || isLoading) {
//     return <Loading status={status} />
//   }
//   return (
//     <ProfilePageContext.Provider
//       value={{
//         state,
//         status,
//         setStatus,
//         profileUser,
//         setProfileUser,
//         fetching,
//         setFetching,
//         isLoading,
//         setIsLoading
//       }}
//     >
//       {children}
//     </ProfilePageContext.Provider>
//   )
// }
