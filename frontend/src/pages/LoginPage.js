import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/auth.service'
import { LoginForm } from '../components'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80vh',
    maxWidth: '500px'
  }
}))

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

export const LoginPage = ({ setRedirectToReferrer }) => {
  const history = useHistory()

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      return history.push('/')
    }
  }, [history])

  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <LoginForm />
    </Container>
  )
}
