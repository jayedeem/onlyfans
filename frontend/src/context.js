import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UsersContext = createContext();

export const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const providerValue = React.useMemo(() => ({ users }), [users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const shopData = await axios.request({
      url: '/api/dashboard',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM1MzRkM2IwOTA5MWI5ZmE4ZTViNjQiLCJpYXQiOjE2MDY3NTk2NTZ9.QP1hgJgQKkcCX7xkc73ZdlKUj-AfB2foJTW1031lcuo',
      },
    });

    const { api } = shopData.data;

    const sortUsers = api.shopify.customers.sort((a, b) =>
      a.first_name > b.first_name ? 1 : -1
    );
    console.log(sortUsers);
    setUsers(sortUsers);
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const Consumer = UsersContext.Consumer;
