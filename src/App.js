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
  });
  const [shopid, setShopID] = useState();
  console.log(process.env.REACT_APP_USERNAME);
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
      url: `/customer/${userID}`,
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
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      shopifyId: res.shopifyId,
    });
  };

  const TokenTag = ({ token, expiration }) => {
    return <p>Bearer: {token} </p>;
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
    </div>
  );
}
export default App;
