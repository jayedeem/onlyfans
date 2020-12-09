import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserTable } from '../components'
import { SearchBar } from '../components'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  },
  text: {
    marginBottom: '10px'
  }
})

export const UsersPage = (props) => {
  const [userData, setUserData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  useEffect(() => {
    retrieveUsers()
  }, [])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const retrieveUsers = async () => {
    const { data } = await axios.get('/api/dashboard')
    const filter = data.userApi
      .filter(
        (user) =>
          (user.state === 'enabled' && user.tags === 'employee') ||
          user.tags === 'testAccount'
      )
      .sort((a, b) => (a.first_name < b.first_name ? -1 : 1))
    setUserData(filter)
  }

  return (
    <Container className={classes.container}>
      <h1 className={classes.text}>Users Page</h1>
      {!userData ? (
        <div>Loading..</div>
      ) : (
        <>
          <p>number of users: {userData.length}</p>
          <SearchBar handleChange={handleChange} />
          <UserTable
            usersData={userData}
            searchQuery={searchQuery}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </Container>
  )
}
