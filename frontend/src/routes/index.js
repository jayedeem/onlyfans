import { Route, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthService from '../services/auth.service'
const ProtectedRoutes = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser.isAuth) {
          console.log('in render', currentUser)
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                  error: 'You need to be logged in first!'
                }
              }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoutes
