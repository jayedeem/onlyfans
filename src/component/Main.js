import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import ShopUsers from './shopUsers';
// import './App.css';
import HomePage from './Home';
require('dotenv').config();

const Main = () => {
  const [token, setToken] = useState();
  const [expiration, setExpiration] = useState(new Date());
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [replaceCredit, setReplaceCredit] = useState(null);
  const [shopid, setShopID] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  useEffect(() => {
    const fetchData = async () => {
      const shopEndpoint = await axios.request({
        method: 'GET',
        url: `${proxyUrl}https://ultra-swag.myshopify.com/admin/api/2020-10/customers.json?limit=250`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${process.env.REACT_APP_SHOPIFY_X_TOKEN}`,
        },
      });
      const rewardifyEndpoint = await axios.request({
        url: '/oauth/v2/token',
        method: 'POST',
        baseURL: 'https://api.rewardify.ca',
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
        },
        data: {
          grant_type: 'client_credentials',
        },
      });

      setToken(rewardifyEndpoint.data.access_token);
      setUsers(shopEndpoint.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // const retrieveMe = async (userID) => {
  //   await axios
  //     .request({
  //       url: `/customer/${userID}/account`,
  //       method: 'GET',
  //       baseURL: 'https://api.rewardify.ca',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       settingUser(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const settingUser = (resp) => {
  //   setUser(resp);
  // };

  // const changeAmount = async (value, userID) => {
  //   try {
  //     const request = await axios.request({
  //       url: `/customer/${userID}/account/credit`,
  //       method: 'PUT',
  //       baseURL: 'https://api.rewardify.ca',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //       data: {
  //         email: user.email,
  //         amount: value,
  //         memo: 'hello',
  //       },
  //     });
  //     const res = request.data;
  //     console.log('changeAmount', res);

  //     retrieveMe(userID);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const replaceAmount = async (value, userID) => {
  //   try {
  //     const request = await axios.request({
  //       url: `/customer/${userID}/account/reset`,
  //       method: 'PUT',
  //       baseURL: 'https://api.rewardify.ca',
  //       headers: {
  //         'Content-Type': 'application/json',

  //         authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //       data: {
  //         email: user.email,
  //         amount: value,
  //         memo: 'hello',
  //       },
  //     });
  //     const res = request.data;
  //     console.log('changeAmount', res);
  //     retrieveMe(userID);
  //     setReplaceCredit('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {loading && !users ? (
        <div>Loading...</div>
      ) : (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/">
                {HomePage}
              </Route>
              <Route exact path="/users">
                {users && !loading && (
                  <ShopUsers
                    users={users}
                    setUsers={setUsers}
                    loading={loading}
                    token={token}
                  />
                )}
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </>
  );
};
export default Main;
