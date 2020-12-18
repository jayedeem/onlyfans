import { Route, Redirect } from 'react-router-dom'

// export const ProtectedRoutes = ({
//   component: Component,
//   currentUser: user,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         if (!!user.isAuth) {
//           return <Component {...rest} />
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: '/login',
//                 state: {
//                   from: location
//                 }
//               }}
//             />
//           )
//         }
//       }}
//     />
//   )
// }

export const ProtectedRoutes = ({
  component: Component,
  currentUser,
  ...rest
}) => {
  if (currentUser.isAuth) {
    return <Route {...rest} component={Component} />
  } else {
    return <Redirect to="/login" />
  }
}
