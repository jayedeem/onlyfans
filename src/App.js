import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
require('dotenv').config();

const App = () => {
  const [token, setToken] = useState();
  const [expiration, setExpiration] = useState();
  const [user, setUser] = useState([]);
  const [amount, setAmount] = useState('');
  const [replaceCredit, setReplaceCredit] = useState(null);
  const [shopid, setShopID] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';

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

  const retrieveMe = async (userID) => {
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
    setUser(res);
  };

  const changeAmount = async (value, userID) => {
    try {
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
        },
      });
      const res = request.data;
      console.log('changeAmount', res);
      setAmount('');
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
        baseURL: proxyurl + 'https://api.rewardify.ca',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
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

  const UserMapped = (props) => {
    return <p>UserMapped</p>;
  };
  console.log('usermapped', user);
  return (
    <div>
      <input
        type="text"
        value={shopid}
        onChange={(e) => setShopID(e.target.value)}
      />
      <button
        onClick={() => {
          retrieveMe(shopid);
          setIsVisible(true);
        }}
      >
        Retrieve User
      </button>
      <p>shopifyId: {shopid}</p>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={() => {
            changeAmount(amount, shopid);
          }}
        >
          Set Amount
        </button>
        <p>amount: {user.amount}</p>
        <p>state amount: {amount}</p>
      </div>
      <div>
        <input
          type="text"
          value={replaceCredit}
          onChange={(e) => setReplaceCredit(e.target.value)}
        />
        <button
          onClick={() => {
            replaceAmount(replaceCredit, shopid);
          }}
        >
          Replace Amount
        </button>

        <p>state amount: {replaceCredit}</p>
        <div>{isVisible ? <UserMapped user={user} /> : null}</div>
      </div>
      {/* <div style={{ marginTop: '52px' }}>{JSON.stringify(user, null, 4)}</div> */}

      <span>3577057411203</span>
    </div>
  );
};
export default App;
