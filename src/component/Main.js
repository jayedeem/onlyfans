import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './Home';
import Navbar from './Navbar';
import Users from './Users';
import UserProfile from './UserProfile';
require('dotenv').config();

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const shopData = await axios.request({
      url: 'customers.json?limit=250',
      method: 'GET',
      baseURL: proxyUrl + process.env.REACT_APP_SHOPIFY_URL,
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic ${process.env.REACT_APP_SHOPIFY_X_TOKEN}`,
      },
    });
    const rewardifyToken = await axios.request({
      url: '/oauth/v2/token',
      method: 'POST',
      baseURL: proxyUrl + 'https://api.rewardify.ca',
      headers: {
        'Content-type': 'application/json',
      },
      auth: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      },
      data: {
        grant_type: 'client_credentials',
      },
    });

    // console.log(rewardifyToken);
    const res = shopData;
    console.log(res.data.customers);
    const tokenData = rewardifyToken.data.access_token;
    setToken(tokenData);
    setUsers(res.data.customers);
    setIsLoading(false);
  };

  return (
    <Router>
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/users"
              component={() => <Users users={users} token={token} />}
            />
            <Route
              exact
              path="/users/:id"
              component={() => (
                <UserProfile
                  token={token}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
            />
          </Switch>
        </div>
      )}
    </Router>
  );
};

export default Main;
