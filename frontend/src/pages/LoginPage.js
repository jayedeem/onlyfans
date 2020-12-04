import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { LoginForm } from '../components'
import axios from 'axios'
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
export const LoginPage = () => {
  const classes = useStyles()

  const loginSubmit = ({ email, password }) => {
    axios
      .post(
        'http://localhost:1337/auth/login',
        {
          data: {
            email,
            password
          }
        },
        {
          withCredentials: true
        }
      )

      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err))
  }

  return (
    <Container component="main" className={classes.container} maxWidth="xs">
      <h2>Login</h2>
      <LoginForm loginSubmit={loginSubmit} />
    </Container>
  )
}
