import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../context';
import { useLocation } from 'react-router-dom';
import ShowFields from './ShowFields';
import axios from 'axios';

// const proxyUrl = 'http://localhost:1337/';

const Profile = ({ userDetails, id, setUserDetails, setIsLoading }) => {
  console.log(userDetails);
  return (
    <>
      <h1>{userDetails.customer.firstName}'s Profile</h1>
      {/* {JSON.stringify(userDetails, null, 5)} */}
      <ul style={stylesUserProfile.link}>
        <li>Amount: ${userDetails.amount}</li>
        <li>Email: {userDetails.customer.email}</li>
        <li>First Name: {userDetails.customer.firstName}</li>
        <li>Last Name: {userDetails.customer.lastName}</li>
      </ul>
    </>
  );
};

const UserProfile = ({ token, isLoading, setIsLoading }) => {
  const { state } = useLocation();
  const [userDetails, setUserDetails] = useState([]);
  const context = useContext(UsersContext);

  useEffect(() => {
    const url = `/api/rewardify/user/${state.userID}`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          token: context.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, [context.token, state.userID]);

  return (
    <div style={stylesUserProfile.container}>
      {!userDetails ? (
        <div>Loading...</div>
      ) : (
        <div styles={stylesUserProfile.showFields.container}>
          <Profile
            userDetails={userDetails}
            id={state.userID}
            token={token}
            setUserDetails={setUserDetails}
            setIsLoading={setIsLoading}
          />
          <ShowFields
            token={token}
            id={state.userID}
            setUserDetails={setUserDetails}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;

const stylesUserProfile = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  showFields: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      marginTop: '120px',
    },
  },
  link: {
    listStyleType: 'none',
  },
};
