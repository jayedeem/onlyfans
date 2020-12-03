import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import HomePage from './Home'
import Navbar from './Navbar'
import Users from './Users'
import UserProfile from './UserProfile'
import CreateUser from './CreateUser'
import BulkUpdate from './BulkUpdate'
import LoginForm from './Login'
// axios.defaults.withCredentials = true

const Main = () => {
  const [me, setMe] = useState({
    isLoggedIn: 'false',
    loading: 'true',
    name: '',
    userId: ''
  })
  const [fetchError, setFetchError] = useState(null)
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const shopData = await axios.request({
      url: 'http://localhost:1337/api/rewardify/users',
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })

    console.log(shopData)
    // const { api } = shopData.data
    // // Sort Users alphabetically
    // const sortUsers = api.customers.sort((a, b) =>
    //   a.first_name > b.first_name ? 1 : -1
    // )

    // setUsers(sortUsers)
  }

  const Login = async ({ email, password }) => {
    try {
      const { data } = await axios.request({
        url: 'http://localhost:1337/auth/login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        data: {
          email: email,
          password: password
        }
      })
      console.log(data)
      setMe({
        isLoggedIn: data.status.isLoggedIn,
        loading: data.status.loading,
        name: data.status.name,
        userId: data.status.userId
      })
      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <LoginForm Login={Login} />} />
          {me.isLoggedIn && !me.loading ? (
            <>
              <Route
                exact
                path="/users"
                render={() => <Users users={users} />}
              />
              <Route exact path="/users/:id" component={UserProfile} />
              <Route exact path="/createuser" component={CreateUser} />
              <Route exact path="/bulkupdate" component={BulkUpdate} />
            </>
          ) : (
            <div>Looks like you're not logged in!</div>
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default Main
