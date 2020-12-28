import { Avatar } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

import { Loading } from '../components'
import UserServices from '../services/user.service'
import { profileState } from '../pages/Profile'
import { useRecoilValue, useRecoilState, atom } from 'recoil'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Fragment } from 'react'
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

export const rewardsProfileState = atom({
  key: 'rewardsstate',
  default: []
})

export const ProfileTable = () => {
  const {
    state: { user }
  } = useLocation()

  const [_, setRewardsData] = useRecoilState(rewardsProfileState)
  const profileValue = useRecoilValue(profileState)
  const classes = useStyles()

  const { data, isLoading, error, isFetching } = useQuery(
    'profile',
    async () => {
      const res = await UserServices.getUser(user.id)
      setRewardsData(res.data)
      return res.data
    },
    { refetchOnWindowFocus: false }
  )

  if (isLoading || isFetching) {
    return <Loading />
  }

  if (error) {
    return <p>Error happened</p>
  }

  console.log(profileValue)

  return (
    <div className={classes.avatar}>
      {Object.values(profileValue).map((item) => {
        return (
          <Fragment key={item.email}>
            <Avatar className={classes.purple} style={{ marginRight: '10px' }}>
              {item.first_name.charAt(0) || ''}
              {item.last_name.charAt(0) || ''}
            </Avatar>

            <strong style={{ padding: '5px' }}>
              {item.first_name || ''} {item.last_name || ''}
            </strong>

            <span>
              {item.default_address.city.toUpperCase() || ''},{' '}
              {item.default_address.province_code.toUpperCase() || ''}
            </span>
          </Fragment>
        )
      })}
      {/* <pre>{JSON.stringify(Object.values(profileValue), null, 2)}</pre> */}
    </div>
  )
}
