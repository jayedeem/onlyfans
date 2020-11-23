import React, { useEffect, useState } from 'react';
import { UsersContext } from '../context';
import Search from './Search';
import Paginate from './Pagination';

const Users = () => {
  const context = React.useContext(UsersContext);
  const [currentPage, setCurrentPage] = useState(1);
  // const [numOfusers, setNumofUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(30);

  // const [data, _] = useState(users.users);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = context.users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return context.users.length === 0 && currentUsers.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <>
      <Search currentUsers={currentUsers} />

      <Paginate
        usersPerPage={usersPerPage}
        totalUsers={context.users.length}
        paginate={paginate}
      />
    </>
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
  paginate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
};
