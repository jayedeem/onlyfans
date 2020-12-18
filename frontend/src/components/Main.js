import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'
import UserMain from '../pages/UserMain'

import { useHistory } from 'react-router-dom'
import AuthService from '../services/auth.service'
import { ProtectedRoutes } from '../routes/'
import Login from './newLogin'
import Register from './Register'

import { ProfilePage } from '../pages'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const { state } = useLocation()

  useEffect(() => {
    setDidMount(true)
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }
    return () => setDidMount(false)
  }, [])

  if (!!redirectToReferrer) {
    console.log(redirectToReferrer)
    console.log(state)
    return <Redirect to={state?.from || '/'} />
  }

  if (!didMount) {
    return null
  }

  return (
    <>
      <Route
        exact
        path="/login"
        component={() => (
          <Login setRedirectToReferrer={setRedirectToReferrer} />
        )}
      />
      <ProtectedRoutes
        exact
        path="/"
        currentUser={currentUser}
        component={UserMain}
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

export default App
