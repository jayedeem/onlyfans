import React, { useState, useEffect } from 'react';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const UserProfile = ({ token, match, isLoading, setIsLoading }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(match);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    //
    setIsLoading(true);
    const data = await axios.request({
      url: `customer/3547125055619/account`,
      method: 'GET',
      baseURL: proxyUrl + 'https://api.rewardify.ca/',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const res = data.data;
    console.log(res);
    setUser(res);
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && user !== null && (
        <div style={stylesUserProfile}>
          <h1>Users Profile</h1>
          {user.map((user) => {
            return (
              <ul key={user.id}>
                <li>{user.customer.first_name}</li>
                <li>{user.customer.last_name}</li>
              </ul>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserProfile;

const stylesUserProfile = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};
