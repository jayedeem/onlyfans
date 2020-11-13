import { InputRightElement } from '@chakra-ui/core';
import React from 'react';

const ShopUsers = ({ users }) => {
  const filteredUsers = users.customers[0].filter(
    (user) => user.tags === 'employee'
  );
  return <div>{JSON.stringify(filteredUsers, null, 4)}</div>;
};

export default ShopUsers;
