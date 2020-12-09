import { Route, Redirect } from 'react-router-dom'

const ProtectedRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
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
