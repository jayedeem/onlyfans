import React from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { render } from 'react-dom';

function UserModal({ showModal, handleToggle, user }) {
  const [userDetails, setUserDetails] = React.useState({});

  React.useEffect(() => {
    let rendered = true;
    getUserDetails();
    return (rendered = false);
  }, [user]);

  async function getUserDetails() {
    const userData = await axios.get(
      `http://localhost:1337/api/rewardify/user/${user}`
    );
    // console.log(userData.data);
    console.log(userData);
    setUserDetails(userData);
  }

  return (
    <Modal
      open={showModal}
      onClose={handleToggle}
      style={{
        outline: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <pre>{JSON.stringify(userDetails, null, 2)}</pre> */}

      {!userDetails ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            width: '700px',
            height: 500,
            color: 'black',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <pre>{JSON.stringify(userDetails, null, 2)}</pre>
          {/* <h1>
            {userDetails.customer.firstName} {userDetails.customer.lastName}'s
            Details
          </h1>

          <li>Current Balance: ${userDetails.amount}</li>
          <li>{userDetails.customer.email}</li> */}
          <label>Add Credit</label>

          <input type="text" placeholder="Enter An amount" />

          <button>Submit</button>
        </div>
      )}
    </Modal>
  );
}

export default UserModal;
