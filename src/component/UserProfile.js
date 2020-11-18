import React, { useState, useEffect, useRef } from 'react';
import { UsersContext } from '../context';
import { Consumer } from '../context';
import { useLocation } from 'react-router-dom';
import ShowFields from './ShowFields';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// const Profile = ({ userDetails, id, setUserDetails, setIsLoading }) => {
//   const { token } = React.useContext(UsersContext);
//   console.log(userDetails);
//   return (
//     <div>
//       <h1>{userDetails.customer.firstName}'s Profile</h1>
//       {/* {JSON.stringify(userDetails, null, 5)} */}
//       <ul style={stylesUserProfile.link}>
//         <li>Amount: ${userDetails.amount}</li>
//         <li>Email: {userDetails.customer.email}</li>
//         <li>First Name: {userDetails.customer.firstName}</li>
//         <li>Last Name: {userDetails.customer.lastName}</li>
//       </ul>
//       <ShowFields
//         token={token}
//         id={id}
//         setUserDetails={setUserDetails}
//         setIsLoading={setIsLoading}
//       />
//     </div>
//   );
// };

const UserProfile = ({ token, isLoading, setIsLoading }) => {
  const { state } = useLocation();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    let isCancelled = true;
    console.log(state);
    const url =
      proxyUrl + `https://api.rewardify.ca/customer/${state.userID}/account`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${state.userToken}`,
        },
      })
      .then((res) => {
        if (isCancelled) {
          setUserDetails(res.data);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isCancelled = false;
    };
  }, []);

  return (
    <div style={stylesUserProfile.container}>
      <h1>User Profile</h1>

      {!userDetails ? (
        <div>Loading...</div>
      ) : (
        <pre>{JSON.stringify(userDetails, null, 2)}</pre>
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
    justifyContent: 'center',
    textAlign: 'center',
  },
  link: {
    listStyleType: 'none',
  },
};
