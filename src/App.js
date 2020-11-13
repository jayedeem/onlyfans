import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RetrieveMe from './component/retrieveMe';
import ShowFields from './component/showFields';
import ShopUsers from './component/shopUsers';
// import './App.css';
require('dotenv').config();

const App = () => {
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

  // useEffect(() => {
  //   const retrieveToken = async () => {
  //     await axios
  //       .request({
  //         url: '/oauth/v2/token',
  //         method: 'POST',
  //         baseURL: 'https://api.rewardify.ca',
  //         headers: { 'Content-Type': 'application/json' },
  //         auth: {
  //           username: process.env.REACT_APP_USERNAME,
  //           password: process.env.REACT_APP_PASSWORD,
  //         },
  //         data: {
  //           grant_type: 'client_credentials',
  //         },
  //       })
  //       .then((data) => {
  //         const res = data.data;
  //         console.log(res);
  //         setToken(res.access_token);
  //         setExpiration(res.expires_in);
  //         const dt = new Date();
  //         // dt.setHours(dt.getHours() + 1)

  //         localStorage.setItem('token', res.access_token);

  //         setLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   retrieveToken();
  // }, []);

  useEffect(() => {
    const shopEndpoint = async () => {
      const request = await axios.request({
        method: 'GET',
        url: `${proxyUrl}https://ultra-swag.myshopify.com/admin/api/2020-10/customers.json?limit=250`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${process.env.REACT_APP_SHOPIFY_X_TOKEN}`,
        },
      });
      const data = request.data;
      setUsers(data);
      console.log(data);
      setLoading(false);
    };
    shopEndpoint();
  }, []);

  const retrieveMe = async (userID) => {
    await axios
      .request({
        url: `/customer/${userID}/account`,
        method: 'GET',
        baseURL: 'https://api.rewardify.ca',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        settingUser(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const settingUser = (resp) => {
    setUser(resp);
  };

  const changeAmount = async (value, userID) => {
    try {
      const request = await axios.request({
        url: `/customer/${userID}/account/credit`,
        method: 'PUT',
        baseURL: 'https://api.rewardify.ca',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          email: user.email,
          amount: value,
          memo: 'hello',
        },
      });
      const res = request.data;
      console.log('changeAmount', res);

      retrieveMe(userID);
    } catch (error) {
      console.log(error);
    }
  };

  const replaceAmount = async (value, userID) => {
    try {
      const request = await axios.request({
        url: `/customer/${userID}/account/reset`,
        method: 'PUT',
        baseURL: 'https://api.rewardify.ca',
        headers: {
          'Content-Type': 'application/json',

          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          email: user.email,
          amount: value,
          memo: 'hello',
        },
      });
      const res = request.data;
      console.log('changeAmount', res);
      retrieveMe(userID);
      setReplaceCredit('');
    } catch (error) {
      console.log(error);
    }
  };

  return <>{loading ? <div>Loading...</div> : <ShopUsers users={users} />}</>;
};
export default App;
