import { InputRightElement } from '@chakra-ui/core';
import React from 'react';

const ShopUsers = ({ users }) => {
  const filteredUsers = users.customers.filter(
    (user) => user.tags === 'employee'
  );

  return (
    <div>
      {filteredUsers.map((user) => {
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
