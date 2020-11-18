import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../context';

const Search = ({ searchValue, setSearchValue, users }) => {
  // const [user, setUser] = useState(users);

  const token = useContext(UsersContext);

  const handleSearch = users.filter((u) => {
    return (
      u.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      u.last_name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
      }}
    >
      <label htmlFor="search">Search by Name:</label>

      <input
        style={{ margin: '10px 0 10px 0', width: '300px', padding: '5px' }}
        type="text"
        value={searchValue}
        placeholder="Search an employee.."
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {handleSearch.map((user) => {
        if (user.length === 0 && !user) {
          return <p>no user with that name exists</p>;
        } else {
          return (
            <ul
              key={user.id}
              style={{
                textDecoration: 'none',
                listStyleType: 'none',
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'space-around',
              }}
            >
              <li style={{ padding: '2px' }}>
                <Link
                  style={{
                    textDecoration: 'none',
                    listStyleType: 'none',
                    padding: '10px',
                  }}
                  to={{
                    pathname: `users/${user.id}`,
                    state: {
                      userID: user.id,
                      userToken: token,
                    },
                  }}
                >
                  {user.id}
                </Link>
                {user.first_name} {user.last_name}
              </li>
            </ul>
          );
        }
      })}
      {/* <pre>{JSON.stringify(handleSearch, null, 2)}</pre> */}
    </div>
  );
};

export default Search;
