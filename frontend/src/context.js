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
      url: '/api/dashboard',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log(shopData);
    setToken(shopData.data.token.access_token);
    setUsers(shopData.data);
    // console.log('token and users set');
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const Consumer = UsersContext.Consumer;
