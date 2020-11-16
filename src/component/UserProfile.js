
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ShowFields from './showFields';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const Profile = ({ userDetails, token, id, setUserDetails, setIsLoading }) => {
  console.log(userDetails);
  return (
    <div>
      <h1>{userDetails.customer.firstName}'s Profile</h1>
      {/* {JSON.stringify(userDetails, null, 5)} */}
      <ul style={stylesUserProfile.link}>
        <li>Amount: ${userDetails.amount}</li>
        <li>Email: {userDetails.customer.email}</li>
        <li>First Name: {userDetails.customer.firstName}</li>
        <li>Last Name: {userDetails.customer.lastName}</li>
      </ul>
      <ShowFields
        token={token}
        id={id}
        setUserDetails={setUserDetails}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

const UserProfile = ({ token, isLoading, setIsLoading }) => {
  const [userDetails, setUserDetails] = useState(null);
  let isRendered = useRef(false);
  const [didMount, setDidMount] = useState(false);
  // const { id } = useParams();
  const location = useLocation();

  // useEffect(() => {
  //   let isCancelled = false;
  //   console.log(id);
  // });

  useEffect(() => {
    console.log(location);
    let isCancelled = true;

    const url =
      proxyUrl +
      `https://api.rewardify.ca/customer/${location.state.userID}/account`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (isCancelled) {
          console.log(res.data);
          setUserDetails(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isCancelled = false;
    };
  }, []);

  // const fetchUserDetails = async () => {
  //   setIsLoading(true);
  //   const data = await axios.request({
  //     // baseURL: `/customer/${id}/account`,

  //     method: 'GET',
  //     headers: {

  //     },
  //   });
  //   const res = data;
  //   console.log(res);
  //   if (!isRendered.current) {
  //     setUser(res);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div style={stylesUserProfile.container}>
      <div>
        {userDetails !== null ? (
          <div>
            <Profile
              userDetails={userDetails}
              token={token}
              id={location.state.userID}
              setUserDetails={setUserDetails}
              setIsLoading={setIsLoading}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
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

