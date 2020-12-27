import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AddUser, Loading, Row } from '../components'
import { useQuery } from 'react-query'
import Grid from '@material-ui/core/Grid'
import { useRecoilState } from 'recoil'
import IconButton from '@material-ui/core/IconButton'
import {
  userListState,
  searchQuery,
  pageState,
  userCountState,
  searchQueryLength
} from '../recoil'
import AuthService from '../services/auth.service'
import UserServices from '../services/user.service'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'

export const UsersPage = () => {
  const history = useHistory()
  // const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useRecoilState(pageState)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const [status, setStatus] = useState('')
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [count, setCount] = useRecoilState(userCountState)
  const [userList, setUserList] = useRecoilState(userListState)
  const [searchValue, setSearchValue] = useRecoilState(searchQuery)
  const [searchLength, setSearchLength] = useRecoilState(searchQueryLength)

  const classes = useStyles()

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangePerRow = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user) {
      return history.push('/login')
    }
  }, [history])

  const retrieveUsers = useCallback(async () => {
    const { data } = await UserServices.getUsers()
    setStatus(data.status.msg)
    const filtered = data.api.userApi
      .filter(
        (user) =>
          user.state !== 'disabled' &&
          // user.first_name.toLowerCase() === 'test' &&
          user.email.match(/^.+@ultra.me$/)
      )
      // .filter((user) => user.first_name.toLowerCase() === 'test')
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))
    setCount(filtered.length)
    setUserList(filtered)

    return filtered
  }, [setUserList, setCount])

  const { data: userData, isLoading, error, isFetching } = useQuery(
    'userlist',
    retrieveUsers,
    {
      refetchOnWindowFocus: false
    }
  )

  if (isLoading || isFetching) {
    return <Loading status={'Fetching Users...'} />
  }

  if (error) {
    // history.push('/login')
    return <p>Something went wrong</p>
  }
  let userLengthArray = []

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.text}>
        <IconButton aria-label="search" color="inherit" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Grid>
      <AddUser
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      />
      <Grid item xs={12} className={classes.container}>
        <Table
          size="small"
          aria-label="a dense table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Shopify ID</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              .filter((value) => {
                if (searchValue === '') {
                  return value
                } else if (
                  value.first_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  value.last_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  value.email.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  userLengthArray.push(value)
                  // console.log(userLengthArray.length)
                  // setCount(userLengthArray.length)
                  return value
                } else {
                  return null
                }
              })
              .map((user) => <Row key={user.id} user={user} />)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangePerRow}
          />
        </Table>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    marginTop: '20px'

    // alignContent: 'space-around'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'end',
    alignItems: 'end',
    marginTop: '100px'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    marginTop: '20px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}
