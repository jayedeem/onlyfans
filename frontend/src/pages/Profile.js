import { deepPurple } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Loading } from '../components/Loading'
// import { ProfilePageContext } from '../context'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

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
  // const {
  //   state,
  //   status,
  //   setStatus,
  //   profileUser,
  //   setProfileUser,
  //   fetching,
  //   setFetching,
  //   isLoading,
  //   setIsLoading
  // } = useContext(ProfilePageContext)

  const { state } = useLocation()

  const { userId } = useParams()
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const [selectValue, setSelectValue] = useState({
    value: ''
  })
  // const [isLoading, setIsLoading] = useState(false)

  const [profileUser, setProfileUser] = useState({})
  const [fetching, setFetching] = useState(false)
  const [status, setStatus] = useState('')
  const classes = useStyles()
  const cell = useRef()
  const selectRef = useRef()
  const textRef = useRef()
  const { data, isLoading, error } = useQuery('user', () =>
    UserService.getUser(state.user.id)
  )

  // async function retrieveUser(state) {
  //   const { data } = await UserService.getUser(state.user.id)
  //   // setStatus(data.status.msg)
  //   // setProfileUser(data.api)
  //   return data
  // }

  useEffect(() => {
    // setIsLoading(true)
    const user = AuthService.getCurrentUser()
    if (!user) {
      return history.push('/login')
    }
  }, [history])

  useEffect(() => {
    setFetching(true)

    // retrieveUser(state.user.id)
    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 1000)
    setStatus('')
    return () => setFetching(false)
  }, [state /*retrieveUser*/])

  // if (!Object.keys(profileUser).length || isLoading) {
  //   return <Loading status={status} />
  // }
  if (isLoading) {
    return <Loading status={status} />
  }

  if (error) {
    return <span>Something happened</span>
  }
  console.log(data)

  const handleInput = (e) => {
    if (selectValue.value === 'opt') {
      setAmount(0)
    } else {
      setAmount(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // setAmount()
    console.log(selectValue)
    console.log(amount)
  }

  const valueType =
    (selectValue.value === 'add' && 'Adding Credit') ||
    (selectValue.value === 'remove' && 'Deducting Credit') ||
    (selectValue.value === 'zero' && 'Zeroing Out') ||
    (selectValue.value === 'opt' && 'Edit')

  const handleSelect = (e) => {
    setAmount('')
    setSelectValue({ value: e.target.value })
  }

  const doMath = (money) => {
    if (selectValue.value === 'add') {
      return `$${parseFloat(money) + parseFloat(profileUser.amount)} `
    }
    if (selectValue.value === 'remove') {
      if (parseFloat(profileUser.amount) === parseFloat(money)) {
        return `$${
          parseFloat(profileUser.amount) - parseFloat(profileUser.amount)
        } `
      }
      return `$${parseFloat(profileUser.amount) - parseFloat(money)} `
    }
    if (selectValue.value === 'zero') {
      return `$${
        parseFloat(profileUser.amount) - parseFloat(profileUser.amount)
      } `
    }
  }

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
    //         {state.user.default_address.city.toUpperCase()},{' '}
    //         {state.user.default_address.province_code.toUpperCase()}
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
    //     <small>Orders placed: {state.user.orders_count}</small>
    //     <small>
    //       Status: {state.user.state === 'enabled' ? 'Active' : 'Disabled'}
    //     </small>
    //   </div>
    // </Container>
  )
}
