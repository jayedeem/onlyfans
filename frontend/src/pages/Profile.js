import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useRef } from 'react'

import UserService from '../services/user.service'
import { Loading } from '../components/Loading'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import { deepPurple } from '@material-ui/core/colors'

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
  }
}))

export const ProfilePage = () => {
  const { userId } = useParams()
  const { state } = useLocation()
  const [amount, setAmount] = useState('')
  const [selectValue, setSelectValue] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [profileUser, setProfileUser] = useState({})
  const [fetching, setFetching] = useState(false)
  const classes = useStyles()
  const cell = useRef()
  const selectRef = useRef()

  useEffect(() => {
    console.log(state)
    setFetching(true)
    retrieveUser(state.user.id)
    setFetching(false)
  }, [])

  const handleInput = (e) => {
    if (selectValue === 'opt') {
      setAmount(0)
    } else {
      setAmount(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAmount()
    console.log(selectValue)
    console.log(amount)
  }

  const valueType =
    (selectValue === 'add' && 'Adding Credit') ||
    (selectValue === 'remove' && 'Deducting Credit') ||
    (selectValue === 'zero' && 'Zeroing Out') ||
    (selectValue === 'opt' && 'Edit')

  const handleSelect = (e) => {
    setAmount('')
    setSelectValue(e.target.value)
  }

  const retrieveUser = async (id) => {
    setIsLoading(true)
    const { data } = await UserService.getUser(id)
    setIsLoading(false)
    setProfileUser(data)
  }

  const doMath = (amount) => {
    if (selectValue === 'add') {
      return `$${parseFloat(amount) + parseFloat(profileUser.amount)} `
    }
    if (selectValue === 'remove') {
      return `$${parseFloat(profileUser.amount) - parseFloat(amount)} `
    }
    if (selectValue === 'zero') {
      return `$${
        parseFloat(profileUser.amount) - parseFloat(profileUser.amount)
      } `
    }
  }

  if (!Object.keys(profileUser).length) {
    return <Loading />
  }

  return (
    <Container component={Paper} className={classes.table}>
      <div className={classes.avatar}>
        <Avatar className={classes.purple} style={{ marginRight: '10px' }}>
          {profileUser.customer.firstName.charAt(0)}
          {profileUser.customer.lastName.charAt(0)}
        </Avatar>
        <strong style={{ padding: '5px' }}>
          {profileUser.customer.firstName} {profileUser.customer.lastName}
        </strong>
        <div>
          <span>
            {state.user.default_address.city.toUpperCase()},{' '}
            {state.user.default_address.province_code.toUpperCase()}
          </span>
        </div>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Current Balance</TableCell>
            <TableCell>{valueType}</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              ${parseFloat(profileUser.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              {selectValue === 'zero'
                ? `$${parseFloat(profileUser.amount).toFixed(2)}`
                : `$${parseFloat(amount).toFixed(2)}`}
            </TableCell>
            <TableCell innerRef={cell}>{doMath(amount)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          style={{ marginRight: '15px' }}
          placeholder={selectValue === 'opt' ? 'Pick an Option' : 'Amount...'}
          disabled={selectValue === 'opt'}
          value={amount}
          onChange={handleInput}
        />

        <Select
          style={{ marginRight: '25px' }}
          labelId="select-label"
          id="select-input"
          onChange={handleSelect}
          value={selectValue}
          innerRef={selectRef}
        >
          <MenuItem value="opt">-</MenuItem>
          <MenuItem value="add">Add Credit</MenuItem>
          <MenuItem value="remove">Remove Credit</MenuItem>
          <MenuItem value="zero">0 Credit</MenuItem>
        </Select>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

      <div className={classes.info}>
        <small>Orders placed: {state.user.orders_count}</small>
        <small>
          Status: {state.user.state === 'enabled' ? 'Active' : 'Disabled'}
        </small>
      </div>
    </Container>
  )
}
