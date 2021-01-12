import { Route, Redirect, useLocation } from 'react-router-dom'
import './App.css'
import AuthService from './services/auth.service'

import { Wrapper } from './utils/Wrapper'
import { Navbar } from './components'
import { ProtectedRoutes } from './routes'
import { LoginPage, ProfilePage, UsersPage } from './pages'
import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null
})

export const App = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [didMount, setDidMount] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setDidMount(true)
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }
    return () => setDidMount(false)
  }, [setDidMount, setCurrentUser])

  return (
    <>
      <Route exact path="/login" component={() => <LoginPage />} />
      {currentUser && <Navbar />}
      <ProtectedRoutes
        exact
        path="/"
        currentUser={currentUser}
        component={UsersPage}
      />

      <ProtectedRoutes
        exact
        path="/users/:id"
        currentUser={currentUser}
        component={ProfilePage}
      />
    </>
  )
}
