import { useEffect, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import UserServices from '../services/user.service'
import { Loading } from '../components/Loading'

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
  }
})

const UserMain = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [amount, setAmount] = useState('')
  const [count, setCount] = useState(0)
  const [selectValue, setSelectValue] = useState('')

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      retrieveUsers()
    }, 1500)
  }, [])

  const handleQuery = (e) => {
    setIsLoading(true)
    setSearchQuery(e.target.value)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const retrieveUsers = async () => {
    const { data } = await UserServices.getUsers()

    const filtered = data.userApi
      .filter(
        (user) => user.state !== 'disabled' && user.email.match(/^.+@ultra.me$/)
      )
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))

    setUserData(filtered)
    setCount(filtered.length)
    setIsLoading(false)
  }

  return (
    <>
      <div className={classes.text}>
        <SearchBar handleQuery={handleQuery} />
        <p>Active Users: {count}</p>
      </div>
      {isLoading ? (
        <Loading />
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
                    return value
                  } else {
                    return null
                  }
                })
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      component={Link}
                      to={{ pathname: `/users/${user.id}`, state: { user } }}
                      align="left"
                    >
                      {user.id}
                    </TableCell>

                    <TableCell align="left">{user.first_name}</TableCell>
                    <TableCell align="left">{user.last_name}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

export default UserMain
