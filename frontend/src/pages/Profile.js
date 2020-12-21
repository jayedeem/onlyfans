import {
  Container,
  Paper,
  Table,
  TableCell,
  Avatar,
  Button,
  MenuItem,
  Select,
  TextField,
  TableHead,
  TableRow,
  TableBody
} from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

// import { ProfilePageContext } from '../context'
import { Loading } from '../components'
import { useProfileDispatch, useProfileState } from '../context'
import AuthService from '../services/auth.service'
import UserServices from '../services/user.service'

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

export const ProfilePage = () => {
  const { state } = useLocation()
  const dispatch = useProfileDispatch()
  const { profile, info, _, value: selectedValue } = useProfileState()
  const { userId } = useParams()
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const [selectValue, setSelectValue] = useState({
    value: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const [profileUser, setProfileUser] = useState({})
  const [fetching, setFetching] = useState(false)
  const [status, setStatus] = useState('')
  const classes = useStyles()
  const cell = useRef()
  const selectRef = useRef()
  const textRef = useRef()

  async function retrieveUser(userId) {
    console.log('retrieverUser function - ', userId)
    const { data } = await UserServices.getUser(userId)
    console.log('DATA FROM ENDPOINT - ', data)
    setProfileUser(data)
    // dispatch({ type: 'RETRIEVE_INFO', payload: data.api })

    setIsLoading(false)
    return data
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user) {
      return history.push('/login')
    }
  }, [history])

  // useEffect(() => {
  //   console.log('DISPATCHING FROM STATE', state.user.id)
  //   dispatch({ type: 'USER', payload: state.user.id })
  // }, [])

  useEffect(() => {
    // console.log('FROM CONTEXT - PROFILE', profile)
    retrieveUser(state.user.id)
  }, [])

  if (!Object.keys(profileUser).length) {
    return <Loading status={status} />
  }
  // if (isLoading) {
  //   return <Loading status={status} />
  // }

  // const handleInput = (e) => {
  //   if (selectValue.value === 'opt') {
  //     setAmount(0)
  //   } else {
  //     setAmount(e.target.value)
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // setAmount()
  //   console.log(selectValue)
  //   console.log(amount)
  // }

  // const valueType =
  //   (selectValue.value === 'add' && 'Adding Credit') ||
  //   (selectValue.value === 'remove' && 'Deducting Credit') ||
  //   (selectValue.value === 'zero' && 'Zeroing Out') ||
  //   (selectValue.value === 'opt' && 'Edit')

  // const handleSelect = (e) => {
  //   setAmount('')
  //   console.log('onchange', e.target.value)
  //   // dispatch({ type: 'SELECT_VALUE', payload: e.target.value })
  //   setSelectValue({ value: e.target.value })
  // }
  // // console.log('select value', selectedValue)

  // const doMath = (money) => {
  //   if (selectValue.value === 'add') {
  //     return `$${parseFloat(money) + parseFloat(profileUser.amount)} `
  //   }
  //   if (selectValue.value === 'remove') {
  //     if (parseFloat(profileUser.amount) === parseFloat(money)) {
  //       return `$${
  //         parseFloat(profileUser.amount) - parseFloat(profileUser.amount)
  //       } `
  //     }
  //     return `$${parseFloat(profileUser.amount) - parseFloat(money)} `
  //   }
  //   if (selectValue.value === 'zero') {
  //     return `$${
  //       parseFloat(profileUser.amount) - parseFloat(profileUser.amount)
  //     } `
  //   }
  // }

  return (
    <>
      <pre>{JSON.stringify(profileUser, null, 2)}</pre>
    </>
    // <Container component={Paper} className={classes.table}>
    //   <div className={classes.avatar}>
    //     <Avatar className={classes.purple} style={{ marginRight: '10px' }}>
    //       {profileUser.customer.firstName.charAt(0)}
    //       {profileUser.customer.lastName.charAt(0)}
    //     </Avatar>
    //     <strong style={{ padding: '5px' }}>
    //       {profileUser.customer.firstName} {profileUser.customer.lastName}
    //     </strong>
    //     <div>
    //       <span>
    //         {userDetails.user.default_address.city.toUpperCase()},{' '}
    //         {userDetails.user.default_address.province_code.toUpperCase()}
    //       </span>
    //     </div>
    //   </div>
    //   <Table aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Current Balance</TableCell>
    //         <TableCell>{valueType}</TableCell>
    //         <TableCell>Total</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       <TableRow>
    //         <TableCell component="th" scope="row">
    //           ${parseFloat(profileUser.amount).toFixed(2)}
    //         </TableCell>
    //         <TableCell>
    //           {selectValue.value === 'zero' || amount === ''
    //             ? `$${parseFloat(profileUser.amount).toFixed(2)}`
    //             : `$${parseFloat(amount).toFixed(2)}`}
    //         </TableCell>
    //         {/* //TODO! Add, subtract from balance...needs rework */}
    //         <TableCell innerRef={cell}>{doMath(amount)}</TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>

    //   <form onSubmit={handleSubmit} className={classes.form}>
    //     <TextField
    //       style={{ marginRight: '15px' }}
    //       placeholder={
    //         selectValue.value === 'opt' ? 'Pick an Option' : 'Amount...'
    //       }
    //       disabled={selectValue.value === 'opt'}
    //       value={amount}
    //       innerRef={textRef}
    //       onChange={handleInput}
    //     />

    //     <Select
    //       style={{ marginRight: '25px' }}
    //       labelId="select-label"
    //       id="select-input"
    //       onChange={handleSelect}
    //       value={selectValue.value}
    //       innerRef={selectRef}
    //     >
    //       <MenuItem value="opt">-</MenuItem>
    //       <MenuItem value="add">Add Credit</MenuItem>
    //       <MenuItem value="remove">Remove Credit</MenuItem>
    //       <MenuItem value="zero">0 Credit</MenuItem>
    //     </Select>
    //     <Button variant="contained" color="primary" type="submit">
    //       Submit
    //     </Button>
    //   </form>

    //   <div className={classes.info}>
    //     <small>Orders placed: {userDetails.user.orders_count}</small>
    //     <small>
    //       Status: {userDetails.user.state === 'enabled' ? 'Active' : 'Disabled'}
    //     </small>
    //   </div>
    // </Container>
  )
}
