
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const Profile = ({ userDetails }) => {
  console.log(userDetails);
  return (
    <div>
      {userDetails.map((user) => {
        return (
          <ul key={user.id}>
            <li>{user.customer.first_name}</li>
            <li>{user.customer.last_name}</li>
          </ul>
        );
      })}
    </div>
  );
};

const UserProfile = ({ token, isLoading, setIsLoading }) => {
  const [userDetails, setUserDetails] = useState(null);
  let isRendered = useRef(false);
  const [didMount, setDidMount] = useState(false);
  const { id } = useParams();

  // useEffect(() => {
  //   let isCancelled = false;
  //   console.log(id);
  // });

  useEffect(() => {
    setDidMount(true);
    setIsLoading(true);
    const url = proxyUrl + `https://api.rewardify.ca/customer/${id}/account`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setUserDetails(res);
      })
      .catch((err) => console.log(err));
    return () => {
      setDidMount(false);
    };
  }, [id, setIsLoading, token]);

  if (!didMount) {
    return null;
  }

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
    <div style={stylesUserProfile}>
      <h1>Users Profile</h1>
      <div>
        {userDetails !== null ? (
          <Profile userDetails={userDetails} />
        ) : (
          <div>something went wrong</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

const stylesUserProfile = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

