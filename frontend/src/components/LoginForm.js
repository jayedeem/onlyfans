import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import AuthService from '../services/auth.service'
import { Loading } from '.'
import { useRecoilState } from 'recoil'
import {
  usernameState,
  passwordState,
  loadingState,
  messageState
} from '../recoil'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

export const LoginForm = ({}) => {
  const form = useRef()
  const checkBtn = useRef()
  const history = useHistory()
  const [username, setUsername] = useRecoilState(usernameState)
  const [password, setPassword] = useRecoilState(passwordState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [message, setMessage] = useRecoilState(messageState)

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
          window.location.reload()
          return history.push('/')
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
  if (loading) {
    return <Loading />
  }

  return (
    <>
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
                  required={required}
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
                  required={required}
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
    </>
  )
}
