import React from 'react';

const ShopUsers = ({ users, setUsers, loading }) => {
  const [data, setData] = React.useState([]);

  const filteredUsers = users.customers.filter(
    (user) => user.tags === 'employee'
  );

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
    <div>
      {users && !loading && (
        <div>
          <select onChange={(e) => sortFunction(e.target.value)}>
            <option>Select an option</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
          </select>
          {data.map((user) => {
            return (
              <div key={user.id}>
                <ul>
                  <li>
                    <a href={user.id}>{user.id} </a> {user.first_name}{' '}
                    {user.last_name}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopUsers;
