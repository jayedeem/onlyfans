import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../context';

const Search = ({ currentUsers, isLoading }) => {
  const Context = useContext(UsersContext);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };
  const handleSearch = (value) => {
    const filter = Context.users.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    return !filter.length
      ? console.log('no match')
      : console.log('match found');
  };

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
        onChange={(e) => handleChange(e)}
      />
      <ul
        style={{
          textDecoration: 'none',
          listStyleType: 'none',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        {!data
          ? currentUsers.map((user) => {
              return (
                <li style={{ padding: '2px' }} key={user.shopifyId}>
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
                        userToken: Context.token,
                      },
                    }}
                  >
                    {user.id}
                  </Link>
                  {user.first_name} {user.last_name}
                </li>
              );
            })
          : data.map((user) => {
              <li>{user.first_name}</li>;
            })}
      </ul>
    </div>
  );
};

export default Search;
