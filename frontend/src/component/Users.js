import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';
import { UsersContext } from '../context';
import Search from './Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Paper } from '@material-ui/core';

const Users = () => {
  const users = React.useContext(UsersContext);
  console.log('usecontext', users);
  // const [usersData, setUsersData] = useState(users);
  const [data, setData] = useState([]);

  return (
    <Consumer>
      {({ users, token }) => {
        if (users.length === 0 && data.length === 0) {
          return <div>Loading...</div>;
        } else {
          setData(users);
          return (
            <div style={{ marginTop: '10px' }}>
              <Search users={data} />
            </div>
          );
        }
      }}
    </Consumer>
  );
};

export default Users;

const stylesUsers = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
  },
};
