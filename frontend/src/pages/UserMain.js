import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { AddUser, Loading, Row, SearchBar } from '../components'
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
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import { Paper } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Box } from '@material-ui/core'

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
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()
  const isMountedRef = useRef(null)
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
    const { data } = await UserServices.resetUsers()
    setStatus(data.status.msg)
    const filtered = data.status.userApi
      .filter(
        (user) => user.state !== 'disabled' && user.email.match(/^.+@ultra.me$/)
      )
      //   // user.first_name.toLowerCase() === 'test' &&
      //   // user.email.match(/^.+@ultra.me$/)
      // )
      // // .filter((user) => user.first_name.toLowerCase() === 'test')
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))
    setCount(filtered.length)
    setUserList(filtered)

    return filtered
  }, [setUserList, setCount])

  useEffect(() => {
    isMountedRef.current = true
    retrieveUsers()
    return () => (isMountedRef.current = false)
  }, [retrieveUsers])

  // const { data: userData, isLoading: loading, error, isFetching } = useQuery(
  //   'userlist',
  //   retrieveUsers,
  //   {
  //     refetchOnWindowFocus: false
  //   }
  // )

  // if (error) {
  //   // history.push('/login')
  //   return <p>Something went wrong</p>
  // }
  const handleReset = async () => {
    setIsLoading(true)

    await retrieveUsers()

    // window.location.reload()

    setIsLoading(false)
  }
  const handleQuery = (e) => {
    setPage(0)

    setSearchValue(e.target.value)
  }
  let userLengthArray = []
  if (isLoading) {
    return <Loading status={'Fetching Users...'} />
  }
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Box className={classes.paper} width={500} height={80}>
          <Grid
            container
            spacing={1}
            className={classes.grid}
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={10}>
              <SearchBar handleQuery={handleQuery} />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="search"
                color="secondary"
                onClick={handleReset}
              >
                <RotateLeftIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="search"
                color="primary"
                onClick={handleOpen}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.tablePaper}>
          <Table size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '25px' }}>
                  Shopify ID
                </TableCell>
                <TableCell component="th" scope="row">
                  First Name
                </TableCell>
                <TableCell component="th" scope="row">
                  Last Name
                </TableCell>
                <TableCell component="th" scope="row">
                  email
                </TableCell>
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
                    value.email
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
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
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePerRow}
            />
          </Table>
          <AddUser
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            setOpen={setOpen}
          />
        </Box>
      </div>
    </MuiThemeProvider>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,

    margin: 'auto',
    // top: '50%',
    // left: '50%',
    // marginTop: '150px',
    // marginLeft: '-100px',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',

    width: '700px'
  },
  paper: {
    padding: theme.spacing(2),

    marginBottom: '25px',
    width: '100%',
    backgroundColor: '#FAF6FD'
  },
  tablePaper: {
    padding: '3px',
    // width: '100%',
    backgroundColor: '#FAF6FD'
    // height: '100%'
  },
  tablePagination: {
    overflow: 'visible',
    width: '100%',
    height: '100%'
  },
  table: {
    // width: '100%',
    // height: '100%'
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

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#2F1A49'
    }
  }
})
