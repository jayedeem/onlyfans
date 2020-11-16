import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Users = ({ users }) => {
  const [usersData, setUsersData] = useState({});
  const [data, setData] = React.useState(users);

  const filteredUsers = data.filter((user) => user.tags === 'employee');

  const sortFunction = (value) => {
    if (value === 'first_name') {
      return setData(
        filteredUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      );
    }
    if (value === 'last_name') {
      return setData(
        filteredUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
      );
    }
  };
  return (
    <div style={stylesUsers.container}>
      <h1>Users Page</h1>
      {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}

      <div style={{ marginTop: '10px' }}>
        <select onChange={(e) => sortFunction(e.target.value)}>
          <option>Select an option</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
        </select>
        <div style={{ marginTop: '10px' }}>
          {data.map((user) => {
            return (
              <ul key={user.id}>
                <li style={stylesUsers.list}>
                  <Link
                    to={{
                      pathname: `users/${user.id}`,
                      state: {
                        userID: user.id,
                      },
                    }}
                  >
                    {user.id}
                  </Link>
                  {user.first_name} {user.last_name}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
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
