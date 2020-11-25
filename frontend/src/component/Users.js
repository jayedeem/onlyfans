import React, { useEffect, useState } from 'react';
import { UsersContext } from '../context';
import Search from './Search';
import Paginate from './Pagination';
import DataTable from './DataTable';

const Users = () => {
  const context = React.useContext(UsersContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(15);
  const [currentUsersPerPage, setCurrentUsersPerPage] = useState();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = context.users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return context.users.length === 0 && currentUsers.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div style={stylesUsers.container}>
      <DataTable currentUsersPerPage={currentUsers} />
      {/* <Search currentUsers={currentUsers} />
      <Paginate
        usersPerPage={usersPerPage}
        totalUsers={context.users.length}
        paginate={paginate}
      /> */}
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
  paginate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
};
