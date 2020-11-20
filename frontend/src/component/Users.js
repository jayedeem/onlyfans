import React, { useState } from 'react';
import { UsersContext } from '../context';
import Search from './Search';

const Users = () => {
  const users = React.useContext(UsersContext);
  console.log('usecontext', users.users);

  const [data, _] = useState(users.users);

  return users.users.length === 0 && data.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div style={{ marginTop: '10px' }}>
      <Search users={data} />
    </div>
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
