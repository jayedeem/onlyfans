import { useState, useEffect } from 'react'
import axios from 'axios'

const LoginForm = ({ Login }) => {
  const [userDetails, setUserDetails] = useState({
    loading: '',
    isLoggedIn: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    Login(userDetails)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails({ ...userDetails, email: e.target.value })
        }
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails({ ...userDetails, password: e.target.value })
        }
      />
      <br />
      <button type="submit" value="LOGIN">
        submit
      </button>
    </form>
  )
}

export default LoginForm
