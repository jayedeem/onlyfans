import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import UserMain from '../pages/UserMain'
import ProtectedRoutes from '../routes'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/auth.service'

import Login from './newLogin'
import Register from './Register'

import { ProfilePage } from '../pages'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const history = useHistory()

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      console.log(currentUser)
    }
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          {!currentUser && <Redirect to="/login" />}
          {currentUser.isAuth && (
            <>
              <ProtectedRoutes
                exact
                path="/users"
                currentUser={currentUser}
                component={UserMain}
              />
              <ProtectedRoutes
                exact
                path="/users/:id"
                currentUser={currentUser}
                component={ProfilePage}
              />
              <ProtectedRoutes
                exact
                path="/register"
                currentUser={currentUser}
                component={Register}
              />
            </>
          )}
        </Switch>
      </Router>
    </>
  )
}

export default App
