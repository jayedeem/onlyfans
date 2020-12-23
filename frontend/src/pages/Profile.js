import { Container, Paper } from '@material-ui/core'

import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { memo, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ProfileActions, ProfileTable, ProfileForm } from '../components'

import AuthService from '../services/auth.service'
import { atom, useRecoilState } from 'recoil'
import { Loading } from '../components'

export const profileState = atom({
  key: 'profilepage',
  default: []
})

export const ProfilePage = () => {
  const { state } = useLocation()

  const history = useHistory()

  // const user = useRecoilValue(getUserQuery)
  const [profileUser, setProfileUser] = useRecoilState(profileState)

  const classes = useStyles()

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user) {
      return history.push('/login')
    }
  }, [history])

  useEffect(() => {
    setProfileUser(state)
  }, [setProfileUser, state])

  const doMath = (option, amount, { api: currentUser }) => {
    if (option === 'add') {
      return `$${parseFloat(amount) + parseFloat(currentUser.amount)} `
    }
    if (option === 'remove') {
      if (parseFloat(currentUser.amount) === parseFloat(amount)) {
        return `$${
          parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
        } `
      }
      return `$${parseFloat(currentUser.amount) - parseFloat(amount)} `
    }
    if (option === 'zero') {
      return `$${
        parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
      } `
    }
  }

  return (
    <Container component={Paper}>
      <ProfileTable />
      <ProfileActions doMath={doMath} />
      <ProfileForm />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  table: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '400px',
    maxWidth: '400px',
    marginTop: '300px'
  },
  form: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px',
    width: '100%'
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  info: {
    display: 'flex',
    flexDirection: 'column',

    alignContent: 'center',
    alignItems: 'center'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    marginTop: '20px'
  }
}))
