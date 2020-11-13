import React from 'react';

const ShopUsers = ({ users }) => {
  const [data, setData] = React.useState([]);

  const filteredUsers = users.customers.filter(
    (user) => user.tags === 'employee'
  );

  const sortArray = (type) => {
    const types = {
      first: 'first_name',
      last: 'last_Name',
    };
    const sortProp = types[type];
    console.log(sortProp);
    const sortUsers = [...filteredUsers].sort((a, b) => {
      return a[sortProp] > b[sortProp] ? 1 : -1;
    });
    setData(sortUsers);
    console.log('sorted', sortUsers);
  };

  return (
    <div>
      <select onChange={(e) => sortArray(e.target.value)}>
        <option value="opt">Select Option</option>
        <option value="first">First Name</option>
        <option value="last">Last Name</option>
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
  );
};

export default ShopUsers;
