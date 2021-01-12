import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoutes = ({
  component: Component,
  currentUser,
  ...rest
}) => {
  if (currentUser) {
    return <Route {...rest} component={Component} />
  } else {
    return <Redirect to="/login" />
  }
}
