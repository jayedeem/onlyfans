// import { useEffect, useState } from 'react'
// import { Redirect, Route, useLocation } from 'react-router-dom'
// import { ProfilePage, UsersPage } from '../pages'
// import { ProtectedRoutes } from '../routes'
// import AuthService from '../services/auth.service'
// import { Login } from './'

// const App = () => {
//   const [currentUser, setCurrentUser] = useState({})
//   const [redirectToReferrer, setRedirectToReferrer] = useState(false)
//   const [didMount, setDidMount] = useState(false)

//   useEffect(() => {
//     setDidMount(true)
//     const user = AuthService.getCurrentUser()

//     if (user) {
//       setCurrentUser(user)
//     }
//     return () => setDidMount(false)
//   }, [])

//   if (!didMount) {
//     return null
//   }

//   return (
//     <>
//       <Route
//         exact
//         path="/login"
//         component={() => (
//           <Login setRedirectToReferrer={setRedirectToReferrer} />
//         )}
//       />
//       <ProtectedRoutes
//         exact
//         path="/"
//         currentUser={currentUser}
//         component={UsersPage}
//       />

//       <ProtectedRoutes
//         exact
//         path="/users/:id"
//         currentUser={currentUser}
//         component={ProfilePage}
//       />
//     </>
//   )
// }

// export default App
