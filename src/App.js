import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
require('dotenv').config();

function App() {
  const [token, setToken] = useState();
  const [expiration, setExpiration] = useState();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    shopifyId: '',
    amount: ' ',
  });

  const [amount, setAmount] = useState('');

  const [shopid, setShopID] = useState();

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  // const proxyurl = 'https://cors-proxy.htmldriven.com/?url=';
  useEffect(() => {
    const retrieveToken = async () => {
      await axios
        .request({
          url: '/oauth/v2/token',
          method: 'POST',
          baseURL: proxyurl + 'https://api.rewardify.ca',
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
          setToken(res.access_token);
          setExpiration(res.expiration);
        })
        .catch((err) => console.log(err));
    };
    retrieveToken();
  }, []);

  const retriveMe = async (userID) => {
    const request = await axios.request({
      url: `/customer/${userID}/account`,
      method: 'GET',
      baseURL: proxyurl + 'https://api.rewardify.ca',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const res = await request.data;
    console.log('retrieveme', res);
    setUser({
      firstName: res.customer.firstName,
      lastName: res.customer.lastName,
      email: res.customer.email,
      shopifyId: res.customer.shopifyId,
      amount: res.amount,
    });
  };

  const TokenTag = ({ token, expiration }) => {
    return <p>Bearer: {token} </p>;
  };
  const changeAmount = async (value, userID) => {
    const request = await axios.request({
      url: `/customer/${userID}/account/credit`,
      method: 'PUT',
      baseURL: proxyurl + 'https://api.rewardify.ca',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        email: user.email,
        amount: value,
        memo: 'hello',
        expiresAt: '2021-05-05T10:21:05.349Z',
      },
    });
    const res = request.data;
    console.log('changeAmount', res);
  };
  return (
    <div>
      <TokenTag token={token} expiration={expiration} />
      <input
        type="text"
        value={shopid}
        onChange={(e) => setShopID(e.target.value)}
      />
      <button onClick={() => retriveMe(shopid)}>Retrieve User</button>
      <div>{JSON.stringify(user, null, 4)}</div>
      <p>shopifyId: {shopid}</p>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => changeAmount(amount, shopid)}>Set Amount</button>
        <p>amount: {user.amount}</p>
      </div>
    </div>
  );
}
export default App;
