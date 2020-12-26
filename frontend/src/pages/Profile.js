import { Container, Paper } from '@material-ui/core'

import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ProfileActions, ProfileTable, ProfileForm } from '../components'
import { Alert } from '@material-ui/lab'
import AuthService from '../services/auth.service'
import { atom, useRecoilState } from 'recoil'
import UserServices from '../services/user.service'
import { clickState } from '../components/ProfileForm'

export const textInputState = atom({
  key: 'textinput',
  default: ''
})
export const profileState = atom({
  key: 'profilepage',
  default: []
})

export const statusState = atom({
  key: 'statusState',
  default: ''
})

export const ProfilePage = () => {
  const { state } = useLocation()

  const history = useHistory()

  // const user = useRecoilValue(getUserQuery)
  const [_, setProfileUser] = useRecoilState(profileState)
  const [status, setStatus] = useRecoilState(statusState)
  const [setClick] = useRecoilState(clickState)

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

  //http://localhost:1337/api/rewardify/addCredit

  async function handleSubmit(amount, menuItem, user) {
    try {
      setStatus('')
      if (amount === '' || menuItem.value === '' || !user) {
        setStatus('error')
        setClick(false)
      }
      const data = {
        userId: Object.values(user)[0].customer.shopifyId,
        email: '',
        amount:
          menuItem === 'zero'
            ? String(parseFloat(Object.values(user)[0].amount).toFixed(2))
            : amount,
        memo: '',
        expiresAt: '2025-12-23T23:25:47.054Z'
      }
      switch (menuItem) {
        case 'add':
          setClick(false)
          return await UserServices.addCredit(data)
        case 'remove':
          setClick(false)
          return await UserServices.removeCredit(data)

        case 'zero':
          setClick(false)
          return await UserServices.removeCredit(data)
        default:
          return
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container component={Paper} className={classes.table}>
      <ProfileTable />
      <ProfileActions />
      <ProfileForm handleSubmit={handleSubmit} />
      {status === 'error' && (
        <Alert variant="filled" severity="error">
          Cannot submit empty values
        </Alert>
      )}
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
