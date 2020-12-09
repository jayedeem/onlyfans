import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../pages'
import { UsersPage } from '../pages'
import { PanelPage } from '../pages'
import ProtectedRoutes from '../routes'

export const Main = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    role: ''
  })

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <LoginPage user={user} setUser={setUser} />}
        />

        <ProtectedRoutes
          to="/users"
          component={UsersPage}
          isAuth={localStorage.getItem('isAuth')}
        />

        <ProtectedRoutes
          to="/panel"
          component={PanelPage}
          isAuth={localStorage.getItem('isAuth')}
        />
      </Switch>
    </Router>
  )
}
