import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RetrieveMe from './component/retrieveMe';
import ShowFields from './component/showFields';
import './App.css';
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
  const myInput = useRef('');

  useEffect(() => {
    const retrieveToken = async () => {
      await axios
        .request({
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
        })
        .then((data) => {
          const res = data.data;
          console.log(res);
          setToken(res.access_token);
          setExpiration(res.expires_in);
          const dt = new Date();

          localStorage.setItem('token', res.access_token);

          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    retrieveToken();
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

  return (
    <div>
      {loading || !token ? (
        <div>loading...</div>
      ) : (
        <RetrieveMe
          shopid={shopid}
          retrieveMe={retrieveMe}
          user={user}
          setShopID={setShopID}
          setLoading={setLoading}
        />
      )}
      {user === null ? (
        <div></div>
      ) : (
        <ShowFields
          amount={amount}
          shopid={shopid}
          changeAmount={changeAmount}
          replaceAmount={replaceAmount}
          user={user}
          setReplaceCredit={setReplaceCredit}
          setAmount={setAmount}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};
export default App;
