import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../pages'
export const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}
