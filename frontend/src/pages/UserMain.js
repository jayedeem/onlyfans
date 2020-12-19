import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { SearchBar } from '../components/SearchBar'
import AuthService from '../services/auth.service'
import UserServices from '../services/user.service'
import { Row } from '../utils/select'

const useStyles = makeStyles({
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  }
})

export const UsersPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [count, setCount] = useState(userData.length)
  const [didMount, setDidMount] = useState(false)
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [pageOptions, setPageOptions] = useState([5, 10, 25])

  const classes = useStyles()

  const handleChangePage = (e, newPage) => {
    // console.log('newpage', newPage)
    setPage(newPage)
  }

  const handleChangePerRow = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const retrieveUsers = useCallback(async () => {
    setIsLoading(true)
    const { data } = await UserServices.getUsers()
    const filtered = data.api.userApi
      .filter(
        (user) => user.state !== 'disabled' && user.email.match(/^.+@ultra.me$/)
      )
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))
    setStatus(`Fetching ${filtered.length} users`)
    setUserData(filtered)
    setCount(filtered.length)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user) {
      return history.push('/login')
    }
  }, [history])

  useEffect(() => {
    setDidMount(true)
    retrieveUsers()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    setStatus('Retrieving Users')
    return () => setDidMount(false)
  }, [retrieveUsers])

  if (!didMount) {
    return null
  }

  const handleQuery = (e) => {
    setPage(0)
    setIsLoading(true)
    setStatus('Querying')
    setSearchQuery(e.target.value)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }
  let array = []

  return (
    <>
      <div className={classes.text}>
        <SearchBar handleQuery={handleQuery} />
      </div>
      {isLoading ? (
        <div className={classes.loading}>
          <Loading status={status} />
        </div>
      ) : (
        <div className={classes.container}>
          <Table
            size="small"
            aria-label="a dense table"
            className={classes.table}
          >
            <TableHead
            // className={classes.container}
            >
              <TableRow>
                <TableCell>Shopify ID</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData
                .filter((value) => {
                  if (searchQuery === '') {
                    return value
                  } else if (
                    value.first_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    value.last_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    value.email
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  ) {
                    array.push(value)

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
        </div>
      )}
    </>
  )
}
