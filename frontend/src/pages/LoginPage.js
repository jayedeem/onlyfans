import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { LoginForm } from '../components'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'

export const LoginPage = ({ user, setUser }) => {
  const classes = useStyles()

  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      return history.push('/users')
    }
  }, [history])

  const loginSubmit = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        '/auth/login',
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      )
      console.log(data)
      localStorage.setItem('isAuth', data.status.isLoggedIn)
      setUser({
        isLoggedIn: data.status.isLoggedIn,
        name: data.status.name,
        role: data.status.role
      })

      history.push('/users')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component="main" className={classes.container} maxWidth="xs">
      <h2>Login</h2>
      <LoginForm loginSubmit={loginSubmit} />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85vh',
    '& h2': {
      marginBottom: '20px'
    }
  }
}))
