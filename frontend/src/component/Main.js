import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './Home';
import Navbar from './Navbar';
import Users from './Users';
import UserProfile from './UserProfile';
import CreateUser from './CreateUser';
import BulkUpdate from './BulkUpdate';
import LoginForm from './Login';

const Main = () => {
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  // const [fetchError, setFetchError] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const shopData = await axios.request({
      url: 'http://localhost:1337/api/dashboard',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': storedJwt,
      },
    });

    const { api } = shopData.data;
    // Sort Users alphabetically
    const sortUsers = api.customers.sort((a, b) =>
      a.first_name > b.first_name ? 1 : -1
    );
    console.log(sortUsers);
    setUsers(sortUsers);
  };

  const Login = async ({ email, password }) => {
    const { data } = await axios.request({
      url: 'http://localhost:1337/auth/login',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        email: email,
        password: password,
      },
    });
    await localStorage.setItem('token', data);
    setJwt(data);
    fetchUsers();
    console.log(data);
  };
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <LoginForm Login={Login} />} />
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/bulkupdate" component={BulkUpdate} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
