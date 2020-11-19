import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UsersContext = createContext();

export const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState();

  const providerValue = React.useMemo(() => ({ users, token }), [users, token]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const shopData = await axios.request({
      url: '/customers/search.json?query=employee&limit=250',
      method: 'GET',
      baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_SHOPIFY_URL}`,
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic ${process.env.REACT_APP_SHOPIFY_X_TOKEN}`,
      },
    });
    const rewardifyToken = await axios.request({
      url: '/oauth/v2/token',
      method: 'POST',
      baseURL: `https://cors-anywhere.herokuapp.com/https://api.rewardify.ca`,
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
    // console.log(shopData.data.customers);
    // const data = shopData.data.customers;
    // console.log([...data]);
    // const filterUsers = [...data].filter((user) => user.tags === 'employee');
    // console.log('filtered', filterUsers);
    setToken(rewardifyToken.data.access_token);
    setUsers(shopData.data);
    console.log('token and users set');
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const Consumer = UsersContext.Consumer;