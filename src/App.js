import React, { useState, useEffect, cloneElement } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/core';
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
  const [id, setID] = useState();

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
            username: '329_31jdtl1jkc8w0gwso0gc0co8k8g0kokw484wgwcggsw4s8ko8c',
            password: '51mvdq0ohbwgowkoooww40o88scwgw40gos8ogk4okck0w0gg',
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
  console.log('state token', token);

  const retriveMe = async (userID) => {
    console.log('retriving user data', userID);

    const customer = await axios.request({
      url: `/customer/${userID}`,
      method: 'GET',
      baseURL: proxyurl + 'https://api.rewardify.ca',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    console.log('retrieving user', customer);
    setUser({
      firstName: customer.data.firstName,
      lastName: customer.data.lastName,
      email: customer.data.email,
      shopifyId: customer.data.shopifyId,
    });
  };

  const handleChange = (e) => {
    setID(e);
    console.log(e);
  };

  const TokenTag = ({ token, expiration }) => {
    return <p>Bearer: {token} </p>;
  };

  return (
    <Box>
      <TokenTag token={token} expiration={expiration} />
      <input
        type="text"
        value={id}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={(id) => retriveMe(id)}>Retrieve User</button>
      <div>{JSON.stringify(user, null, 4)}</div>
      <p>shopifyId: {id}</p>
    </Box>
  );
}
export default App;
