import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import Container from '@material-ui/core/Container'
import AuthService from '../services/auth.service'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import { useHistory, withRouter } from 'react-router-dom'

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

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const classes = useStyles()

  const onChangeUsername = (e) => {
    const username = e.target.value
    setMessage('')
    setUsername(username)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setMessage('')
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          history.push('/users')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setLoading(false)
          setMessage(resMessage)
          setPassword('')
        }
      )
    } else {
      setLoading(false)
    }
  }

  return (
    <Container className={classes.container}>
      <Form onSubmit={handleLogin} noValidate ref={form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  size="small"
                  variant="outlined"
                  value={username}
                  onChange={onChangeUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" fullWidth type="submit" variant="contained">
              {loading ? 'Loading' : 'Log In'}
            </Button>
          </Grid>
        </Grid>

        {message && (
          <div className="form-group">
            <Alert color="error" role="alert">
              {message}
            </Alert>
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </Container>
  )
}

export default withRouter(Login)
